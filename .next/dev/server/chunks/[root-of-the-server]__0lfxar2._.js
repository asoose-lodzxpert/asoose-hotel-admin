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
"[project]/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demo-data.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/server-api.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    try {
        const credentials = await request.json();
        if (!credentials.email || !credentials.password) {
            return Response.json({
                success: false,
                message: "Email and password are required."
            }, {
                status: 400
            });
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiBaseUrl"]) {
            (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_COOKIE"], "active", {
                httpOnly: true,
                sameSite: "lax",
                secure: ("TURBOPACK compile-time value", "development") === "production",
                path: "/",
                maxAge: 60 * 60 * 24 * 7
            });
            return Response.json({
                success: true,
                message: "Preview login successful",
                data: {
                    user: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["demoUser"]
                }
            });
        }
        const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiBaseUrl"]}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials),
            cache: "no-store",
            signal: AbortSignal.timeout(15_000)
        });
        const body = await response.json().catch(()=>null);
        if (!response.ok || !body?.success || !body.data?.accessToken) {
            return Response.json(body ?? {
                success: false,
                message: "Unable to sign in."
            }, {
                status: response.status
            });
        }
        (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_COOKIE"], body.data.accessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: ("TURBOPACK compile-time value", "development") === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        });
        return Response.json({
            ...body,
            data: {
                user: body.data.user
            }
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routeError"])(error);
    }
}
}),
"[project]/lib/demo-data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "demoDashboard",
    ()=>demoDashboard,
    "demoProfile",
    ()=>demoProfile,
    "demoUser",
    ()=>demoUser
]);
const demoUser = {
    id: "927b6b48-69e5-4ca1-a51e-1b86be4d02c6",
    email: "loki.dwight@minafter.com",
    firstName: "ELIJAH",
    lastName: "UKAR",
    phone: "09032121212",
    role: "PROPERTY_OWNER",
    emailVerified: true,
    phoneVerified: false,
    avatar: null,
    createdAt: "2026-08-12T10:55:14.833Z",
    updatedAt: "2026-08-12T11:04:47.636Z"
};
const demoProfile = {
    id: "a9850368-d57e-4292-91ad-346101386917",
    userId: demoUser.id,
    fullName: "ELIJAH UKAR",
    userEmail: demoUser.email,
    userPhone: demoUser.phone,
    businessName: "Enim quas eum maxime",
    businessDescription: "Commodo eiusmod et a",
    businessPhone: "Voluptatem quas rep",
    businessEmail: "nafaj@mailinator.com",
    address: {
        street: "Iure pariatur Ut li",
        city: "Rerum facere modi im",
        state: "Do voluptatem sit s",
        zipCode: "Lorem dolorum verita",
        country: "Earum ipsa do cupid",
        latitude: 26,
        longitude: 97
    },
    documents: {
        businessLicenseFile: "",
        idDocumentFile: "",
        propertyOwnershipDocFile: ""
    },
    customCommissionPercent: 12.5,
    verificationStatus: "VERIFIED",
    isVerified: true,
    createdAt: "2026-08-12T10:55:16.014Z",
    updatedAt: "2026-08-12T11:00:36.620Z"
};
const demoDashboard = {
    totalProperties: 0,
    publishedProperties: 0,
    upcomingCheckIns: 0,
    currentGuests: 0,
    earningsThisMonth: 0,
    pendingPayoutBalance: 0,
    availableBalance: 0
};
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

//# sourceMappingURL=%5Broot-of-the-server%5D__0lfxar2._.js.map