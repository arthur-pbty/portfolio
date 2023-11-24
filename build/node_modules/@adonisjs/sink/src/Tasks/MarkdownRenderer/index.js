"use strict";
/*
 * @adonisjs/sink
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownRenderer = void 0;
const open_1 = __importDefault(require("open"));
const path_1 = require("path");
const os_1 = require("os");
const fs_extra_1 = require("fs-extra");
const Styles_1 = require("./Styles");
/**
 * Markdown renderer for opening the instructions md file inside the
 * terminal or the browser.
 */
class MarkdownRenderer {
    constructor(mdFileAbsPath, packageName) {
        this.mdFileAbsPath = mdFileAbsPath;
        this.packageName = packageName;
    }
    /**
     * Generates HTML with the markdown processed code
     */
    generateHtml(contents) {
        return `<html>
      <head>
        <style type="text/css">${Styles_1.css}</style>
      </head>
      <body>
        <article class="markdown-body">
          <h1> Setup instructions for
            <a href="https://npmjs.org/package/${this.packageName}" target="_blank">${this.packageName}</a>
          </h1>
          ${contents}
        </article>
      </body>
    </html>`;
    }
    /**
     * Opens the html contents by writing it to a temporary
     * file and opens up the file inside the browser.
     */
    async openContentsInBrowser(html) {
        const filePath = (0, path_1.join)((0, os_1.tmpdir)(), `adonis-${new Date().getTime()}.html`);
        await (0, fs_extra_1.outputFile)(filePath, html);
        await (0, open_1.default)(filePath, { wait: false });
    }
    /**
     * Converts markdown to HTML and opens it up inside the browser
     */
    async renderInBrowser() {
        const { marked, Renderer } = await import('marked');
        const renderer = new Renderer();
        try {
            const contents = await (0, fs_extra_1.readFile)(this.mdFileAbsPath, 'utf-8');
            const html = this.generateHtml(marked.setOptions({ renderer })(contents.trim()));
            await this.openContentsInBrowser(html);
        }
        catch (error) { }
    }
    /**
     * Writes markdown in the terminal
     */
    async renderInTerminal() {
        const { marked } = await import('marked');
        const { default: TerminalRenderer } = await import('marked-terminal');
        const renderer = new TerminalRenderer();
        try {
            const contents = await (0, fs_extra_1.readFile)(this.mdFileAbsPath, 'utf-8');
            console.log(marked.setOptions({ renderer })(contents.trim()).trim());
        }
        catch (error) { }
    }
}
exports.MarkdownRenderer = MarkdownRenderer;
