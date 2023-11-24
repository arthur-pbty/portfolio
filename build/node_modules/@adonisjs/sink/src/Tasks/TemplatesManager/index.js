"use strict";
/*
 * @adonisjs/sink
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesManager = void 0;
const path_1 = require("path");
const sink = __importStar(require("../../../index"));
const Mustache_1 = require("../../Files/Formats/Mustache");
const TemplateLiteral_1 = require("../../Files/Formats/TemplateLiteral");
/**
 * Templates manager to copy one or more templates to the user project.
 */
class TemplatesManager {
    constructor(projectRoot, templatesSourceDir, application) {
        this.projectRoot = projectRoot;
        this.templatesSourceDir = templatesSourceDir;
        this.application = application;
        this.logger = sink.logger;
        if (!(0, path_1.isAbsolute)(this.projectRoot)) {
            throw new Error('Templates manager needs an absolute path to the project root');
        }
        if (!(0, path_1.isAbsolute)(this.templatesSourceDir)) {
            throw new Error('Templates manager needs an absolute path to the templates source directory');
        }
    }
    /**
     * Normalizes the template node to its object version
     */
    normalizeTemplateNode(template) {
        template =
            typeof template === 'string'
                ? {
                    src: template,
                    dest: template.replace(new RegExp(`${(0, path_1.extname)(template)}$`), ''),
                    mustache: false,
                    data: {},
                }
                : template;
        template.dest = (0, path_1.extname)(template.dest) === '' ? `${template.dest}.ts` : template.dest;
        return template;
    }
    /**
     * Returns directory for the template key. It is defined inside the adonisrc file.
     */
    getDirectoryFor(templateFor) {
        if (templateFor === './' || templateFor === '/') {
            return './';
        }
        /**
         * Ensure the object key inside package.json file is a known directory
         */
        const configuredDirectory = this.application.directoriesMap.get(templateFor);
        if (!configuredDirectory) {
            this.logger.warning(`Unknown directory type ${this.logger.colors.underline(templateFor)}`);
            return;
        }
        return configuredDirectory;
    }
    /**
     * Copy templates for a given pre-defined directory within the rcfile.
     */
    copyTemplateFor(templateFor, template) {
        const configuredDirectory = this.getDirectoryFor(templateFor);
        if (!configuredDirectory) {
            return;
        }
        if (!template.src || !template.dest) {
            throw new Error('"src" and "dest" are required when copying templates');
        }
        const sourcePath = (0, path_1.join)(this.templatesSourceDir, template.src);
        const destinationPath = (0, path_1.normalize)(`${configuredDirectory}/${template.dest}`);
        const renderer = template.mustache
            ? new Mustache_1.MustacheFile(this.projectRoot, destinationPath, sourcePath)
            : new TemplateLiteral_1.TemplateLiteralFile(this.projectRoot, destinationPath, sourcePath);
        const hasFile = renderer.exists();
        renderer.apply(template.data);
        renderer.commit();
        if (hasFile) {
            this.logger.action('create').skipped(destinationPath);
        }
        else {
            this.logger.action('create').succeeded(destinationPath);
        }
    }
    /**
     * Copy one or more templates for a given pre-defined directory within the rc file.
     */
    copyTemplatesFor(templateFor, templates) {
        templates = Array.isArray(templates) ? templates : [templates];
        templates
            .map((template) => this.normalizeTemplateNode(template))
            .forEach((template) => this.copyTemplateFor(templateFor, template));
    }
    /**
     * Define a custom logger to use
     */
    useLogger(logger) {
        this.logger = logger;
        return this;
    }
    /**
     * Copy multiple templates to the destination. It takes the input of templates
     * defined inside the package.json file.
     */
    async copy(templates) {
        Object.keys(templates).forEach((templateFor) => {
            if (templateFor === 'basePath') {
                return;
            }
            this.copyTemplatesFor(templateFor, templates[templateFor]);
        });
    }
}
exports.TemplatesManager = TemplatesManager;
