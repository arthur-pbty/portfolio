"use strict";
/*
 * @adonisjs/lucid
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineReplBindings = void 0;
const helpers_1 = require("@poppinss/utils/build/helpers");
/**
 * Helper to define REPL state
 */
function setupReplState(repl, key, value) {
    repl.server.context[key] = value;
    repl.notify(`Loaded ${key} module. You can access it using the "${repl.colors.underline(key)}" variable`);
}
/**
 * Define REPL bindings
 */
function defineReplBindings(app, Repl) {
    /**
     * Load all models to the models property
     */
    Repl.addMethod('loadModels', (repl) => {
        const modelsPath = app.resolveNamespaceDirectory('models') || 'app/Models';
        console.log(repl.colors.dim(`recursively reading models from "${modelsPath}"`));
        const modelsAbsPath = app.makePath(modelsPath);
        setupReplState(repl, 'models', (0, helpers_1.requireAll)(modelsAbsPath));
    }, {
        description: 'Recursively load Lucid models to the "models" property',
    });
    /**
     * Load database provider to the Db provider
     */
    Repl.addMethod('loadDb', (repl) => {
        setupReplState(repl, 'Db', app.container.use('Adonis/Lucid/Database'));
    }, {
        description: 'Load database provider to the "Db" property',
    });
    /**
     * Load all factories to the factories property
     */
    Repl.addMethod('loadFactories', (repl) => {
        const factoriesPath = app.resolveNamespaceDirectory('factories') || 'database/factories';
        console.log(repl.colors.dim(`recursively reading factories from "${factoriesPath}"`));
        const factoriesAbsPath = app.makePath(factoriesPath);
        const loadedFactories = (0, helpers_1.requireAll)(factoriesAbsPath);
        if (!loadedFactories) {
            return;
        }
        setupReplState(repl, 'factories', Object.values(loadedFactories).reduce((acc, items) => ({ ...acc, ...items }), {}));
    }, {
        description: 'Recursively load factories to the "factories" property',
    });
}
exports.defineReplBindings = defineReplBindings;
