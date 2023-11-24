/**
 * Returns the package manager in use by checking for the lock files
 * on the disk or by inspecting the "npm_config_user_agent".
 *
 * Defaults to npm when unable to detect the package manager.
 */
export declare function getPackageManager(appRoot: string): 'yarn' | 'pnpm' | 'npm';
