/**
 * Markdown renderer for opening the instructions md file inside the
 * terminal or the browser.
 */
export declare class MarkdownRenderer {
    private mdFileAbsPath;
    private packageName;
    constructor(mdFileAbsPath: string, packageName: string);
    /**
     * Generates HTML with the markdown processed code
     */
    private generateHtml;
    /**
     * Opens the html contents by writing it to a temporary
     * file and opens up the file inside the browser.
     */
    private openContentsInBrowser;
    /**
     * Converts markdown to HTML and opens it up inside the browser
     */
    renderInBrowser(): Promise<void>;
    /**
     * Writes markdown in the terminal
     */
    renderInTerminal(): Promise<void>;
}
