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
"[project]/app/api/properties/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2d$properties$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demo-properties.ts [app-route] (ecmascript)");
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
            message: "Preview properties",
            data: {
                properties: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2d$properties$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["demoStore"].properties.slice((page - 1) * limit, page * limit),
                pagination: {
                    page,
                    limit,
                    total: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2d$properties$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["demoStore"].properties.length,
                    totalPages: Math.ceil(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2d$properties$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["demoStore"].properties.length / limit)
                }
            }
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardJson"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upstream"])(`/api/v1/property-owners/me/properties?page=${page}&limit=${limit}`));
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routeError"])(error);
    }
}
async function POST(request) {
    try {
        const payload = await request.json();
        if (!payload.name || !payload.propertyTypeId || !payload.cityId || !payload.address || !Number.isFinite(payload.lat) || !Number.isFinite(payload.lng)) {
            return Response.json({
                success: false,
                message: "Complete the required property and location fields."
            }, {
                status: 400
            });
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiBaseUrl"]) return Response.json({
            success: true,
            message: "Property created successfully",
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2d$properties$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDemoProperty"])(payload)
        }, {
            status: 201
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardJson"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upstream"])("/api/v1/property-owners/me/properties", {
            method: "POST",
            body: JSON.stringify(payload)
        }));
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routeError"])(error);
    }
}
}),
"[project]/lib/demo-properties.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDemoProperty",
    ()=>createDemoProperty,
    "createDemoRoom",
    ()=>createDemoRoom,
    "demoCities",
    ()=>demoCities,
    "demoPropertyTypes",
    ()=>demoPropertyTypes,
    "demoStore",
    ()=>demoStore,
    "updateDemoProperty",
    ()=>updateDemoProperty
]);
const demoCities = [
    {
        id: "50eaacb3-c0ef-4db8-95d6-f1368c3c68ed",
        name: "Abuja",
        state: "Abuja",
        country: "Nigeria",
        latitude: 9.0765,
        longitude: 7.3986
    },
    {
        id: "0b322a41-03e3-4fdd-bca0-5deec47271c0",
        name: "Karu",
        state: "Nassarawa",
        country: "Nigeria",
        latitude: 9.009,
        longitude: 7.57
    },
    {
        id: "3eecb7a3-085c-4a75-b5e0-a511557345e6",
        name: "Maiduguri",
        state: "Borno",
        country: "Nigeria",
        latitude: 11.832873398087084,
        longitude: 13.13813899577069
    }
];
const demoPropertyTypes = [
    {
        id: "8ec8b400-3243-425e-a0e0-f64e317a4976",
        code: "APARTMENT",
        name: "Apartment",
        description: "A standalone apartment unit",
        icon: null,
        sortOrder: 1,
        isActive: true
    },
    {
        id: "be0e6343-c526-4520-a016-51b57850e0f5",
        code: "HOTEL",
        name: "Hotel",
        description: "Multi-room hotel with several room types",
        icon: null,
        sortOrder: 2,
        isActive: true
    },
    {
        id: "319d515b-8900-4171-98d0-f537c5c95a13",
        code: "VILLA",
        name: "Villa",
        description: "A private villa or house",
        icon: null,
        sortOrder: 3,
        isActive: true
    },
    {
        id: "8567c285-dcf8-4603-9bfd-71bf5928549b",
        code: "SINGLE_ROOM",
        name: "Single Room",
        description: "A single bookable room",
        icon: null,
        sortOrder: 5,
        isActive: true
    }
];
const globalStore = globalThis;
const demoStore = globalStore.__asooseDemoStore ??= {
    properties: []
};
function createDemoProperty(payload) {
    const now = new Date().toISOString();
    const type = demoPropertyTypes.find((item)=>item.id === payload.propertyTypeId);
    const city = demoCities.find((item)=>item.id === payload.cityId) ?? demoCities[0];
    const property = {
        id: crypto.randomUUID(),
        propertyTypeId: payload.propertyTypeId,
        propertyType: type?.code ?? "PROPERTY",
        name: payload.name,
        slug: payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        description: payload.description,
        address: payload.address,
        lat: payload.lat,
        lng: payload.lng,
        city,
        images: payload.images,
        image: payload.images[0] ?? null,
        amenities: payload.amenities,
        checkInTime: payload.checkInTime,
        checkOutTime: payload.checkOutTime,
        rating: 0,
        totalReviews: 0,
        status: "DRAFT",
        roomTypes: [],
        createdAt: now,
        updatedAt: now
    };
    demoStore.properties.unshift(property);
    return property;
}
function updateDemoProperty(id, payload) {
    const property = demoStore.properties.find((item)=>item.id === id);
    if (!property) return null;
    const type = demoPropertyTypes.find((item)=>item.id === payload.propertyTypeId);
    const city = demoCities.find((item)=>item.id === payload.cityId) ?? property.city;
    Object.assign(property, payload, {
        propertyType: type?.code ?? property.propertyType,
        city,
        image: payload.images[0] ?? null,
        updatedAt: new Date().toISOString()
    });
    return property;
}
function createDemoRoom(propertyId, payload) {
    const property = demoStore.properties.find((item)=>item.id === propertyId);
    if (!property) return null;
    const now = new Date().toISOString();
    const room = {
        id: crypto.randomUUID(),
        propertyId,
        ...payload,
        image: payload.images[0] ?? null,
        isActive: true,
        createdAt: now,
        updatedAt: now
    };
    property.roomTypes.push(room);
    property.updatedAt = now;
    return room;
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

//# sourceMappingURL=%5Broot-of-the-server%5D__19d574c._.js.map