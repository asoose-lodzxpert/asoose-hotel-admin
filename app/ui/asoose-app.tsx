"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import MapPicker from "./map-picker";
import StreetAddressAutocomplete from "./street-address-autocomplete";
import type { BankAccount, Booking, City, DashboardStats, EarningsBalance, OwnerProfile, Pagination, Payout, Property, PropertyPayload, PropertyType, RoomType, RoomTypePayload, SupportedBank, User, VerifiedBankAccount, WalletTransaction } from "@/lib/types";

type View = "overview" | "properties" | "bookings" | "earnings" | "profile";
type IconName = "grid" | "building" | "calendar" | "wallet" | "user" | "bell" | "search" | "plus" | "arrow" | "trend" | "clock" | "check" | "menu" | "close" | "logout" | "chevron" | "shield" | "home" | "mail" | "phone" | "map" | "bed" | "edit" | "trash" | "image" | "star" | "users";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    building: <><path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16"/><path d="M9 21v-4h4v4M8 7h1m3 0h1M8 11h1m3 0h1M17 9h2a1 1 0 0 1 1 1v11M2 21h20"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></>,
    wallet: <><path d="M4 7V5a2 2 0 0 1 2-2h12v4"/><rect x="3" y="7" width="18" height="14" rx="3"/><path d="M16 13h5v4h-5a2 2 0 0 1 0-4Z"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    trend: <><path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4 12.8 12.8 0 0 0 2.9.7 2 2 0 0 1 1.6 1.9Z"/>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/></>,
    bed: <><path d="M2 20v-8M22 20v-6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2h20M6 12V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v4M13 9h5a2 2 0 0 1 2 2v1"/></>,
    edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></>,
    trash: <><path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v5M14 11v5"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></>,
    star: <path d="m12 2 3 6 7 .9-5 4.8 1.2 6.8L12 17.3l-6.2 3.2L7 13.7 2 8.9 9 8Z"/>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
  };
  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { "Content-Type": "application/json", ...init?.headers } });
  const body = await response.json().catch(() => ({ message: "Something went wrong." }));
  if (!response.ok || body.success === false) throw new Error(body.message || "Something went wrong.");
  return body.data;
}

export default function AsooseApp() {
  const [status, setStatus] = useState<"loading" | "guest" | "authenticated">("loading");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    request<{ user: User }>("/api/session")
      .then(({ user }) => { setUser(user); setStatus("authenticated"); })
      .catch(() => setStatus("guest"));
  }, []);

  if (status === "loading") return <LoadingScreen />;
  if (status === "guest") return <LoginScreen onLogin={(nextUser) => { setUser(nextUser); setStatus("authenticated"); }} />;
  return <DashboardShell user={user!} onLogout={() => { setUser(null); setStatus("guest"); }} />;
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return <div className={`brand ${inverse ? "brand-inverse" : ""}`}><Image className="brand-logo" src="/asoose.png" alt="" width={44} height={44} priority/><span>asoose</span></div>;
}

function LoadingScreen() {
  return <main className="loading-screen"><Logo/><div className="spinner"/><p>Preparing your workspace…</p></main>;
}

function LoginScreen({ onLogin }: { onLogin: (user: User) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const { user } = await request<{ user: User }>("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      onLogin(user);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to sign in."); }
    finally { setBusy(false); }
  }

  return <main className="login-page">
    <section className="login-story">
      <div className="story-top"><Logo inverse/><span className="secure-pill"><Icon name="shield" size={14}/> Secure owner portal</span></div>
      <div className="story-copy">
        <span className="eyebrow light">PROPERTY MANAGEMENT, SIMPLIFIED</span>
        <h1>Run every property<br/>from one calm place.</h1>
        <p>Track performance, welcome guests and stay on top of payouts — without the operational noise.</p>
      </div>
      <div className="mini-dashboard" aria-hidden="true">
        <div className="mini-head"><span>Portfolio snapshot</span><span>Live</span></div>
        <div className="mini-value"><strong>₦0</strong><span>This month</span></div>
        <div className="mini-bars"><i/><i/><i/><i/><i/><i/><i/><i/></div>
      </div>
      <p className="story-foot">Trusted tools for modern African hospitality.</p>
    </section>
    <section className="login-panel">
      <div className="mobile-logo"><Logo/></div>
      <form className="login-form" onSubmit={submit}>
        <span className="eyebrow">WELCOME BACK</span>
        <h2>Sign in to Asoose</h2>
        <p className="form-intro">Use your property owner account to continue.</p>
        {error && <div className="form-error" role="alert">{error}</div>}
        <label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="owner@example.com" autoComplete="email" required/></label>
        <label>Password<div className="password-field"><input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" required/><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button></div></label>
        <div className="form-row"><label className="check-label"><input type="checkbox"/> <span>Remember me</span></label><button type="button" className="text-button">Forgot password?</button></div>
        <button className="primary-button login-button" disabled={busy}>{busy ? <><span className="button-spinner"/> Signing in…</> : <>Sign in <Icon name="arrow" size={18}/></>}</button>
      </form>
      <p className="support-copy">Need help? <a href="mailto:support@asoose.com">Contact support</a></p>
    </section>
  </main>;
}

const navItems: { id: View; label: string; icon: IconName }[] = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "properties", label: "Properties", icon: "building" },
  { id: "bookings", label: "Bookings", icon: "calendar" },
  { id: "earnings", label: "Earnings", icon: "wallet" },
];

const defaultAmenities = [
  "Free WiFi",
  "Air conditioning",
  "Swimming pool",
  "Breakfast included",
  "Free parking",
  "24-hour reception",
  "Gym",
  "Workspace",
];

