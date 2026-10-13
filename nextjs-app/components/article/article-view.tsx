import { Fragment } from "react"
import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import type {
  ArticleDocument,
  ArticleSection,
  Block,
  Inline,
  TableCell,
} from "@/lib/article-markdown"

const DISCLAIMER =
  "本文供衛教與個人參考使用，不取代醫師個別評估與處方判斷。所有治療建議須依個案臨床狀況決定，並參考最新指南。"

/** 衛教文章的固定版型。所有文章共用，版面調整只改這裡。 */
export function ArticleView({ article }: { article: ArticleDocument }) {
  const { frontmatter, abstract, sections, references } = article

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <Link
        href="/articles"
        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--nejm-burgundy)] hover:text-[var(--nejm-burgundy-dark)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        回衛教文章
      </Link>

      <article className="editorial-card mt-4 p-8 md:p-12">
        <header>
          <p className="editorial-label">{frontmatter.category}</p>
          <h1 className="mt-3 font-display text-3xl leading-tight text-[var(--nejm-ink)] md:text-4xl">
            {frontmatter.title}
          </h1>
          <p className="mt-2 font-display text-xl text-[var(--nejm-charcoal)]">
            {frontmatter.subtitle}
          </p>
          <p className="mt-4 text-sm italic text-[var(--nejm-muted)]">
            傅冠豪 醫師 ·{" "}
            {new Date(frontmatter.date).toLocaleDateString("zh-TW", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <div className="rule-double my-8" />

        <section className="border-l-4 border-[var(--nejm-burgundy)] bg-white/45 p-5">
          <p className="editorial-label mb-2 text-[10px]">摘要 · Abstract</p>
          <p className="font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            <Inlines nodes={abstract} />
          </p>
        </section>

        {sections.map((section, index) => (
          <SectionView key={index} section={section} />
        ))}

        <aside className="mt-8 flex items-start gap-3 border-l-4 border-[var(--nejm-gold)] bg-[var(--nejm-burgundy-tint)]/40 p-4">
          <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-[var(--nejm-burgundy)]" />
          <p className="font-serif text-sm leading-7 text-[var(--nejm-charcoal)]">
            <strong>免責聲明：</strong>
            {DISCLAIMER}
            {frontmatter.disclaimer}
          </p>
        </aside>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-[var(--nejm-ink)]">參考文獻</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 font-serif text-[14px] leading-7 text-[var(--nejm-text)]">
            {references.map((reference, index) => (
              <li key={index}>
                <Inlines nodes={reference} />
              </li>
            ))}
          </ol>
        </section>
      </article>
    </main>
  )
}

function SectionView({ section }: { section: ArticleSection }) {
  if (section.type === "closing") {
    return (
      <>
        <div className="rule-double my-10" />
        <section>
          <h2 className="font-display text-2xl text-[var(--nejm-ink)]">{section.title}</h2>
          <Blocks blocks={section.blocks} />
        </section>
      </>
    )
  }

  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl text-[var(--nejm-ink)]">
        <span className="mr-3 text-[var(--nejm-burgundy)]">{section.number}</span>
        {section.title}
      </h2>
      <div className="mt-4 space-y-4">
        <Blocks blocks={section.blocks} />
      </div>
    </section>
  )
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => <BlockView key={index} block={block} first={index === 0} />)
}

function BlockView({ block, first }: { block: Block; first: boolean }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
          <Inlines nodes={block.children} />
        </p>
      )
    case "subheading":
      return (
        <p className={`${first ? "" : "mt-6 "}font-display text-base text-[var(--nejm-charcoal)]`}>
          <Inlines nodes={block.children} />
        </p>
      )
    case "definition":
      return (
        <div>
          <p className="font-display text-base text-[var(--nejm-charcoal)]">{block.term}</p>
          <p className="mt-1 font-serif text-[15px] leading-8 text-[var(--nejm-text)]">
            <Inlines nodes={block.children} />
          </p>
        </div>
      )
    case "note":
      return (
        <p className="border-l-2 border-[var(--nejm-rule)] pl-3 font-serif text-[13px] italic leading-7 text-[var(--nejm-muted)]">
          <Inlines nodes={block.children} />
        </p>
      )
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul"
      return (
        <ListTag
          className={`${block.ordered ? "list-decimal" : "list-disc"} space-y-2 pl-6 font-serif text-[15px] leading-8 text-[var(--nejm-text)]`}
        >
          {block.items.map((item, index) => (
            <li key={index}>
              <Inlines nodes={item} />
            </li>
          ))}
        </ListTag>
      )
    }
    case "table":
      return (
        <div className="my-4 overflow-x-auto border border-[var(--nejm-rule)] bg-white/45">
          <div className="min-w-[480px] p-3">
            <table className="w-full border-collapse text-left font-serif text-[14px]">
              <thead>
                <tr className="border-b-2 border-[var(--nejm-burgundy)]">
                  {block.head.map((cell, index) => (
                    <th
                      key={index}
                      className="py-2 pr-3 font-display text-[13px] uppercase tracking-wider text-[var(--nejm-burgundy)]"
                    >
                      <Inlines nodes={cell} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex < block.rows.length - 1 ? "border-b border-[var(--nejm-rule)]" : undefined}
                  >
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-2.5 pr-3 align-top text-[var(--nejm-text)]">
                        <CellView cell={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
  }
}

function CellView({ cell }: { cell: TableCell }) {
  if (cell.type === "label") {
    return (
      <>
        <strong>{cell.main}</strong>
        <br />
        <span className="text-xs italic text-[var(--nejm-muted)]">{cell.sub}</span>
      </>
    )
  }
  return <Inlines nodes={cell.children} />
}

function Inlines({ nodes }: { nodes: Inline[] }) {
  return nodes.map((node, index) => {
    if (typeof node === "string") return <Fragment key={index}>{node}</Fragment>
    switch (node.type) {
      case "strong":
        return (
          <strong key={index} className="text-[var(--nejm-ink)]">
            <Inlines nodes={node.children} />
          </strong>
        )
      case "em":
        return (
          <em key={index}>
            <Inlines nodes={node.children} />
          </em>
        )
      case "link":
        return (
          <a
            key={index}
            href={node.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--nejm-burgundy)] underline decoration-dotted underline-offset-2 hover:decoration-solid"
          >
            <Inlines nodes={node.children} />
          </a>
        )
    }
  })
}
