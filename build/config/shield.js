"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentTypeSniffing = exports.hsts = exports.xFrame = exports.dnsPrefetch = exports.csrf = exports.csp = void 0;
exports.csp = {
    enabled: false,
    directives: {},
    reportOnly: false,
};
exports.csrf = {
    enabled: true,
    exceptRoutes: [],
    enableXsrfCookie: true,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
};
exports.dnsPrefetch = {
    enabled: true,
    allow: true,
};
exports.xFrame = {
    enabled: true,
    action: 'DENY',
};
exports.hsts = {
    enabled: true,
    maxAge: '180 days',
    includeSubDomains: true,
    preload: false,
};
exports.contentTypeSniffing = {
    enabled: true,
};
//# sourceMappingURL=shield.js.map