function DashboardShell({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [view, setView] = useState<View>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  function navigate(next: View) { setView(next); setMobileOpen(false); }
  async function logout() { setLoggingOut(true); await fetch("/api/auth/logout", { method: "POST" }); onLogout(); }
  const title = view === "overview" ? "Overview" : view[0].toUpperCase() + view.slice(1);

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-brand"><Logo inverse/><button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><Icon name="close"/></button></div>
      <nav className="main-nav" aria-label="Primary navigation">
        <p>WORKSPACE</p>
        {navItems.map((item) => <button key={item.id} className={view === item.id ? "active" : ""} onClick={() => navigate(item.id)}><Icon name={item.icon}/><span>{item.label}</span>{item.id === "bookings" && <em>0</em>}</button>)}
        <p className="settings-label">ACCOUNT</p>
        <button className={view === "profile" ? "active" : ""} onClick={() => navigate("profile")}><Icon name="user"/><span>Profile & business</span></button>
      </nav>
      <div className="sidebar-help"><div className="help-icon"><Icon name="shield"/></div><strong>Need a hand?</strong><p>Our support team is ready to help you.</p><a href="mailto:support@asoose.com">Get support <Icon name="arrow" size={14}/></a></div>
      <button className="sidebar-user" onClick={() => navigate("profile")}><Avatar user={user}/><span><strong>{titleCase(`${user.firstName} ${user.lastName}`)}</strong><small>Property owner</small></span><Icon name="chevron" size={16}/></button>
    </aside>
    {mobileOpen && <button className="sidebar-scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu"/>}
    <div className="workspace">
      <header className="topbar"><button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Icon name="menu"/></button><div><span className="crumb">Asoose /</span><strong>{title}</strong></div><div className="top-actions"><label className="search-box"><Icon name="search" size={18}/><input aria-label="Search" placeholder="Search workspace"/></label><button className="icon-button notification-button" aria-label="Notifications"><Icon name="bell"/><span/></button><button className="logout-button" onClick={logout} disabled={loggingOut}><Icon name="logout" size={18}/><span>{loggingOut ? "Signing out" : "Sign out"}</span></button></div></header>
      <main className="content">
        {view === "overview" && <Overview user={user} onNavigate={navigate}/>} 
        {view === "properties" && <PropertiesPage/>}
        {view === "bookings" && <BookingsPage/>}
        {view === "profile" && <ProfilePage/>}
        {view === "earnings" && <EarningsPage/>}
      </main>
    </div>
  </div>;
}

function Avatar({ user }: { user: User }) {
  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`;
  return <span className="avatar">{initials}</span>;
}

function Overview({ user, onNavigate }: { user: User; onNavigate: (view: View) => void }) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { request<DashboardStats>("/api/dashboard").then(setStats).catch((e) => setError(e.message)); }, []);
  const greeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";

  if (error) return <ErrorState message={error} onRetry={() => location.reload()}/>;
  return <>
    <div className="page-heading"><div><span className="eyebrow">PORTFOLIO OVERVIEW</span><h1>{greeting}, {titleCase(user.firstName)} <span>👋🏾</span></h1><p>Here’s what’s happening across your properties today.</p></div><button className="primary-button" onClick={() => onNavigate("properties")}><Icon name="plus" size={18}/> Add property</button></div>
    <section className="stat-grid">
      <StatCard icon="building" tone="green" label="Total properties" value={stats?.totalProperties} note={`${stats?.publishedProperties ?? 0} published`}/>
      <StatCard icon="calendar" tone="blue" label="Upcoming check-ins" value={stats?.upcomingCheckIns} note="Next 30 days"/>
      <StatCard icon="user" tone="purple" label="Current guests" value={stats?.currentGuests} note="Across all properties"/>
      <StatCard icon="trend" tone="orange" label="Earnings this month" value={stats ? money(stats.earningsThisMonth) : undefined} note="August 2026"/>
    </section>
    <section className="dashboard-grid">
      <div className="panel performance-panel"><div className="panel-head"><div><h2>Earnings overview</h2><p>Your revenue performance this month</p></div><select aria-label="Earnings period"><option>This month</option><option>Last month</option></select></div><div className="earnings-total"><strong>{stats ? money(stats.earningsThisMonth) : "—"}</strong><span><Icon name="trend" size={14}/> 0% vs last month</span></div><div className="chart-wrap"><div className="y-labels"><span>₦300k</span><span>₦200k</span><span>₦100k</span><span>₦0</span></div><div className="chart"><i/><i/><i/><i/><svg viewBox="0 0 700 180" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1e7a51" stopOpacity=".2"/><stop offset="1" stopColor="#1e7a51" stopOpacity="0"/></linearGradient></defs><path d="M0 155 C90 152 125 148 190 150 S315 154 370 149 S490 153 540 151 S650 147 700 150 L700 180 L0 180Z" fill="url(#fill)"/><path d="M0 155 C90 152 125 148 190 150 S315 154 370 149 S490 153 540 151 S650 147 700 150" fill="none" stroke="#1e7a51" strokeWidth="3"/></svg><div className="x-labels"><span>1 Aug</span><span>8 Aug</span><span>15 Aug</span><span>22 Aug</span><span>31 Aug</span></div></div></div></div>
      <div className="panel balance-panel"><div className="panel-head"><div><h2>Payout balance</h2><p>Your available funds</p></div><span className="status-badge"><i/> Active</span></div><div className="available"><small>AVAILABLE BALANCE</small><strong>{stats ? money(stats.availableBalance) : "—"}</strong></div><div className="balance-row"><span><i className="pending-dot"/>Pending payout</span><strong>{stats ? money(stats.pendingPayoutBalance) : "—"}</strong></div><button className="secondary-button" onClick={() => onNavigate("earnings")}>View earnings <Icon name="arrow" size={16}/></button><p className="payout-note"><Icon name="clock" size={15}/> Next payout schedule appears here</p></div>
    </section>
    <section className="panel activity-panel"><div className="panel-head"><div><h2>Upcoming check-ins</h2><p>Guests arriving in the next 30 days</p></div><button className="text-link" onClick={() => onNavigate("bookings")}>View all <Icon name="arrow" size={15}/></button></div><EmptyState icon="calendar" title="No upcoming check-ins" body="New reservations will appear here as soon as guests book your properties." action="View bookings" onAction={() => onNavigate("bookings")}/></section>
  </>;
}

function StatCard({ icon, tone, label, value, note }: { icon: IconName; tone: string; label: string; value?: number | string; note: string }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}><Icon name={icon}/></div><div className="stat-content"><p>{label}</p><strong>{value === undefined ? <span className="skeleton short"/> : value}</strong><small>{note}</small></div><button aria-label={`View ${label}`}><Icon name="arrow" size={16}/></button></article>;
}

function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [types, setTypes] = useState<PropertyType[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Property | null>(null);
  const [editor, setEditor] = useState<Property | "new" | null>(null);
  const [roomEditor, setRoomEditor] = useState<RoomType | "new" | null>(null);

  useEffect(() => {
    Promise.all([
        request<{ properties: Property[] }>("/api/properties?page=1&limit=20"),
        request<{ propertyTypes: PropertyType[] }>("/api/property-types"),
        request<City[]>("/api/locations"),
      ]).then(([propertyData, typeData, cityData]) => {
      setProperties(propertyData.properties); setTypes(typeData.propertyTypes.filter((item) => item.isActive)); setCities(cityData);
    }).catch((reason) => setError(reason instanceof Error ? reason.message : "Unable to load properties."))
      .finally(() => setLoading(false));
  }, []);
  const filtered = properties.filter((property) => `${property.name} ${property.address} ${property.city.name}`.toLowerCase().includes(query.toLowerCase()));

  function saveProperty(property: Property) {
    setProperties((current) => current.some((item) => item.id === property.id) ? current.map((item) => item.id === property.id ? property : item) : [property, ...current]);
    setSelected(property); setEditor(null);
  }
  function saveRoom(room: RoomType) {
    if (!selected) return;
    const updated = { ...selected, roomTypes: selected.roomTypes.some((item) => item.id === room.id) ? selected.roomTypes.map((item) => item.id === room.id ? room : item) : [...selected.roomTypes, room] };
    setSelected(updated); setProperties((current) => current.map((item) => item.id === updated.id ? updated : item)); setRoomEditor(null);
  }
  async function deleteRoom(room: RoomType) {
    if (!selected || !window.confirm(`Delete ${room.name}? This cannot be undone.`)) return;
    try {
      await request<null>(`/api/properties/${selected.id}/room-types/${room.id}`, { method: "DELETE" });
      const updated = { ...selected, roomTypes: selected.roomTypes.filter((item) => item.id !== room.id) };
      setSelected(updated); setProperties((current) => current.map((item) => item.id === updated.id ? updated : item));
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to delete room type."); }
  }

  if (selected) return <>
    <button className="back-button" onClick={() => setSelected(null)}><span>←</span> Back to properties</button>
    <div className="property-detail-hero">
      <PropertyImage property={selected}/><div className="property-detail-copy"><div className="detail-badges"><span className={`property-status ${selected.status.toLowerCase()}`}>{selected.status}</span><span>{friendlyType(selected.propertyType)}</span></div><h1>{selected.name}</h1><p><Icon name="map" size={15}/>{selected.address}</p><div className="detail-meta"><span><Icon name="star" size={15}/>{selected.rating.toFixed(1)} ({selected.totalReviews} reviews)</span><span><Icon name="bed" size={15}/>{selected.roomTypes.length} room {selected.roomTypes.length === 1 ? "type" : "types"}</span><span><Icon name="clock" size={15}/>{selected.checkInTime} – {selected.checkOutTime}</span></div></div><button className="secondary-button edit-property-button" onClick={() => setEditor(selected)}><Icon name="edit" size={16}/> Edit property</button>
    </div>
    {error && <div className="form-error">{error}</div>}
    <div className="property-detail-grid"><section className="panel detail-card"><h2>About this property</h2><p className="description-copy">{selected.description || "No description provided."}</p><h3>Amenities</h3><div className="amenity-list">{selected.amenities.length ? selected.amenities.map((amenity) => <span key={amenity}><Icon name="check" size={13}/>{amenity}</span>) : <small>No amenities added.</small>}</div></section><aside className="panel location-card"><h2>Location</h2><div className="mini-map-placeholder"><Icon name="map" size={25}/><span>{selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}</span></div><strong>{selected.city.name}, {selected.city.state}</strong><p>{selected.city.country}</p></aside></div>
    <section className="panel rooms-panel"><div className="panel-head"><div><h2>Room types</h2><p>Create inventory and nightly rates for this property</p></div><button className="primary-button" onClick={() => setRoomEditor("new")}><Icon name="plus" size={16}/> Add room type</button></div>{selected.roomTypes.length ? <div className="rooms-table"><div className="room-row table-head"><span>ROOM</span><span>RATE / NIGHT</span><span>INVENTORY</span><span>GUESTS</span><span>STATUS</span><span/></div>{selected.roomTypes.map((room) => <div className="room-row" key={room.id}><div className="room-name"><div className="room-thumb" style={room.image ? { backgroundImage: `url(${room.image})` } : undefined}><Icon name="bed"/></div><span><strong>{room.name}</strong><small>{room.description}</small></span></div><strong>{money(room.pricePerNight)}</strong><span>{room.quantity} rooms</span><span>{room.maxGuests} guests</span><span className={`room-status ${room.isActive ? "active" : "inactive"}`}>{room.isActive ? "Active" : "Inactive"}</span><div className="row-actions"><button onClick={() => setRoomEditor(room)} aria-label={`Edit ${room.name}`}><Icon name="edit" size={15}/></button><button className="danger" onClick={() => deleteRoom(room)} aria-label={`Delete ${room.name}`}><Icon name="trash" size={15}/></button></div></div>)}</div> : <EmptyState icon="bed" title="No room types yet" body="Add the rooms or units guests can book at this property." action="Add first room" onAction={() => setRoomEditor("new")}/>}</section>
    {editor && <PropertyEditor property={editor === "new" ? null : editor} types={types} cities={cities} onClose={() => setEditor(null)} onSaved={saveProperty}/>} 
    {roomEditor && <RoomEditor propertyId={selected.id} room={roomEditor === "new" ? null : roomEditor} onClose={() => setRoomEditor(null)} onSaved={saveRoom}/>} 
  </>;

  return <>
    <div className="page-heading"><div><span className="eyebrow">YOUR PORTFOLIO</span><h1>Properties</h1><p>Manage your listings, locations, rooms and property details.</p></div><button className="primary-button" onClick={() => setEditor("new")}><Icon name="plus" size={18}/> Add property</button></div>
    {error && <div className="form-error">{error}</div>}
    <section className="panel properties-panel"><div className="collection-toolbar"><label className="search-box wide"><Icon name="search" size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search properties"/></label><span className="property-count">{properties.length} {properties.length === 1 ? "property" : "properties"}</span></div>
      {loading ? <div className="property-card-grid">{[1,2,3].map((item) => <span className="skeleton property-card-skeleton" key={item}/>)}</div> : filtered.length ? <div className="property-card-grid">{filtered.map((property) => <article className="property-card" key={property.id} onClick={() => setSelected(property)}><PropertyImage property={property}/><div className="property-card-body"><div className="property-card-top"><span className={`property-status ${property.status.toLowerCase()}`}>{property.status}</span><small>{friendlyType(property.propertyType)}</small></div><h2>{property.name}</h2><p><Icon name="map" size={14}/>{property.address}</p><div className="property-card-foot"><span><Icon name="bed" size={14}/>{property.roomTypes.length} room types</span><span><Icon name="star" size={14}/>{property.rating.toFixed(1)}</span></div></div><button className="property-arrow" aria-label={`Open ${property.name}`}><Icon name="arrow" size={17}/></button></article>)}</div> : <EmptyState icon="building" title={query ? "No matching properties" : "No properties yet"} body={query ? "Try another search term." : "Add your first property to start creating room inventory and receiving bookings."} action={query ? "Clear search" : "Add your first property"} onAction={() => query ? setQuery("") : setEditor("new")}/>} 
    </section>
    {editor && <PropertyEditor property={editor === "new" ? null : editor} types={types} cities={cities} onClose={() => setEditor(null)} onSaved={saveProperty}/>} 
  </>;
}

function PropertyImage({ property }: { property: Property }) {
  return <div className="property-image" style={property.image ? { backgroundImage: `linear-gradient(180deg, transparent 55%, rgba(7,24,17,.38)), url(${property.image})` } : undefined}>{!property.image && <><Icon name="building" size={30}/><span>No image yet</span></>}</div>;
}

function PropertyEditor({ property, types, cities, onClose, onSaved }: { property: Property | null; types: PropertyType[]; cities: City[]; onClose: () => void; onSaved: (property: Property) => void }) {
  const [payload, setPayload] = useState<PropertyPayload>(() => property ? { propertyTypeId: property.propertyTypeId, name: property.name, description: property.description, address: property.address, lat: property.lat, lng: property.lng, cityId: property.city.id, images: property.images, amenities: property.amenities, checkInTime: property.checkInTime, checkOutTime: property.checkOutTime } : { propertyTypeId: "", name: "", description: "", address: "", lat: 0, lng: 0, cityId: "", images: [], amenities: [], checkInTime: "14:00", checkOutTime: "11:00" });
  const [amenity, setAmenity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  function update<K extends keyof PropertyPayload>(key: K, value: PropertyPayload[K]) { setPayload((current) => ({ ...current, [key]: value })); }
  function chooseCity(cityId: string) { const city = cities.find((item) => item.id === cityId); setPayload((current) => ({ ...current, cityId, lat: city?.latitude ?? current.lat, lng: city?.longitude ?? current.lng })); }
  function addAmenity() { const value = amenity.trim(); if (value && !payload.amenities.includes(value)) update("amenities", [...payload.amenities, value]); setAmenity(""); }
  function toggleAmenity(value: string) { update("amenities", payload.amenities.includes(value) ? payload.amenities.filter((item) => item !== value) : [...payload.amenities, value]); }
  function addImageUrl() { const value = imageUrl.trim(); if (value && !payload.images.includes(value)) update("images", [...payload.images, value]); setImageUrl(""); }
  async function uploadImage(file: File) {
    setUploading(true); setError("");
    try { const body = new FormData(); body.append("file", file); const response = await fetch("/api/uploads", { method: "POST", body }); const result = await response.json(); if (!response.ok || !result.success) throw new Error(result.message || "Upload failed."); update("images", [...payload.images, result.data.url]); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Upload failed."); }
    finally { setUploading(false); }
  }
  async function submit(event: FormEvent) {
    event.preventDefault(); setError("");
    if (!payload.propertyTypeId || !payload.name.trim() || !payload.cityId || !payload.address.trim() || !payload.lat || !payload.lng) { setError("Complete the property type, name, city and map location before continuing."); return; }
    setSaving(true);
    try { const result = await request<Property>(property ? `/api/properties/${property.id}` : "/api/properties", { method: property ? "PATCH" : "POST", body: JSON.stringify(payload) }); onSaved(result); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to save property."); }
    finally { setSaving(false); }
  }
  return <div className="modal-backdrop" role="presentation"><form className="modal property-modal" onSubmit={submit}><header className="modal-header"><div><span className="eyebrow">{property ? "EDIT LISTING" : "NEW LISTING"}</span><h2>{property ? "Update property" : "Add a property"}</h2><p>Tell guests what makes this place worth staying at.</p></div><button type="button" className="icon-button" onClick={onClose} aria-label="Close"><Icon name="close"/></button></header><div className="modal-body">
    {error && <div className="form-error">{error}</div>}
    <fieldset><legend><span>1</span><div>Property basics<small>Name and classify your listing</small></div></legend><label className="form-field full"><span>Property name *</span><input value={payload.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Lagos Grand Hotel"/></label><div className="property-type-field"><span className="property-type-label">Property type *</span><div className="property-type-options">{types.map((type) => <button type="button" key={type.id} className={payload.propertyTypeId === type.id ? "selected" : ""} onClick={() => update("propertyTypeId", type.id)}><Icon name={type.code === "HOTEL" ? "building" : type.code === "SINGLE_ROOM" ? "bed" : "home"}/><span><strong>{type.name}</strong><small>{type.description}</small></span><i>{payload.propertyTypeId === type.id && <Icon name="check" size={13}/>}</i></button>)}</div></div><label className="form-field full"><span>Description</span><textarea rows={4} value={payload.description} onChange={(e) => update("description", e.target.value)} placeholder="Describe the experience, setting and standout features…"/></label></fieldset>
    <fieldset><legend><span>2</span><div>Location<small>Choose a city, then pinpoint the address</small></div></legend><div className="field-grid"><label className="form-field"><span>City *</span><select value={payload.cityId} onChange={(e) => chooseCity(e.target.value)}><option value="">Select a city</option>{cities.map((city) => <option key={city.id} value={city.id}>{city.name}, {city.state}</option>)}</select></label><label className="form-field"><span>Street address *</span><input value={payload.address} onChange={(e) => update("address", e.target.value)} placeholder="12 Adeola Odeku Street"/></label></div><MapPicker lat={payload.lat} lng={payload.lng} address={payload.address} onChange={(location) => setPayload((current) => ({ ...current, lat: location.lat, lng: location.lng, address: location.address ?? current.address }))}/></fieldset>
    <fieldset><legend><span>3</span><div>Photos & amenities<small>Help guests understand what to expect</small></div></legend><div className="image-uploader"><label><Icon name="image" size={24}/><strong>{uploading ? "Uploading image…" : "Upload property photos"}</strong><small>PNG, JPG or WebP · maximum 10MB</small><input type="file" accept="image/*" disabled={uploading} onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}/></label><div className="url-adder"><input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Or paste an image URL"/><button type="button" onClick={addImageUrl}>Add URL</button></div></div>{payload.images.length > 0 && <div className="image-preview-grid">{payload.images.map((url, index) => <div key={`${url}-${index}`} style={{ backgroundImage: `url(${url})` }}><button type="button" onClick={() => update("images", payload.images.filter((_, itemIndex) => itemIndex !== index))} aria-label="Remove image"><Icon name="close" size={14}/></button>{index === 0 && <span>Cover</span>}</div>)}</div>}<div className="property-amenities-field"><div className="amenities-heading"><span>Amenities</span><small>Select all that apply</small></div><div className="amenity-options">{defaultAmenities.map((item) => { const selected = payload.amenities.includes(item); return <button type="button" key={item} className={selected ? "selected" : ""} aria-pressed={selected} onClick={() => toggleAmenity(item)}><span>{selected && <Icon name="check" size={12}/>}</span>{item}</button>; })}</div><label className="form-field full custom-amenity-field"><span>Add another amenity</span><div className="tag-input"><input value={amenity} onChange={(e) => setAmenity(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addAmenity(); } }} placeholder="e.g. Airport shuttle"/><button type="button" onClick={addAmenity} disabled={!amenity.trim()}>Add</button></div></label>{payload.amenities.some((item) => !defaultAmenities.includes(item)) && <div className="editable-tags">{payload.amenities.filter((item) => !defaultAmenities.includes(item)).map((item) => <span key={item}>{item}<button type="button" onClick={() => toggleAmenity(item)} aria-label={`Remove ${item}`}><Icon name="close" size={12}/></button></span>)}</div>}</div></fieldset>
    <fieldset><legend><span>4</span><div>Guest schedule<small>Set standard arrival and departure times</small></div></legend><div className="field-grid guest-schedule-grid"><label className="form-field"><span>Check-in time</span><input type="time" value={payload.checkInTime} onChange={(e) => update("checkInTime", e.target.value)}/></label><label className="form-field"><span>Check-out time</span><input type="time" value={payload.checkOutTime} onChange={(e) => update("checkOutTime", e.target.value)}/></label></div></fieldset>
  </div><footer className="modal-footer"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={saving || uploading}>{saving ? "Saving property…" : property ? "Save changes" : "Create property"}</button></footer></form></div>;
}

function RoomEditor({ propertyId, room, onClose, onSaved }: { propertyId: string; room: RoomType | null; onClose: () => void; onSaved: (room: RoomType) => void }) {
  const [payload, setPayload] = useState<RoomTypePayload>(() => room ? { name: room.name, description: room.description, pricePerNight: room.pricePerNight, quantity: room.quantity, maxGuests: room.maxGuests, images: room.images } : { name: "", description: "", pricePerNight: 0, quantity: 1, maxGuests: 1, images: [] });
  const [imageUrl, setImageUrl] = useState(""); const [saving, setSaving] = useState(false); const [uploading, setUploading] = useState(false); const [error, setError] = useState("");
  function update<K extends keyof RoomTypePayload>(key: K, value: RoomTypePayload[K]) { setPayload((current) => ({ ...current, [key]: value })); }
  async function upload(file: File) { setUploading(true); setError(""); try { const data = new FormData(); data.append("file", file); const response = await fetch("/api/uploads", { method: "POST", body: data }); const body = await response.json(); if (!response.ok || !body.success) throw new Error(body.message || "Upload failed."); update("images", [...payload.images, body.data.url]); } catch (reason) { setError(reason instanceof Error ? reason.message : "Upload failed."); } finally { setUploading(false); } }
  async function submit(event: FormEvent) { event.preventDefault(); setSaving(true); setError(""); try { const result = await request<RoomType>(room ? `/api/properties/${propertyId}/room-types/${room.id}` : `/api/properties/${propertyId}/room-types`, { method: room ? "PATCH" : "POST", body: JSON.stringify(payload) }); onSaved(result); } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to save room type."); } finally { setSaving(false); } }
  function addUrl() { if (imageUrl.trim()) update("images", [...payload.images, imageUrl.trim()]); setImageUrl(""); }
  return <div className="modal-backdrop"><form className="modal room-modal" onSubmit={submit}><header className="modal-header"><div><span className="eyebrow">ROOM INVENTORY</span><h2>{room ? "Edit room type" : "Add room type"}</h2><p>Set the room details, capacity and nightly rate.</p></div><button type="button" className="icon-button" onClick={onClose}><Icon name="close"/></button></header><div className="modal-body">{error && <div className="form-error">{error}</div>}<div className="field-grid"><label className="form-field full"><span>Room name *</span><input required value={payload.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Deluxe King Room"/></label><label className="form-field full"><span>Description</span><textarea rows={3} value={payload.description} onChange={(e) => update("description", e.target.value)} placeholder="Bed type, view, room size…"/></label><label className="form-field"><span>Price per night (₦) *</span><input required type="number" min="0" value={payload.pricePerNight || ""} onChange={(e) => update("pricePerNight", Number(e.target.value))}/></label><label className="form-field"><span>Number of rooms *</span><input required type="number" min="1" value={payload.quantity} onChange={(e) => update("quantity", Number(e.target.value))}/></label><label className="form-field"><span>Maximum guests *</span><input required type="number" min="1" value={payload.maxGuests} onChange={(e) => update("maxGuests", Number(e.target.value))}/></label></div><div className="room-image-field"><span>Room photos</span><div className="room-image-actions"><label className="secondary-button"><Icon name="image" size={15}/>{uploading ? "Uploading…" : "Upload image"}<input type="file" accept="image/*" disabled={uploading} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}/></label><input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Paste image URL"/><button type="button" onClick={addUrl}>Add</button></div>{payload.images.length > 0 && <div className="image-preview-grid room-previews">{payload.images.map((url, index) => <div key={`${url}-${index}`} style={{ backgroundImage: `url(${url})` }}><button type="button" onClick={() => update("images", payload.images.filter((_, i) => i !== index))}><Icon name="close" size={13}/></button></div>)}</div>}</div></div><footer className="modal-footer"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={saving || uploading}>{saving ? "Saving room…" : room ? "Save changes" : "Add room type"}</button></footer></form></div>;
}

function friendlyType(value: string) { return value.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()); }

function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("ALL");
  const [selected, setSelected] = useState<Booking | null>(null);
  const [actionBusy, setActionBusy] = useState<"check-in" | "check-out" | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    request<{ bookings: Booking[]; pagination: { page: number; total: number; totalPages: number } }>(`/api/bookings?page=${page}&limit=20`)
      .then((data) => { if (active) { setBookings(data.bookings); setPagination(data.pagination); setError(""); } })
      .catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : "Unable to load bookings."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page]);

  function changePage(nextPage: number) { setLoading(true); setPage(nextPage); }

  const visibleBookings = bookings.filter((booking) => {
    const matchesQuery = `${booking.bookingNumber} ${booking.propertyName} ${booking.roomTypeName} ${booking.customer?.firstName ?? ""} ${booking.customer?.lastName ?? ""}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (status === "ALL" || booking.status === status);
  });

  async function openBooking(booking: Booking) {
    setError("");
    try { setSelected(await request<Booking>(`/api/bookings/${booking.id}`)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to load booking details."); }
  }

  async function transition(action: "check-in" | "check-out") {
    if (!selected) return;
    const verb = action === "check-in" ? "check in" : "check out";
    if (!window.confirm(`Are you sure you want to ${verb} ${guestName(selected)}?`)) return;
    setActionBusy(action); setError(""); setMessage("");
    try {
      const changed = await request<Booking>(`/api/bookings/${selected.id}/${action}`, { method: "PATCH" });
      const updated = { ...selected, ...changed, customer: changed.customer ?? selected.customer, property: changed.property ?? selected.property };
      setSelected(updated); setBookings((current) => current.map((booking) => booking.id === updated.id ? updated : booking));
      setMessage(action === "check-in" ? "Guest checked in successfully." : "Guest checked out successfully.");
    } catch (reason) { setError(reason instanceof Error ? reason.message : `Unable to ${verb} guest.`); }
    finally { setActionBusy(null); }
  }

  if (selected) return <>
    <button className="back-button" onClick={() => { setSelected(null); setMessage(""); setError(""); }}><span>←</span> Back to bookings</button>
    {message && <div className="success-toast"><Icon name="check" size={17}/>{message}</div>}
    {error && <div className="form-error">{error}</div>}
    <section className="panel booking-detail-hero"><div className="booking-identity"><div className="booking-property-image" style={selected.propertyImage ? { backgroundImage: `url(${selected.propertyImage})` } : undefined}>{!selected.propertyImage && <Icon name="building" size={27}/>}</div><div><span className="booking-number">{selected.bookingNumber}</span><h1>{selected.propertyName}</h1><p>{selected.roomTypeName} · {selected.unitsBooked} {selected.unitsBooked === 1 ? "unit" : "units"}</p></div></div><div className="booking-hero-actions"><BookingStatus status={selected.status}/>{selected.status !== "CHECKED_IN" && selected.status !== "CHECKED_OUT" && selected.status !== "CANCELLED" && <button className="primary-button" disabled={actionBusy !== null} onClick={() => transition("check-in")}><Icon name="check" size={16}/>{actionBusy === "check-in" ? "Checking in…" : "Check in guest"}</button>}{selected.status === "CHECKED_IN" && <button className="primary-button" disabled={actionBusy !== null} onClick={() => transition("check-out")}><Icon name="logout" size={16}/>{actionBusy === "check-out" ? "Checking out…" : "Check out guest"}</button>}</div></section>
    <section className="booking-detail-grid"><div className="booking-main-column"><div className="panel booking-section"><div className="section-title"><span><Icon name="calendar"/></span><div><h2>Stay details</h2><p>Arrival, departure and occupancy</p></div></div><div className="stay-timeline"><div><small>CHECK-IN</small><strong>{formatBookingDate(selected.checkIn)}</strong><span>From property check-in time</span></div><i/><div><small>{selected.nights} {selected.nights === 1 ? "NIGHT" : "NIGHTS"}</small><Icon name="arrow" size={18}/></div><i/><div><small>CHECK-OUT</small><strong>{formatBookingDate(selected.checkOut)}</strong><span>By property check-out time</span></div></div><div className="booking-facts"><span><Icon name="users" size={17}/><strong>{selected.guests}</strong> {selected.guests === 1 ? "guest" : "guests"}</span><span><Icon name="bed" size={17}/><strong>{selected.unitsBooked}</strong> {selected.unitsBooked === 1 ? "unit" : "units"}</span><span><Icon name="clock" size={17}/><strong>{selected.nights}</strong> {selected.nights === 1 ? "night" : "nights"}</span></div></div><div className="panel booking-section"><div className="section-title"><span><Icon name="user"/></span><div><h2>Guest information</h2><p>Primary contact for this reservation</p></div></div><div className="guest-profile"><span className="large-avatar guest-avatar">{guestInitials(selected)}</span><div><h3>{guestName(selected)}</h3><a href={`mailto:${selected.customer?.email ?? ""}`}><Icon name="mail" size={14}/>{selected.customer?.email || "No email provided"}</a><a href={`tel:${selected.customer?.phone ?? ""}`}><Icon name="phone" size={14}/>{selected.customer?.phone || "No phone provided"}</a></div></div>{selected.specialRequests && <div className="special-request"><strong>Special request</strong><p>{selected.specialRequests}</p></div>}</div></div>
      <aside className="panel payment-summary"><div className="section-title"><span><Icon name="wallet"/></span><div><h2>Payment summary</h2><p>Booking charges and status</p></div></div><dl><div><dt>{money(selected.pricePerNight)} × {selected.nights} nights</dt><dd>{money(selected.subtotal)}</dd></div><div><dt>Service fee</dt><dd>{money(selected.serviceFee)}</dd></div><div className="payment-total"><dt>Total</dt><dd>{money(selected.total)}</dd></div></dl><div className="payment-meta"><div><span>Payment status</span><PaymentStatus status={selected.paymentStatus}/></div><div><span>Payment method</span><strong>{friendlyType(selected.paymentMethod || "Not provided")}</strong></div><div><span>Booked on</span><strong>{formatDateTime(selected.createdAt)}</strong></div>{selected.checkedInAt && <div><span>Checked in</span><strong>{formatDateTime(selected.checkedInAt)}</strong></div>}{selected.checkedOutAt && <div><span>Checked out</span><strong>{formatDateTime(selected.checkedOutAt)}</strong></div>}</div></aside>
    </section>
  </>;

  return <>
    <div className="page-heading"><div><span className="eyebrow">RESERVATIONS</span><h1>Bookings</h1><p>Stay on top of guest arrivals, payments and reservation activity.</p></div><div className="booking-summary-pill"><span>{pagination.total}</span> total bookings</div></div>
    {error && <div className="form-error">{error}</div>}
    <section className="panel bookings-panel"><div className="bookings-toolbar"><label className="search-box wide"><Icon name="search" size={18}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search guest, property or booking number"/></label><div className="status-filters">{["ALL", "PENDING_PAYMENT", "CONFIRMED", "CHECKED_IN", "CHECKED_OUT"].map((item) => <button key={item} className={status === item ? "active" : ""} onClick={() => setStatus(item)}>{item === "ALL" ? "All" : bookingStatusLabel(item)}</button>)}</div></div>
      {loading ? <div className="booking-list-loading">{[1,2,3,4].map((item) => <span className="skeleton" key={item}/>)}</div> : visibleBookings.length ? <div className="bookings-table"><div className="booking-row booking-table-head"><span>BOOKING</span><span>GUEST</span><span>STAY</span><span>TOTAL</span><span>STATUS</span><span/></div>{visibleBookings.map((booking) => <button className="booking-row" key={booking.id} onClick={() => openBooking(booking)}><div className="booking-property"><div style={booking.propertyImage ? { backgroundImage: `url(${booking.propertyImage})` } : undefined}>{!booking.propertyImage && <Icon name="building" size={17}/>}</div><span><strong>{booking.propertyName}</strong><small>{booking.bookingNumber} · {booking.roomTypeName}</small></span></div><div className="booking-guest"><strong>{guestName(booking)}</strong><small>{booking.guests} {booking.guests === 1 ? "guest" : "guests"}</small></div><div className="booking-dates"><strong>{shortDate(booking.checkIn)} → {shortDate(booking.checkOut)}</strong><small>{booking.nights} {booking.nights === 1 ? "night" : "nights"}</small></div><strong className="booking-total">{money(booking.total)}</strong><BookingStatus status={booking.status}/><Icon name="chevron" size={16}/></button>)}</div> : <EmptyState icon="calendar" title={query || status !== "ALL" ? "No matching bookings" : "No bookings yet"} body={query || status !== "ALL" ? "Try changing your search or status filter." : "Guest reservations will show up here once your properties are live."} action={query || status !== "ALL" ? "Clear filters" : "View properties"} onAction={() => { setQuery(""); setStatus("ALL"); }}/>} 
      {pagination.totalPages > 1 && <div className="pagination"><button disabled={page === 1} onClick={() => changePage(page - 1)}>Previous</button><span>Page {page} of {pagination.totalPages}</span><button disabled={page === pagination.totalPages} onClick={() => changePage(page + 1)}>Next</button></div>}
    </section>
  </>;
}

function BookingStatus({ status }: { status: string }) { return <span className={`booking-status ${status.toLowerCase()}`}><i/>{bookingStatusLabel(status)}</span>; }
function PaymentStatus({ status }: { status: string }) { return <span className={`payment-status ${status.toLowerCase()}`}><i/>{friendlyType(status)}</span>; }
function bookingStatusLabel(status: string) { return ({ PENDING_PAYMENT: "Pending payment", CONFIRMED: "Confirmed", CHECKED_IN: "Checked in", CHECKED_OUT: "Checked out", CANCELLED: "Cancelled" } as Record<string,string>)[status] ?? friendlyType(status); }
function guestName(booking: Booking) { return booking.customer ? titleCase(`${booking.customer.firstName} ${booking.customer.lastName}`) : "Guest details unavailable"; }
function guestInitials(booking: Booking) { return booking.customer ? `${booking.customer.firstName[0] ?? ""}${booking.customer.lastName[0] ?? ""}`.toUpperCase() : "G"; }
function shortDate(value: string) { return new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short" }).format(new Date(value)); }
function formatBookingDate(value: string) { return new Intl.DateTimeFormat("en-NG", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(new Date(value)); }
function formatDateTime(value: string) { return new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value)); }

function EarningsPage() {
  const [balance, setBalance] = useState<EarningsBalance | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPayout, setShowPayout] = useState(false);
  const [showBankAccount, setShowBankAccount] = useState(false);
  const [removingAccount, setRemovingAccount] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      request<EarningsBalance>("/api/earnings/balance"),
      request<{ transactions: WalletTransaction[]; pagination: Pagination }>(`/api/earnings/transactions?page=${page}&limit=20`),
      request<BankAccount[]>("/api/bank-accounts"),
    ]).then(([nextBalance, result, accounts]) => {
      if (cancelled) return;
      setBalance(nextBalance); setTransactions(result.transactions); setPagination(result.pagination); setBankAccounts(accounts);
    }).catch((reason) => { if (!cancelled) setError(reason instanceof Error ? reason.message : "Unable to load earnings."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [page, refreshKey]);

  const visibleTransactions = transactions.filter((transaction) => `${transaction.description} ${transaction.type} ${transaction.channel} ${transaction.status}`.toLowerCase().includes(query.toLowerCase()));
  function changePage(nextPage: number) { setLoading(true); setError(""); setPage(nextPage); }
  function refresh() { setLoading(true); setError(""); setRefreshKey((current) => current + 1); }
  async function removeBankAccount(account: BankAccount) {
    if (!window.confirm(`Remove ${account.bankName} account ending in ${account.accountNumber.slice(-4)}?`)) return;
    setRemovingAccount(account.id); setError(""); setMessage("");
    try {
      await request<null>(`/api/bank-accounts/${account.id}`, { method: "DELETE" });
      setBankAccounts((current) => current.filter((item) => item.id !== account.id));
      setMessage("Bank account removed successfully.");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to remove bank account."); }
    finally { setRemovingAccount(null); }
  }
  function bankAccountSaved(account: BankAccount) {
    setBankAccounts((current) => [account, ...current.filter((item) => item.id !== account.id)]);
    setShowBankAccount(false); setMessage("Bank account verified and saved successfully.");
  }
  function refreshAfterPayout(payout: Payout) {
    setShowPayout(false);
    setMessage(`Your ${money(payout.amount)} payout request was submitted.`);
    setPage(1);
    Promise.all([
      request<EarningsBalance>("/api/earnings/balance"),
      request<{ transactions: WalletTransaction[]; pagination: Pagination }>("/api/earnings/transactions?page=1&limit=20"),
    ]).then(([nextBalance, result]) => { setBalance(nextBalance); setTransactions(result.transactions); setPagination(result.pagination); }).catch(() => undefined);
  }

  return <>
    <div className="page-heading"><div><span className="eyebrow">FINANCES</span><h1>Earnings</h1><p>Track every wallet credit, fee and payout from one place.</p></div><button className="primary-button" disabled={!balance || balance.availableForPayout < balance.minPayoutAmount || !bankAccounts.some((account) => account.isVerified)} onClick={() => setShowPayout(true)}><Icon name="wallet" size={17}/> Request payout</button></div>
    {message && <div className="success-toast"><Icon name="check" size={17}/>{message}</div>}
    {error && <div className="form-error">{error}</div>}
    <section className="earnings-balance-grid">
      <EarningsBalanceCard label="Available for payout" value={balance?.availableForPayout} note={balance ? `Minimum payout ${money(balance.minPayoutAmount)}` : "Loading balance…"} tone="green"/>
      <EarningsBalanceCard label="Pending balance" value={balance?.pendingBalance} note="Funds awaiting availability" tone="gold"/>
      <EarningsBalanceCard label="Locked balance" value={balance?.lockedBalance} note="Funds currently on hold" tone="slate"/>
    </section>
    <section className="panel payout-accounts-panel"><div className="panel-head"><div><h2>Payout accounts</h2><p>Verified bank accounts available for withdrawals</p></div><button className="secondary-button" onClick={() => setShowBankAccount(true)}><Icon name="plus" size={15}/> Add or replace account</button></div>{bankAccounts.length ? <div className="bank-account-list">{bankAccounts.map((account) => <article className="bank-account-row" key={account.id}><span className="bank-mark"><Icon name="building" size={17}/></span><div><strong>{account.bankName}</strong><small>{account.accountName} · •••• {account.accountNumber.slice(-4)}</small></div><div className="bank-account-badges">{account.isDefault && <span>Default</span>}{account.isVerified && <span className="verified">Verified</span>}</div><button className="icon-button bank-remove" type="button" disabled={removingAccount === account.id} onClick={() => void removeBankAccount(account)} aria-label={`Remove ${account.bankName} account`}><Icon name="trash" size={15}/></button></article>)}</div> : <div className="no-bank-account"><p>Add and verify a bank account before requesting a payout.</p><button className="secondary-button compact" onClick={() => setShowBankAccount(true)}>Add bank account</button></div>}</section>
    <section className="panel earnings-transactions-panel">
      <div className="collection-toolbar"><div><h2>Transaction history</h2><p>All wallet activity, including booking credits and payouts</p></div><label className="search-box wide"><Icon name="search" size={18}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search transactions"/></label></div>
      {loading
        ? <div className="transaction-loading">{[1,2,3,4,5].map((item) => <span className="skeleton" key={item}/>)}</div>
        : visibleTransactions.length
          ? <div className="transactions-table"><div className="transaction-row transaction-head"><span>TRANSACTION</span><span>DATE</span><span>CHANNEL</span><span>STATUS</span><span>AMOUNT</span></div>{visibleTransactions.map((transaction) => <TransactionRow transaction={transaction} key={transaction.id}/>)}</div>
          : <EmptyState icon="wallet" title={query ? "No matching transactions" : "No transactions yet"} body={query ? "Try another search term." : "Booking credits, fees and payout activity will appear here."} action={query ? "Clear search" : "Refresh"} onAction={() => query ? setQuery("") : refresh()}/>
      }
      {pagination.totalPages > 1 && <div className="pagination"><button disabled={page === 1} onClick={() => changePage(page - 1)}>Previous</button><span>Page {page} of {pagination.totalPages}</span><button disabled={page >= pagination.totalPages} onClick={() => changePage(page + 1)}>Next</button></div>}
    </section>
    {showPayout && balance && <PayoutModal balance={balance} bankAccounts={bankAccounts.filter((account) => account.isVerified)} onClose={() => setShowPayout(false)} onSuccess={refreshAfterPayout}/>
    }
    {showBankAccount && <BankAccountModal onClose={() => setShowBankAccount(false)} onSuccess={bankAccountSaved}/>}
  </>;
}

function EarningsBalanceCard({ label, value, note, tone }: { label: string; value?: number; note: string; tone: "green" | "gold" | "slate" }) {
  return <article className={`panel earnings-balance-card ${tone}`}><span>{label}</span><strong>{value === undefined ? "—" : money(value)}</strong><small>{note}</small></article>;
}

function TransactionRow({ transaction }: { transaction: WalletTransaction }) {
  const creditTypes: WalletTransaction["type"][] = ["CREDIT", "TRANSFER_IN", "REFUND", "BONUS", "CASHBACK", "REVERSAL"];
  const isCredit = creditTypes.includes(transaction.type);
  return <div className="transaction-row"><div className="transaction-description"><span className={isCredit ? "credit" : "debit"}><Icon name={isCredit ? "trend" : "wallet"} size={15}/></span><div><strong>{transaction.description || friendlyType(transaction.type)}</strong><small>{friendlyType(transaction.type)} · {transaction.referenceType ? friendlyType(transaction.referenceType) : "Wallet"}</small></div></div><span>{formatDateTime(transaction.createdAt)}</span><span>{friendlyType(transaction.channel)}</span><span className={`transaction-status ${transaction.status.toLowerCase()}`}>{friendlyType(transaction.status)}</span><strong className={isCredit ? "transaction-credit" : "transaction-debit"}>{isCredit ? "+" : "−"}{money(transaction.amount)}</strong></div>;
}

function PayoutModal({ balance, bankAccounts, onClose, onSuccess }: { balance: EarningsBalance; bankAccounts: BankAccount[]; onClose: () => void; onSuccess: (payout: Payout) => void }) {
  const [amount, setAmount] = useState("");
  const [bankAccountId, setBankAccountId] = useState(bankAccounts.find((account) => account.isDefault)?.id ?? bankAccounts[0]?.id ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const numericAmount = Number(amount);
  const valid = numericAmount >= balance.minPayoutAmount && numericAmount <= balance.availableForPayout && numericAmount <= 10_000_000;
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!valid) { setError(`Enter an amount between ${money(balance.minPayoutAmount)} and ${money(Math.min(balance.availableForPayout, 10_000_000))}.`); return; }
    setBusy(true); setError("");
    try {
      const payout = await request<Payout>("/api/earnings/payout", { method: "POST", body: JSON.stringify({ amount: numericAmount, bankAccountId }) });
      onSuccess(payout);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to request payout."); }
    finally { setBusy(false); }
  }
  return <div className="modal-backdrop"><form className="modal payout-modal" onSubmit={submit}><header className="modal-header"><div><span className="eyebrow">WITHDRAW FUNDS</span><h2>Request payout</h2><p>Choose where you want to receive your funds.</p></div><button type="button" className="icon-button" onClick={onClose}><Icon name="close"/></button></header><div className="payout-modal-body">{error && <div className="form-error">{error}</div>}<div className="payout-available"><span>Available</span><strong>{money(balance.availableForPayout)}</strong></div><label className="form-field"><span>Bank account</span><select value={bankAccountId} onChange={(event) => setBankAccountId(event.target.value)}>{bankAccounts.map((account) => <option value={account.id} key={account.id}>{account.bankName} · •••• {account.accountNumber.slice(-4)}{account.isDefault ? " (Default)" : ""}</option>)}</select></label><label className="form-field"><span>Amount</span><div className="currency-input"><b>₦</b><input type="number" min={balance.minPayoutAmount} max={Math.min(balance.availableForPayout, 10_000_000)} step="1" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0" autoFocus/></div><small>Minimum payout is {money(balance.minPayoutAmount)}</small></label></div><footer className="modal-footer"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={busy || !valid || !bankAccountId}>{busy ? "Submitting…" : "Request payout"}</button></footer></form></div>;
}

function BankAccountModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (account: BankAccount) => void }) {
  const [banks, setBanks] = useState<SupportedBank[]>([]);
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [verified, setVerified] = useState<VerifiedBankAccount | null>(null);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { request<SupportedBank[]>("/api/bank-accounts/banks").then(setBanks).catch((reason) => setError(reason instanceof Error ? reason.message : "Unable to load banks.")).finally(() => setLoadingBanks(false)); }, []);
  function changeBank(value: string) { setBankCode(value); setVerified(null); setError(""); }
  function changeAccountNumber(value: string) { setAccountNumber(value.replace(/\D/g, "").slice(0, 10)); setVerified(null); setError(""); }
  async function verify() {
    if (!bankCode || accountNumber.length !== 10) { setError("Select a bank and enter a 10-digit account number."); return; }
    setVerifying(true); setError("");
    try { setVerified(await request<VerifiedBankAccount>(`/api/bank-accounts/verify?accountNumber=${encodeURIComponent(accountNumber)}&bankCode=${encodeURIComponent(bankCode)}`)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to verify this account."); }
    finally { setVerifying(false); }
  }
  async function save(event: FormEvent) {
    event.preventDefault(); if (!verified) return;
    const bank = banks.find((item) => item.code === bankCode); if (!bank) return;
    setSaving(true); setError("");
    try { onSuccess(await request<BankAccount>("/api/bank-accounts", { method: "POST", body: JSON.stringify({ accountNumber: verified.accountNumber, accountName: verified.accountName, bankCode: verified.bankCode, bankName: bank.name }) })); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to save this bank account."); }
    finally { setSaving(false); }
  }
  return <div className="modal-backdrop"><form className="modal payout-modal" onSubmit={save}><header className="modal-header"><div><span className="eyebrow">PAYOUT SETTINGS</span><h2>Add bank account</h2><p>Verify the account details before saving.</p></div><button type="button" className="icon-button" onClick={onClose}><Icon name="close"/></button></header><div className="payout-modal-body bank-form">{error && <div className="form-error">{error}</div>}<label className="form-field"><span>Bank</span><select value={bankCode} disabled={loadingBanks} onChange={(event) => changeBank(event.target.value)}><option value="">{loadingBanks ? "Loading banks…" : "Select a bank"}</option>{banks.map((bank) => <option value={bank.code} key={bank.code}>{bank.name}</option>)}</select></label><label className="form-field"><span>Account number</span><div className="verify-account-row"><input inputMode="numeric" value={accountNumber} onChange={(event) => changeAccountNumber(event.target.value)} placeholder="0123456789"/><button className="secondary-button" type="button" disabled={verifying || !bankCode || accountNumber.length !== 10} onClick={() => void verify()}>{verifying ? "Verifying…" : "Verify"}</button></div></label>{verified && <div className="verified-account"><Icon name="check" size={17}/><div><span>Account verified</span><strong>{verified.accountName}</strong><small>{verified.accountNumber}</small></div></div>}</div><footer className="modal-footer"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={saving || !verified}>{saving ? "Saving…" : "Save bank account"}</button></footer></form></div>;
}

function EmptyState({ icon, title, body, action, onAction }: { icon: IconName; title: string; body: string; action: string; onAction?: () => void }) {
  return <div className="empty-state"><div><Icon name={icon} size={25}/></div><h3>{title}</h3><p>{body}</p><button className="secondary-button compact" onClick={onAction}>{action} <Icon name="arrow" size={15}/></button></div>;
}

function ProfilePage() {
  const [profile, setProfile] = useState<OwnerProfile | null>(null);
  const [draft, setDraft] = useState<OwnerProfile | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    request<OwnerProfile>("/api/owner")
      .then((data) => {
        const nextProfile = { ...data, address: { ...data.address, country: "Nigeria" } };
        setProfile(nextProfile);
        setDraft(nextProfile);
      })
      .catch((e) => setError(e.message));
    request<City[]>("/api/locations").then(setCities).catch(() => setCities([]));
  }, []);
  const initials = useMemo(() => profile?.fullName.split(" ").map((part) => part[0]).slice(0, 2).join(""), [profile]);
  function field(key: keyof OwnerProfile, value: string) { setDraft((current) => current ? { ...current, [key]: value } : current); }
  function addressField(key: keyof OwnerProfile["address"], value: string) { setDraft((current) => current ? { ...current, address: { ...current.address, [key]: key === "latitude" || key === "longitude" ? Number(value) : value } } : current); }
  function chooseCity(cityName: string) {
    const city = cities.find((item) => item.name === cityName);
    setDraft((current) => current ? { ...current, address: { ...current.address, city: cityName, state: city?.state ?? "", country: "Nigeria" } } : current);
  }
  function selectStreet(address: { street: string; city?: string; state?: string; latitude: number; longitude: number }) {
    const normalized = (value: string) => value.trim().toLocaleLowerCase();
    const matchedCity = cities.find((city) => address.city && normalized(city.name) === normalized(address.city))
      ?? cities.find((city) => address.state && normalized(city.state) === normalized(address.state) && address.city && normalized(address.city).includes(normalized(city.name)));
    setDraft((current) => current ? { ...current, address: {
      ...current.address,
      street: address.street,
      city: matchedCity?.name ?? current.address.city,
      state: matchedCity?.state ?? current.address.state,
      country: "Nigeria",
      latitude: address.latitude,
      longitude: address.longitude,
    } } : current);
  }
  async function save(event: FormEvent) {
    event.preventDefault(); if (!draft) return; setSaving(true); setError(""); setMessage("");
    try {
      const updated = await request<OwnerProfile>("/api/owner", { method: "PATCH", body: JSON.stringify({ businessName: draft.businessName, businessDescription: draft.businessDescription, businessPhone: draft.businessPhone, businessEmail: draft.businessEmail, address: { ...draft.address, country: "Nigeria" } }) });
      setProfile(updated); setDraft(updated); setEditing(false); setMessage("Profile changes saved successfully.");
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to save profile."); }
    finally { setSaving(false); }
  }
  if (error && !profile) return <ErrorState message={error} onRetry={() => location.reload()}/>;
  if (!profile || !draft) return <div className="profile-loading"><span className="skeleton profile-hero-skeleton"/><span className="skeleton profile-card-skeleton"/></div>;
  return <>
    <div className="page-heading profile-heading"><div><span className="eyebrow">ACCOUNT SETTINGS</span><h1>Profile & business</h1><p>Keep your identity and business information up to date.</p></div>{!editing && <button className="primary-button" onClick={() => { setDraft(profile); setEditing(true); setMessage(""); }}>Edit profile</button>}</div>
    {message && <div className="success-toast"><Icon name="check" size={17}/>{message}</div>}
    {error && <div className="form-error">{error}</div>}
    <section className="profile-layout">
      <aside className="panel profile-summary"><div className="large-avatar">{initials}</div><h2>{titleCase(profile.fullName)}</h2><p>{profile.userEmail}</p><span className="verified-badge"><Icon name="check" size={14}/> Verified owner</span><div className="summary-divider"/><dl><div><dt>Member since</dt><dd>{new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(profile.createdAt))}</dd></div><div><dt>Commission rate</dt><dd>{profile.customCommissionPercent}%</dd></div></dl></aside>
      <div className="profile-content">
        <form className="panel profile-form" onSubmit={save}>
          <div className="form-section"><div className="section-title"><span><Icon name="user"/></span><div><h2>Personal information</h2><p>Information linked to your Asoose account</p></div></div><div className="field-grid"><InfoField label="Full name" value={profile.fullName}/><InfoField label="Email address" value={profile.userEmail} icon="mail"/><InfoField label="Phone number" value={profile.userPhone} icon="phone"/><InfoField label="Account role" value="Property owner"/></div></div>
          <div className="form-section"><div className="section-title"><span><Icon name="building"/></span><div><h2>Business details</h2><p>Details shown across your owner profile</p></div></div><div className="field-grid"><EditableField label="Business name" value={draft.businessName} disabled={!editing} onChange={(v) => field("businessName", v)}/><EditableField label="Business email" type="email" value={draft.businessEmail} disabled={!editing} onChange={(v) => field("businessEmail", v)}/><EditableField label="Business phone" value={draft.businessPhone} disabled={!editing} onChange={(v) => field("businessPhone", v)}/><label className="form-field full"><span>Business description</span><textarea value={draft.businessDescription} disabled={!editing} onChange={(e) => field("businessDescription", e.target.value)} rows={4}/></label></div></div>
          <div className="form-section"><div className="section-title"><span><Icon name="map"/></span><div><h2>Business address</h2><p>Your primary operating address in Nigeria</p></div></div><div className="field-grid"><StreetAddressAutocomplete value={draft.address.street} disabled={!editing} onChange={(value) => addressField("street", value)} onSelect={selectStreet}/><label className="form-field"><span>City</span><select value={draft.address.city} disabled={!editing} onChange={(event) => chooseCity(event.target.value)}><option value="">Select a city</option>{draft.address.city && !cities.some((city) => city.name === draft.address.city) && <option value={draft.address.city}>{draft.address.city}</option>}{cities.map((city) => <option key={city.id} value={city.name}>{city.name}</option>)}</select></label><EditableField label="State" value={draft.address.state} disabled onChange={() => undefined}/></div></div>
          {editing && <div className="form-actions"><button type="button" className="secondary-button" onClick={() => { setDraft(profile); setEditing(false); setError(""); }}>Cancel</button><button className="primary-button" disabled={saving}>{saving ? "Saving changes…" : "Save changes"}</button></div>}
        </form>
        <ChangePasswordSection/>
      </div>
    </section>
  </>;
}

