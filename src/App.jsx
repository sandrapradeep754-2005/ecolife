import { useState } from "react";

const theme = {
  bg: "#F7F6F2",
  card: "#FFFFFF",
  green: "#1A7A4A",
  greenLight: "#E8F5EE",
  greenMid: "#2EA06A",
  blue: "#1560A8",
  blueLight: "#E6F0FB",
  amber: "#B45309",
  amberLight: "#FEF3C7",
  red: "#B91C1C",
  redLight: "#FEE2E2",
  text: "#1C1C1A",
  textSub: "#6B6B67",
  border: "rgba(0,0,0,0.08)",
  navH: 64,
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:${theme.bg};font-family:'DM Sans',sans-serif;color:${theme.text};-webkit-font-smoothing:antialiased;}
  .heading{font-family:'Space Grotesk',sans-serif;}
  button{font-family:'DM Sans',sans-serif;cursor:pointer;border:none;outline:none;}
  input{font-family:'DM Sans',sans-serif;}
  ::-webkit-scrollbar{width:0;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
  @keyframes barGrow{from{width:0}to{width:var(--w)}}
  .fade-up{animation:fadeUp .35s ease both;}
  .fade-up-1{animation:fadeUp .35s .05s ease both;}
  .fade-up-2{animation:fadeUp .35s .10s ease both;}
  .fade-up-3{animation:fadeUp .35s .15s ease both;}
  .fade-up-4{animation:fadeUp .35s .20s ease both;}
  .fade-up-5{animation:fadeUp .35s .25s ease both;}
  .fade-up-6{animation:fadeUp .35s .30s ease both;}

  .nav-btn{transition:background .15s,transform .1s;}
  .nav-btn:active{transform:scale(0.93);}
  .tap-scale{transition:transform .12s;}
  .tap-scale:active{transform:scale(0.97);}

  .bar-anim{animation:barGrow .6s .3s ease both;}
`;

// ── Icons ──────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    rank: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    solar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    recycle: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1.5 8.5 1.5 3.5 6.5 3.5"/><path d="M1.5 3.5 L7 9"/><polyline points="22.5 15.5 22.5 20.5 17.5 20.5"/><path d="M22.5 20.5 L17 15"/><path d="M4 16.5A9 9 0 0 1 12 3"/><path d="M20 7.5A9 9 0 0 1 12 21"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    bolt: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    trophy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M5.5 4h13L17 11a5 5 0 0 1-10 0L5.5 4z"/><path d="M5.5 4 H3 a1 1 0 0 0-1 1v1a4 4 0 0 0 3.5 3.97"/><path d="M18.5 4 H21 a1 1 0 0 1 1 1v1a4 4 0 0 1-3.5 3.97"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    leaf: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22c1.25-1.25 2.5-2.5 3.5-3.5"/><path d="M20 2s-8 2-11 6c-2.5 3.5-2.5 7-2.5 7s3.5 0 7-2.5c4-3 6-11 6-11z"/></svg>,
    arrow_right: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    rupee: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="18" y2="3"/><line x1="6" y1="8" x2="18" y2="8"/><line x1="6" y1="13" x2="12" y2="21"/><path d="M6 8a6 6 0 0 0 0 0h6a3 3 0 0 0 0-6"/></svg>,
  };
  return icons[name] || null;
};

// ── Shared Components ──────────────────────────────────────────────────
const Tag = ({ label, color = "green" }) => {
  const colors = {
    green: { bg: theme.greenLight, text: theme.green },
    blue: { bg: theme.blueLight, text: theme.blue },
    amber: { bg: theme.amberLight, text: theme.amber },
    red: { bg: theme.redLight, text: theme.red },
    gray: { bg: "#F1F0EC", text: "#555" },
  };
  const c = colors[color] || colors.green;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 99, background: c.bg, color: c.text, letterSpacing: "0.02em" }}>
      {label}
    </span>
  );
};

const Card = ({ children, style = {}, className = "" }) => (
  <div className={`tap-scale ${className}`} style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, padding: "14px 16px", ...style }}>
    {children}
  </div>
);

const StatGrid = ({ stats }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "0 16px" }}>
    {stats.map((s, i) => (
      <div key={i} style={{ background: theme.card, borderRadius: 14, border: `1px solid ${theme.border}`, padding: "12px 14px" }}>
        <div style={{ fontSize: 22, fontWeight: 600, color: s.color || theme.text, fontFamily: "'Space Grotesk', sans-serif" }}>{s.val}</div>
        <div style={{ fontSize: 12, color: theme.textSub, marginTop: 2 }}>{s.label}</div>
      </div>
    ))}
  </div>
);

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 600, color: theme.textSub, textTransform: "uppercase", letterSpacing: "0.06em", padding: "16px 16px 6px" }}>
    {children}
  </div>
);

const Divider = () => <div style={{ height: 1, background: theme.border, margin: "8px 0" }} />;

// ── Leaderboard Page ───────────────────────────────────────────────────
const leaderData = [
  { rank: 1, name: "Rekha Nair", pickups: 22, kwh: 180, pts: 3840 },
  { rank: 2, name: "Mohan Das", pickups: 19, kwh: 210, pts: 3610 },
  { rank: 3, name: "Anitha K.", pickups: 18, kwh: 95, pts: 2980 },
  { rank: 4, name: "Priya M.", pickups: 15, kwh: 140, pts: 2540 },
  { rank: 5, name: "You (Suresh P.)", pickups: 12, kwh: 60, pts: 1920, isYou: true },
  { rank: 6, name: "Rajan V.", pickups: 10, kwh: 30, pts: 1340 },
];
const medalColor = ["#D4A017", "#9AA4B0", "#C07B4A"];

const LeaderboardPage = () => {
  const max = leaderData[0].pts;
  return (
    <div>
      <div className="fade-up" style={{ padding: "20px 16px 12px", background: theme.card, borderBottom: `1px solid ${theme.border}` }}>
        <div className="heading" style={{ fontSize: 22, fontWeight: 700 }}>Greenfield Heights</div>
        <div style={{ fontSize: 13, color: theme.textSub, marginTop: 2 }}>Monthly leaderboard · April 2026</div>
      </div>

      {/* Hero top-3 */}
      <div className="fade-up-1" style={{ padding: "16px 16px 0", display: "flex", gap: 8 }}>
        {leaderData.slice(0, 3).map((p, i) => (
          <div key={i} style={{ flex: 1, background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, padding: "12px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 22 }}>{["🥇", "🥈", "🥉"][i]}</div>
            <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4, color: theme.text }}>{p.name.split(" ")[0]}</div>
            <div style={{ fontSize: 11, color: theme.textSub, marginTop: 1 }}>{p.pickups}pkp · {p.kwh}kWh</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.green, marginTop: 4, fontFamily: "'Space Grotesk',sans-serif" }}>{p.pts.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <SectionLabel>Full ranking</SectionLabel>
      <div className="fade-up-2" style={{ margin: "0 16px", background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
        {leaderData.map((p, i) => (
          <div key={i}>
            <div style={{
              padding: "12px 14px",
              background: p.isYou ? theme.greenLight : "transparent",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, background: i < 3 ? `${medalColor[i]}22` : "#F1F0EC", color: i < 3 ? medalColor[i] : theme.textSub, flexShrink: 0, fontFamily: "'Space Grotesk',sans-serif" }}>
                {p.rank}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: p.isYou ? 600 : 400, color: p.isYou ? theme.green : theme.text }}>{p.name}</div>
                <div style={{ marginTop: 5, height: 5, background: "#F0EFE9", borderRadius: 99, overflow: "hidden" }}>
                  <div className="bar-anim" style={{ "--w": `${(p.pts / max * 100).toFixed(0)}%`, height: "100%", background: p.isYou ? theme.green : "#C5C3BB", borderRadius: 99 }} />
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: p.isYou ? theme.green : theme.text, fontFamily: "'Space Grotesk',sans-serif", minWidth: 48, textAlign: "right" }}>
                {p.pts.toLocaleString()}
              </div>
            </div>
            {i < leaderData.length - 1 && <Divider />}
          </div>
        ))}
      </div>

      <SectionLabel>Your April</SectionLabel>
      <div className="fade-up-3">
        <StatGrid stats={[
          { val: "12", label: "Haritasena pickups", color: theme.green },
          { val: "60 kWh", label: "Solar sold", color: theme.blue },
          { val: "₹480", label: "Waste earnings", color: theme.amber },
          { val: "₹780", label: "Solar earnings", color: theme.green },
        ]} />
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
};

// ── Solar Page ─────────────────────────────────────────────────────────
const neighbors = [
  { name: "Rekha Nair", dist: "250m", price: 6.0, status: "available", color: "green" },
  { name: "Anitha K.", dist: "420m", price: 6.8, status: "Low supply", color: "amber" },
  { name: "Mohan Das", dist: "610m", price: 5.5, status: "Offline", color: "gray" },
];

const SolarPage = () => {
  const [selling, setSelling] = useState(true);
  const [price, setPrice] = useState(6.5);
  const [editing, setEditing] = useState(false);
  const [bought, setBought] = useState(null);

  return (
    <div>
      <div className="fade-up" style={{ padding: "20px 16px 12px", background: theme.card, borderBottom: `1px solid ${theme.border}` }}>
        <div className="heading" style={{ fontSize: 22, fontWeight: 700 }}>Solar trading</div>
        <div style={{ fontSize: 13, color: theme.textSub, marginTop: 2 }}>Sell excess energy to your neighbors</div>
      </div>

      <div className="fade-up-1">
        <StatGrid stats={[
          { val: "4.2 kW", label: "Producing now", color: theme.blue },
          { val: "1.8 kW", label: "Available to sell", color: theme.green },
        ]} />
      </div>

      <SectionLabel>Your listing</SectionLabel>
      <div className="fade-up-2" style={{ margin: "0 16px" }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>{selling ? "Selling now" : "Listing paused"}</div>
              <div style={{ fontSize: 13, color: theme.textSub, marginTop: 2 }}>
                {editing ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    ₹<input type="number" value={price} step="0.5" onChange={e => setPrice(parseFloat(e.target.value) || price)}
                      style={{ width: 60, fontSize: 13, padding: "2px 6px", border: `1px solid ${theme.border}`, borderRadius: 8, background: theme.bg }} />
                    / kWh
                    <button onClick={() => setEditing(false)} style={{ fontSize: 12, background: theme.green, color: "#fff", borderRadius: 8, padding: "3px 10px" }}>Save</button>
                  </span>
                ) : (
                  `Price: ₹${price.toFixed(2)} / kWh`
                )}
              </div>
            </div>
            <Tag label={selling ? "Active" : "Paused"} color={selling ? "green" : "gray"} />
          </div>
          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <span style={{ color: theme.textSub }}>Sold today</span><span style={{ fontWeight: 600 }}>14.6 kWh</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 6 }}>
            <span style={{ color: theme.textSub }}>Earnings today</span><span style={{ fontWeight: 700, color: theme.green }}>₹94.90</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button onClick={() => setEditing(true)} style={{ flex: 1, padding: "9px 0", borderRadius: 10, background: theme.bg, border: `1px solid ${theme.border}`, fontSize: 13, fontWeight: 500 }}>
              Edit price
            </button>
            <button onClick={() => setSelling(s => !s)} style={{ flex: 1, padding: "9px 0", borderRadius: 10, background: selling ? theme.redLight : theme.greenLight, border: "none", fontSize: 13, fontWeight: 500, color: selling ? theme.red : theme.green }}>
              {selling ? "Pause" : "Resume"}
            </button>
          </div>
        </Card>
      </div>

      <SectionLabel>Buy from neighbors</SectionLabel>
      <div className="fade-up-3" style={{ margin: "0 16px", background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
        {neighbors.map((n, i) => (
          <div key={i}>
            <div style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{n.name}</div>
                  <div style={{ fontSize: 12, color: theme.textSub, marginTop: 1 }}>{n.dist} away</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>₹{n.price.toFixed(2)}/kWh</div>
                  <Tag label={n.status} color={n.color} />
                </div>
              </div>
              {n.color !== "gray" && (
                <button onClick={() => setBought(n.name)} style={{ width: "100%", marginTop: 10, padding: "9px 0", borderRadius: 10, background: bought === n.name ? theme.greenLight : theme.green, color: bought === n.name ? theme.green : "#fff", border: "none", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  {bought === n.name ? <><Icon name="check" size={14} color={theme.green} /> Purchased!</> : "Buy now"}
                </button>
              )}
            </div>
            {i < neighbors.length - 1 && <Divider />}
          </div>
        ))}
      </div>

      <SectionLabel>This month</SectionLabel>
      <div className="fade-up-4">
        <StatGrid stats={[
          { val: "180 kWh", label: "Total sold", color: theme.blue },
          { val: "₹1,170", label: "Total earned", color: theme.green },
        ]} />
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
};

// ── Haritasena Page ────────────────────────────────────────────────────
const pickups = [
  { day: 16, month: "APR", team: "Meena's team", types: ["Organic", "Plastic", "Paper"], colors: ["green", "blue", "amber"] },
  { day: 19, month: "APR", team: "Lakshmi's team", types: ["Organic", "E-waste"], colors: ["green", "red"], booked: true },
  { day: 24, month: "APR", team: "Rekha's team", types: ["Plastic", "Metal"], colors: ["blue", "amber"] },
];

const wasteItems = [
  { type: "Organic", kg: 4, rate: 3, color: "green" },
  { type: "Plastic", kg: 1.5, rate: 20, color: "blue" },
  { type: "E-waste", kg: 0.8, rate: 30, color: "red" },
];

const HaritasenaPage = () => {
  const [bookings, setBookings] = useState({ 1: true });
  const [showModal, setShowModal] = useState(false);
  const [selectedPickup, setSelectedPickup] = useState(null);

  const toggleBook = (i) => {
    setBookings(b => ({ ...b, [i]: !b[i] }));
  };

  const total = wasteItems.reduce((s, w) => s + w.kg * w.rate, 0);

  return (
    <div>
      <div className="fade-up" style={{ padding: "20px 16px 12px", background: theme.card, borderBottom: `1px solid ${theme.border}` }}>
        <div className="heading" style={{ fontSize: 22, fontWeight: 700 }}>Haritasena</div>
        <div style={{ fontSize: 13, color: theme.textSub, marginTop: 2 }}>Schedule pickups · earn by weight</div>
      </div>

      {/* Info banner */}
      <div className="fade-up-1" style={{ margin: "12px 16px 0", background: theme.greenLight, borderRadius: 14, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
        <Icon name="leaf" size={18} color={theme.green} />
        <div style={{ fontSize: 13, color: theme.green, lineHeight: 1.5 }}>
          No more fixed ₹50 fees. Book when it suits you and <strong>earn money based on the weight</strong> of your sorted waste.
        </div>
      </div>

      <SectionLabel>Upcoming pickups in your zone</SectionLabel>
      <div className="fade-up-2" style={{ margin: "0 16px", background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
        {pickups.map((p, i) => (
          <div key={i}>
            <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, background: bookings[i] ? theme.greenLight : "transparent" }}>
              <div style={{ background: bookings[i] ? "#fff" : "#F1F0EC", borderRadius: 12, padding: "6px 10px", textAlign: "center", flexShrink: 0, minWidth: 46 }}>
                <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, fontFamily: "'Space Grotesk',sans-serif" }}>{p.day}</div>
                <div style={{ fontSize: 10, color: theme.textSub, marginTop: 1 }}>{p.month}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{p.team}</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 5 }}>
                  {p.types.map((t, j) => <Tag key={j} label={t} color={p.colors[j]} />)}
                </div>
              </div>
              <button onClick={() => toggleBook(i)} style={{ padding: "7px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600, background: bookings[i] ? theme.green : theme.bg, color: bookings[i] ? "#fff" : theme.text, border: `1px solid ${bookings[i] ? theme.green : theme.border}`, flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}>
                {bookings[i] ? <><Icon name="check" size={12} color="#fff" />Booked</> : "Book"}
              </button>
            </div>
            {i < pickups.length - 1 && <Divider />}
          </div>
        ))}
      </div>

      <SectionLabel>Your booked pickup · Apr 19</SectionLabel>
      <div className="fade-up-3" style={{ margin: "0 16px" }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 600 }}>Waste breakdown</div>
            <Tag label="Pending weigh-in" color="amber" />
          </div>
          <Divider />
          {wasteItems.map((w, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Tag label={w.type} color={w.color} />
              </div>
              <div style={{ fontSize: 13, color: theme.textSub }}>{w.kg} kg</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>₹{(w.kg * w.rate).toFixed(0)}</div>
            </div>
          ))}
          <Divider />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600 }}>Estimated payout</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: theme.green, fontFamily: "'Space Grotesk',sans-serif" }}>₹{total.toFixed(0)}</span>
          </div>
        </Card>
      </div>

      <SectionLabel>This month</SectionLabel>
      <div className="fade-up-4">
        <StatGrid stats={[
          { val: "28 kg", label: "Waste given", color: theme.green },
          { val: "₹480", label: "Earned", color: theme.amber },
          { val: "12", label: "Pickups completed", color: theme.text },
          { val: "Rank #5", label: "In your zone", color: theme.blue },
        ]} />
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
};

// ── Profile Page ───────────────────────────────────────────────────────
const badges = [
  { icon: "♻", label: "Recycler", earned: true, color: theme.greenLight, text: theme.green },
  { icon: "☀", label: "Solar pro", earned: true, color: theme.blueLight, text: theme.blue },
  { icon: "🏅", label: "Top 5", earned: true, color: "#FAEEDA", text: "#633806" },
  { icon: "🏆", label: "Top 3", earned: false, color: "#F1F0EC", text: theme.textSub },
  { icon: "🌱", label: "100 kg", earned: true, color: theme.greenLight, text: theme.green },
  { icon: "⚡", label: "500 kWh", earned: false, color: "#F1F0EC", text: theme.textSub },
];

const ProfilePage = () => (
  <div>
    <div className="fade-up" style={{ padding: "20px 16px 12px", background: theme.card, borderBottom: `1px solid ${theme.border}` }}>
      <div className="heading" style={{ fontSize: 22, fontWeight: 700 }}>Profile</div>
      <div style={{ fontSize: 13, color: theme.textSub, marginTop: 2 }}>Suresh Pillai · Ottapalam, Kerala</div>
    </div>

    <div className="fade-up-1" style={{ margin: "12px 16px 0" }}>
      <Card style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: theme.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: theme.green, fontFamily: "'Space Grotesk',sans-serif", flexShrink: 0 }}>SP</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 17, fontFamily: "'Space Grotesk',sans-serif" }}>Suresh Pillai</div>
          <div style={{ fontSize: 13, color: theme.textSub, marginTop: 1 }}>Greenfield Heights zone</div>
          <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
            <Tag label="Rank #5" color="green" />
            <Tag label="Solar seller" color="blue" />
          </div>
        </div>
      </Card>
    </div>

    <SectionLabel>All-time stats</SectionLabel>
    <div className="fade-up-2">
      <StatGrid stats={[
        { val: "142 kg", label: "Waste recycled", color: theme.green },
        { val: "620 kWh", label: "Solar sold", color: theme.blue },
        { val: "₹4,280", label: "Total earned", color: theme.amber },
        { val: "18,400", label: "Total points", color: theme.text },
      ]} />
    </div>

    <SectionLabel>Badges</SectionLabel>
    <div className="fade-up-3" style={{ margin: "0 16px" }}>
      <Card style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "flex-start" }}>
        {badges.map((b, i) => (
          <div key={i} style={{ textAlign: "center", opacity: b.earned ? 1 : 0.35, width: 56 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: b.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, margin: "0 auto 5px" }}>{b.icon}</div>
            <div style={{ fontSize: 11, color: b.earned ? b.text : theme.textSub, fontWeight: 500 }}>{b.label}</div>
          </div>
        ))}
      </Card>
    </div>

    <SectionLabel>Zone info</SectionLabel>
    <div className="fade-up-4" style={{ margin: "0 16px" }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "4px 0" }}>
          <span style={{ color: theme.textSub }}>Zone name</span><span style={{ fontWeight: 600 }}>Greenfield Heights</span>
        </div>
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "4px 0" }}>
          <span style={{ color: theme.textSub }}>Members</span><span style={{ fontWeight: 600 }}>34 / 50</span>
        </div>
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "4px 0" }}>
          <span style={{ color: theme.textSub }}>Your zone rank</span><span style={{ fontWeight: 600, color: theme.green }}>#5 this month</span>
        </div>
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "4px 0" }}>
          <span style={{ color: theme.textSub }}>Points this month</span><span style={{ fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", color: theme.green }}>1,920</span>
        </div>
      </Card>
    </div>
    <div style={{ height: 16 }} />
  </div>
);

// ── Login Page ─────────────────────────────────────────────────────────
const LoginPage = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone"); // phone | otp
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = () => {
    if (phone.length < 10) { setError("Enter a valid 10-digit mobile number"); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("otp"); }, 1200);
  };

  const handleVerify = () => {
    if (otp.length < 4) { setError("Enter the OTP"); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F7F6F2", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "0 0 40px" }}>
      {/* Top green area */}
      <div className="fade-up" style={{ background: theme.green, padding: "60px 32px 48px", borderRadius: "0 0 40px 40px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 36 }}>
          ♻
        </div>
        <div className="heading" style={{ fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>EcoLife</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", marginTop: 8, lineHeight: 1.5 }}>
          Waste management · Solar trading<br />for Kerala neighborhoods
        </div>
      </div>

      {/* Form */}
      <div className="fade-up-2" style={{ padding: "32px 24px 0" }}>
        {step === "phone" ? (
          <>
            <div className="heading" style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Enter your mobile</div>
            <div style={{ fontSize: 14, color: theme.textSub, marginBottom: 20 }}>We'll send an OTP to verify</div>

            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <div style={{ background: "#fff", border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 15, fontWeight: 600, color: theme.text, display: "flex", alignItems: "center" }}>
                🇮🇳 +91
              </div>
              <input
                type="tel"
                placeholder="98765 43210"
                value={phone}
                onChange={e => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setError(""); }}
                style={{ flex: 1, background: "#fff", border: `1px solid ${error ? theme.red : theme.border}`, borderRadius: 12, padding: "12px 16px", fontSize: 16, color: theme.text, outline: "none" }}
              />
            </div>

            {error && <div style={{ fontSize: 13, color: theme.red, marginBottom: 10 }}>{error}</div>}

            <button onClick={handleSendOtp} disabled={loading} style={{ width: "100%", padding: "14px 0", borderRadius: 14, background: loading ? "#aaa" : theme.green, color: "#fff", fontSize: 16, fontWeight: 600, border: "none", marginTop: 4 }}>
              {loading ? "Sending OTP..." : "Send OTP →"}
            </button>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <button onClick={() => { setStep("phone"); setOtp(""); setError(""); }} style={{ background: theme.greenLight, border: "none", borderRadius: 10, padding: "6px 10px", color: theme.green, fontSize: 13, fontWeight: 600 }}>← Back</button>
              <div>
                <div className="heading" style={{ fontSize: 20, fontWeight: 700 }}>Verify OTP</div>
                <div style={{ fontSize: 13, color: theme.textSub }}>Sent to +91 {phone}</div>
              </div>
            </div>

            <input
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => { setOtp(e.target.value.slice(0, 6)); setError(""); }}
              style={{ width: "100%", background: "#fff", border: `1px solid ${error ? theme.red : theme.border}`, borderRadius: 12, padding: "14px 16px", fontSize: 22, fontWeight: 700, color: theme.text, outline: "none", letterSpacing: "0.2em", textAlign: "center", marginBottom: 12 }}
            />

            {error && <div style={{ fontSize: 13, color: theme.red, marginBottom: 10 }}>{error}</div>}

            <button onClick={handleVerify} disabled={loading} style={{ width: "100%", padding: "14px 0", borderRadius: 14, background: loading ? "#aaa" : theme.green, color: "#fff", fontSize: 16, fontWeight: 600, border: "none" }}>
              {loading ? "Verifying..." : "Verify & Enter →"}
            </button>

            <div style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: theme.textSub }}>
              Didn't receive?{" "}
              <button onClick={handleSendOtp} style={{ background: "none", border: "none", color: theme.green, fontWeight: 600, fontSize: 13, padding: 0 }}>Resend OTP</button>
            </div>
          </>
        )}
      </div>

      {/* Footer note */}
      <div className="fade-up-3" style={{ textAlign: "center", padding: "24px 24px 0", fontSize: 12, color: theme.textSub, lineHeight: 1.6 }}>
        Integrated with Kerala's Haritasena program.<br />
        By continuing you agree to our terms of use.
      </div>
    </div>
  );
};

// ── Nav ────────────────────────────────────────────────────────────────
const navItems = [
  { id: "leaderboard", label: "Rank", icon: "rank" },
  { id: "solar", label: "Solar", icon: "solar" },
  { id: "haritasena", label: "Haritasena", icon: "recycle", badge: 1 },
  { id: "profile", label: "Profile", icon: "user" },
];

// ── App ────────────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("leaderboard");

  if (!loggedIn) return (
    <>
      <style>{css}</style>
      <LoginPage onLogin={() => setLoggedIn(true)} />
    </>
  );

  const pages = {
    leaderboard: <LeaderboardPage />,
    solar: <SolarPage />,
    haritasena: <HaritasenaPage />,
    profile: <ProfilePage />,
  };

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: "100vh", background: theme.bg, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "0" }}>
        <div style={{ width: "100%", maxWidth: 430, minHeight: "100vh", background: theme.bg, position: "relative", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, overflowY: "auto", paddingBottom: theme.navH }}>
            {pages[page]}
          </div>
          {/* Bottom nav */}
          <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: theme.card, borderTop: `1px solid ${theme.border}`, display: "flex", height: theme.navH, zIndex: 100 }}>
            {navItems.map(n => {
              const active = page === n.id;
              return (
                <button key={n.id} className="nav-btn" onClick={() => setPage(n.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, background: "transparent", border: "none", position: "relative" }}>
                  {n.badge && page !== n.id && (
                    <div style={{ position: "absolute", top: 8, right: "calc(50% - 18px)", width: 14, height: 14, borderRadius: "50%", background: theme.red, color: "#fff", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{n.badge}</div>
                  )}
                  <Icon name={n.icon} size={20} color={active ? theme.green : theme.textSub} />
                  <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? theme.green : theme.textSub, letterSpacing: "0.01em" }}>{n.label}</span>
                  {active && <div style={{ position: "absolute", bottom: 0, width: 32, height: 2.5, background: theme.green, borderRadius: "2px 2px 0 0" }} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}