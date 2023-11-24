"use strict";
/*
 * @adonisjs/assembler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGenerator = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const standalone_1 = require("@adonisjs/core/build/standalone");
/**
 * Base class to generate framework entities
 */
class BaseGenerator extends standalone_1.BaseCommand {
    constructor() {
        super(...arguments);
        this.extname = '.ts';
    }
    templateData() {
        return {};
    }
    /**
     * Returns path for a given namespace by replacing the base namespace
     * with the defined directories map inside the `.adonisrc.json`
     * file
     */
    getPathForNamespace(namespaceFor) {
        return this.application.resolveNamespaceDirectory(namespaceFor);
    }
    /**
     * Returns contents of the rcFile
     */
    async hasRcFile(cwd) {
        const filePath = (0, path_1.join)(cwd, '.adonisrc.json');
        return (0, fs_extra_1.pathExists)(filePath);
    }
    /**
     * Handle command
     */
    async generate() {
        const hasRcFile = await this.hasRcFile(this.application.appRoot);
        /**
         * Ensure `.adonisrc.json` file exists
         */
        if (!hasRcFile) {
            this.logger.error('Make sure your project root has ".adonisrc.json" file');
            return;
        }
        const transformations = this.createExact
            ? {
                extname: this.extname,
            }
            : {
                form: this.form,
                suffix: this.suffix,
                formIgnoreList: this.formIgnoreList,
                pattern: this.pattern,
                extname: this.extname,
            };
        const file = this.generator
            .addFile(this.resourceName, transformations)
            .stub(this.getStub())
            .useMustache()
            .destinationDir(this.getDestinationPath())
            .appRoot(this.application.appRoot)
            .apply(this.templateData());
        await this.generator.run();
        return file;
    }
}
exports.BaseGenerator = BaseGenerator;