function ChangePasswordSection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const passwordValid = newPassword.length >= 8
    && newPassword.length <= 128
    && /[a-z]/.test(newPassword)
    && /[A-Z]/.test(newPassword)
    && /\d/.test(newPassword);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (currentPassword.length < 8 || currentPassword.length > 128) {
      setError("Current password must be between 8 and 128 characters.");
      return;
    }
    if (!passwordValid) {
      setError("New password must be 8–128 characters and include an uppercase letter, a lowercase letter, and a number.");
      return;
    }
    if (newPassword === currentPassword) {
      setError("New password must be different from your current password.");
      return;
    }
    if (confirmPassword !== newPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    setSaving(true);
    try {
      await request<null>("/api/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("Password changed successfully.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to change your password.");
    } finally {
      setSaving(false);
    }
  }

  const inputType = showPasswords ? "text" : "password";
  return <form className="panel profile-form security-form" onSubmit={submit}>
    <div className="form-section">
      <div className="section-title"><span><Icon name="shield"/></span><div><h2>Change password</h2><p>Use a strong, unique password to protect your account</p></div></div>
      {message && <div className="success-toast security-message" role="status"><Icon name="check" size={17}/>{message}</div>}
      {error && <div className="form-error" role="alert">{error}</div>}
      <div className="field-grid password-grid">
        <PasswordField label="Current password" value={currentPassword} type={inputType} autoComplete="current-password" onChange={setCurrentPassword}/>
        <PasswordField label="New password" value={newPassword} type={inputType} autoComplete="new-password" onChange={setNewPassword}/>
        <PasswordField label="Confirm new password" value={confirmPassword} type={inputType} autoComplete="new-password" onChange={setConfirmPassword}/>
        <label className="show-passwords"><input type="checkbox" checked={showPasswords} onChange={(event) => setShowPasswords(event.target.checked)}/> Show passwords</label>
      </div>
      <p className="password-requirements">8–128 characters, with at least one uppercase letter, one lowercase letter, and one number.</p>
    </div>
    <div className="form-actions"><button className="primary-button" disabled={saving || !currentPassword || !newPassword || !confirmPassword}>{saving ? "Changing password…" : "Change password"}</button></div>
  </form>;
}

function PasswordField({ label, value, type, autoComplete, onChange }: { label: string; value: string; type: "text" | "password"; autoComplete: string; onChange: (value: string) => void }) {
  return <label className="form-field"><span>{label}</span><input type={type} value={value} minLength={8} maxLength={128} autoComplete={autoComplete} onChange={(event) => onChange(event.target.value)} required/></label>;
}

function InfoField({ label, value, icon }: { label: string; value: string; icon?: IconName }) { return <div className="info-field"><span>{label}</span><p>{icon && <Icon name={icon} size={16}/>} {value || "Not provided"}</p></div>; }
function EditableField({ label, value, disabled, onChange, type = "text", extraClass = "" }: { label: string; value: string; disabled: boolean; onChange: (value: string) => void; type?: string; extraClass?: string }) { return <label className={`form-field ${extraClass}`}><span>{label}</span><input type={type} value={value ?? ""} disabled={disabled} onChange={(e) => onChange(e.target.value)}/></label>; }
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) { return <div className="panel error-state"><div>!</div><h2>We couldn’t load this page</h2><p>{message}</p><button className="primary-button" onClick={onRetry}>Try again</button></div>; }
function money(value: number) { return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value); }
function titleCase(value: string) { return value.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase()); }
