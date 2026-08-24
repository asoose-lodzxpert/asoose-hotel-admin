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
"[project]/app/api/bookings/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2d$bookings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demo-bookings.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/server-api.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const query = new URL(request.url).searchParams;
        const page = Math.max(1, Number(query.get("page")) || 1);
        const limit = Math.min(100, Math.max(1, Number(query.get("limit")) || 20));
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiBaseUrl"]) return Response.json({
            success: true,
            message: "Preview bookings",
            data: {
                bookings: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2d$bookings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["demoBookingStore"].bookings.slice((page - 1) * limit, page * limit),
                pagination: {
                    page,
                    limit,
                    total: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2d$bookings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["demoBookingStore"].bookings.length,
                    totalPages: Math.ceil(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2d$bookings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["demoBookingStore"].bookings.length / limit)
                }
            }
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardJson"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upstream"])(`/api/v1/property-owners/me/bookings?page=${page}&limit=${limit}`));
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routeError"])(error);
    }
}
}),
"[project]/lib/demo-bookings.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "demoBookingStore",
    ()=>demoBookingStore,
    "transitionDemoBooking",
    ()=>transitionDemoBooking
]);
const globalStore = globalThis;
const demoBookingStore = globalStore.__asooseDemoBookings ??= {
    bookings: [
        {
            id: "2ad216e9-1b8f-4606-925f-14aedb9f1e07",
            bookingNumber: "BKG-MSQ25COI-C63D0E",
            customerId: "c5c60e6b-9f8c-4e88-a730-5e95a15c1afc",
            propertyId: "441e9710-b8e5-4c98-8a41-11e24c9e4530",
            propertyName: "Lagos Grand Hotel",
            propertyImage: "https://res.cloudinary.com/dgwnjuvlx/image/upload/general/927b6b48-69e5-4ca1-a51e-1b86be4d02c6/3400e296-b7fb-40de-82fc-bffbb6210084",
            roomTypeId: "92c8f711-53f8-40b8-99f9-42d4ca982847",
            roomTypeName: "King Size",
            checkIn: "2026-08-15T00:00:00.000Z",
            checkOut: "2026-08-16T00:00:00.000Z",
            nights: 1,
            unitsBooked: 1,
            guests: 1,
            pricePerNight: 20000,
            subtotal: 20000,
            serviceFee: 1000,
            total: 21000,
            status: "PENDING_PAYMENT",
            paymentMethod: "CARD",
            paymentStatus: "PENDING",
            specialRequests: null,
            cancellationReason: null,
            cancelledAt: null,
            cancelledBy: null,
            checkedInAt: null,
            checkedOutAt: null,
            createdAt: "2026-08-12T12:20:45.051Z",
            updatedAt: "2026-08-12T12:20:45.051Z",
            customer: {
                id: "c5c60e6b-9f8c-4e88-a730-5e95a15c1afc",
                firstName: "User",
                lastName: "Yusuf",
                email: "6m5wwndfj2@privaterelay.appleid.com",
                phone: "8098982222"
            },
            property: {
                id: "441e9710-b8e5-4c98-8a41-11e24c9e4530",
                name: "Lagos Grand Hotel",
                image: "https://res.cloudinary.com/dgwnjuvlx/image/upload/general/927b6b48-69e5-4ca1-a51e-1b86be4d02c6/3400e296-b7fb-40de-82fc-bffbb6210084",
                address: "12 Adeola Odeku Street, Victoria Island, Lagos",
                city: {
                    id: "3eecb7a3-085c-4a75-b5e0-a511557345e6",
                    name: "Lagos"
                }
            }
        }
    ]
};
function transitionDemoBooking(id, action) {
    const booking = demoBookingStore.bookings.find((item)=>item.id === id);
    if (!booking) return null;
    const now = new Date().toISOString();
    if (action === "check-in") Object.assign(booking, {
        status: "CHECKED_IN",
        paymentStatus: "COMPLETED",
        checkedInAt: now,
        updatedAt: now
    });
    else Object.assign(booking, {
        status: "CHECKED_OUT",
        checkedOutAt: now,
        updatedAt: now
    });
    return booking;
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

//# sourceMappingURL=%5Broot-of-the-server%5D__06yld6z._.js.map