module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/app/api/bank-accounts/banks/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/server-api.ts [app-route] (ecmascript)");
;
async function GET() {
    try {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiBaseUrl"]) return Response.json({
            success: true,
            message: "Preview supported banks",
            data: [
                {
                    name: "Access Bank",
                    code: "044"
                },
                {
                    name: "GTBank",
                    code: "058"
                },
                {
                    name: "Zenith Bank",
                    code: "057"
                }
            ]
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardJson"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upstream"])("/api/v1/bank-accounts/banks"));
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routeError"])(error);
    }
}
}),
"[project]/lib/server-api.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_COOKIE",
    ()=>DEMO_COOKIE,
    "TOKEN_COOKIE",
    ()=>TOKEN_COOKIE,
    "apiBaseUrl",
    ()=>apiBaseUrl,
    "forwardJson",
    ()=>forwardJson,
    "getAccessToken",
    ()=>getAccessToken,
    "routeError",
    ()=>routeError,
    "upstream",
    ()=>upstream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
const TOKEN_COOKIE = "asoose_access_token";
const DEMO_COOKIE = "asoose_demo_session";
const apiBaseUrl = process.env.ASOOSE_API_BASE_URL?.replace(/\/$/, "");
async function getAccessToken() {
    return (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).get(TOKEN_COOKIE)?.value;
}
async function upstream(path, init = {}) {
    if (!apiBaseUrl) throw new Error("ASOOSE_API_BASE_URL is not configured");
    const token = await getAccessToken();
    return fetch(`${apiBaseUrl}${path}`, {
        ...init,
        cache: "no-store",
        signal: AbortSignal.timeout(15_000),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...token ? {
                Authorization: `Bearer ${token}`
            } : {},
            ...init.headers
        }
    });
}
async function forwardJson(response) {
    const body = await response.json().catch(()=>({
            success: false,
            message: "The server returned an invalid response."
        }));
    return Response.json(body, {
        status: response.status
    });
}
function routeError(error) {
    const message = error instanceof Error ? error.message : "Unexpected server error";
    return Response.json({
        success: false,
        message
    }, {
        status: 502
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0zwskdn._.js.map