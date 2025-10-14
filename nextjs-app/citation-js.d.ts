declare module 'citation-js' {
  export default class Cite {
    constructor(data: any, options?: any);
    data: any[];
    plugins: any;
    format(format: string, options?: any): string;
    static async(data: any, options?: any): Promise<Cite>;
  }
}

declare module '@citation-js/plugin-bibtex' {}
declare module '@citation-js/plugin-csl' {}
