import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import * as sink from '../../../index';
import { TemplateNode } from '../../Contracts';
/**
 * Templates manager to copy one or more templates to the user project.
 */
export declare class TemplatesManager {
    private projectRoot;
    private templatesSourceDir;
    private application;
    private logger;
    constructor(projectRoot: string, templatesSourceDir: string, application: ApplicationContract);
    /**
     * Normalizes the template node to its object version
     */
    private normalizeTemplateNode;
    /**
     * Returns directory for the template key. It is defined inside the adonisrc file.
     */
    private getDirectoryFor;
    /**
     * Copy templates for a given pre-defined directory within the rcfile.
     */
    private copyTemplateFor;
    /**
     * Copy one or more templates for a given pre-defined directory within the rc file.
     */
    private copyTemplatesFor;
    /**
     * Define a custom logger to use
     */
    useLogger(logger: typeof sink.logger): this;
    /**
     * Copy multiple templates to the destination. It takes the input of templates
     * defined inside the package.json file.
     */
    copy(templates: {
        [key: string]: TemplateNode | TemplateNode[];
    }): Promise<void>;
}
