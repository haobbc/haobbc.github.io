import '../App.css'

function Home() {
  return (
    <>
      <header className="header">
        <h1>傅冠豪 (Kuan-Hao Fu, MD)</h1>
        <h2>神經外科醫師 | 臨床研究員</h2>
      </header>

      <main className="main-content">
        <div className="card">
          <h3>聯絡資訊</h3>
          <ul className="contact-info">
            <li className="email">
              <strong>Email:</strong> <a href="mailto:haobbc@cgmh.org.tw">haobbc@cgmh.org.tw</a>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3>現職</h3>
          <ul>
            <li>
              <span className="item-title">基隆長庚紀念醫院 神經外科 主治醫師</span>
            </li>
            <li>
              <span className="item-title">國立台灣大學 精準健康學院 博士候選人</span>{' '}
              <span className="item-meta">(2024/09~)</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3>經歷</h3>
          <ul className="timeline">
            <li>
              <div className="item-title">林口長庚紀念醫院 神經外科 總醫師</div>
            </li>
            <li>
              <div className="item-title">林口長庚紀念醫院 神經外科 住院醫師</div>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3>學歷</h3>
          <ul className="timeline">
            <li>
              <div className="item-title">長庚大學 醫學系</div>
              <div className="item-meta">2007/09 ~ 2012/06</div>
            </li>
            <li>
              <div className="item-title">國立臺南第一高級中學</div>
              <div className="item-meta">2005/09 ~ 2007/06</div>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3>學會與認證</h3>
          <ul>
            <li>台灣神經外科醫學會 專科醫師 (會員編號: 769)</li>
            <li>台灣外科醫學會 專科醫師</li>
            <li>術中神經監測 資格認證</li>
            <li>迷走神經刺激術(VNS) 認證</li>
            <li>深腦刺激術(DBS) 認證</li>
            <li>OSCE考官 認證</li>
            <li>醫策會一般醫學教育(PGY)導師 資格</li>
            <li>全人醫療教師 資格</li>
          </ul>
        </div>

        <div className="card">
          <h3>論文及期刊發表</h3>
          <div className="publication">
            <div className="publication-authors">Fu, K. H., Wang, Y. C., Lim, S. N., et al.</div>
            <div className="publication-title">
              Long-term Outcome of Seizure Control and Neurologic Performance After Limited
              Hippocampal Radiofrequency Thermocoagulation for Mesial Temporal Lobe Epilepsy.
            </div>
            <div className="publication-journal">
              World Neurosurgery, 173, e18–e26. (2023).{' '}
              <a href="https://doi.org/10.1016/j.wneu.2023.01.061" target="_blank" rel="noopener noreferrer">
                DOI: 10.1016/j.wneu.2023.01.061
              </a>
            </div>
          </div>
          <div className="publication">
            <div className="publication-authors">Fu, K. H., Chen P. Y., & Yan, J. L.</div>
            <div className="publication-title">
              A complication of recurrent artery of Heubner infarction after resection of an
              anterior cerebral artery giant thrombotic aneurysm: A case report.
            </div>
            <div className="publication-journal">
              Journal of Surgical Case Reports. 2024 Nov 24;2024(11):rjae736{' '}
              <a href="https://doi.org/10.1093/jscr/rjae736" target="_blank" rel="noopener noreferrer">
                DOI: 10.1093/jscr/rjae736
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p>&copy; 2025 傅冠豪 (Kuan-Hao Fu). All Rights Reserved.</p>
      </footer>
    </>
  )
}

export default Home
