/**
 * Utility method to copy files
 */
export declare function copyFiles(sourceBaseDir: string, destinationBaseDir: string, files: string[], options?: {
    overwrite: boolean;
}): {
    filePath: string;
    state: 'skipped' | 'copied';
}[];
