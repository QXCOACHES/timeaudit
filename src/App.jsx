import { useState } from "react";

const ORANGE = "#e8562a";
const ORANGE_BORDER = "rgba(232,86,42,0.25)";

const categories = [
  { id: "sleep",         label: "Sleep",                      emoji: "😴" },
  { id: "eating",        label: "Eating + Food Prep",          emoji: "🍳" },
  { id: "hygiene",       label: "Hygiene + Getting Ready",     emoji: "🚿" },
  { id: "cleaning",      label: "Cleaning + Errands",          emoji: "🧹" },
  { id: "commuting",     label: "Commuting + Transport",       emoji: "🚗" },
  { id: "job",           label: "Job / Other Work",            emoji: "💼" },
  { id: "exercise",      label: "Exercise + Physical Health",  emoji: "🏋️" },
  { id: "relationships", label: "Relationships + Family",      emoji: "❤️" },
  { id: "downtime",      label: "Downtime + Recovery",         emoji: "🛋️" },
  { id: "hobbies",       label: "Hobbies + Things You Love",   emoji: "🎸" },
  { id: "clients",       label: "Client Calls + Servicing",    emoji: "📞" },
];

const businessCategories = [
  { id: "content",  label: "Content Creation",        emoji: "✍️" },
  { id: "dms",      label: "DMs + Outreach",           emoji: "💬" },
  { id: "sales",    label: "Discovery + Sales Calls",  emoji: "🤝" },
  { id: "admin",    label: "Admin + Emails",           emoji: "📧" },
  { id: "strategy", label: "Strategy + Planning",      emoji: "🗺️" },
  { id: "building", label: "Actually Building Things", emoji: "🔨" },
];

const getMsg = (h) => {
  if (h <= 0)  return { text: "Zero hours. Something in this audit needs a hard look.", color: "#ff4444" };
  if (h <= 5)  return { text: "Less than 5 hours. That's not a business. That's a very expensive hobby.", color: ORANGE };
  if (h <= 10) return { text: "Under 10 hours. Tight — but the right model uses these 10x more efficiently.", color: ORANGE };
  if (h <= 20) return { text: "10–20 hours. Enough to build something real — if every hour counts.", color: "#ffffff" };
  if (h <= 35) return { text: "20–35 hours. Workable. The question is what you're doing with them.", color: "#ffffff" };
  return { text: "35+ hours. You have the time. The question was never time.", color: "#ffffff" };
};

const fmt = (n) => (n % 1 === 0 ? String(n) : String(Math.round(n * 10) / 10));

function InputPair({ id, vals, onWeekly, onDaily, highlight }) {
  const w = vals[id] || "";
  const daily = w !== "" && !isNaN(parseFloat(w)) ? fmt(parseFloat(w) / 7) : "";

  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", flexShrink: 0 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 9, color: "#444", marginBottom: 2, letterSpacing: "0.08em", textTransform: "uppercase" }}>Daily</div>
        <input
          type="number" min="0" step="0.5"
          value={daily}
          onChange={e => onDaily(id, e.target.value)}
          placeholder="—"
          style={{
            width: 46, background: "#161616",
            border: `1px solid ${highlight ? ORANGE_BORDER : "#222"}`,
            borderRadius: 5, color: "#aaa",
            fontSize: 13, fontFamily: "'Syne',sans-serif", fontWeight: 700,
            padding: "5px 4px", textAlign: "center", outline: "none",
          }}
        />
      </div>
      <div style={{ color: "#2a2a2a", fontSize: 11, marginTop: 12 }}>↔</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 9, color: "#444", marginBottom: 2, letterSpacing: "0.08em", textTransform: "uppercase" }}>Weekly</div>
        <input
          type="number" min="0"
          value={w}
          onChange={e => onWeekly(id, e.target.value)}
          placeholder="—"
          style={{
            width: 50, background: "#161616",
            border: `1px solid ${highlight ? ORANGE_BORDER : "#222"}`,
            borderRadius: 5, color: highlight ? ORANGE : "#ffffff",
            fontSize: 13, fontFamily: "'Syne',sans-serif", fontWeight: 700,
            padding: "5px 4px", textAlign: "center", outline: "none",
          }}
        />
      </div>
    </div>
  );
}

export default function TimeAudit() {
  const [weekly, setWeekly]   = useState({});
  const [bizW, setBizW]       = useState({});
  const [screenW, setScreenW] = useState("");
  const [section, setSection] = useState(1);

  const setW  = (id, v) => setWeekly(p => ({ ...p, [id]: v }));
  const setD  = (id, v) => { const d = parseFloat(v); setWeekly(p => ({ ...p, [id]: isNaN(d) ? "" : fmt(d * 7) })); };
  const setBW = (id, v) => setBizW(p => ({ ...p, [id]: v }));
  const setBD = (id, v) => { const d = parseFloat(v); setBizW(p => ({ ...p, [id]: isNaN(d) ? "" : fmt(d * 7) })); };

  const screenWeekly    = { screen: screenW };
  const setScreenWeekly = (id, v) => setScreenW(v);
  const setScreenDaily  = (id, v) => { const d = parseFloat(v); setScreenW(isNaN(d) ? "" : fmt(d * 7)); };

  const totalUsed = Object.values(weekly).reduce((s, v) => s + (parseFloat(v) || 0), 0);
  const remaining = Math.max(0, 168 - totalUsed);
  const over      = totalUsed > 168;
  const pct       = Math.min(100, (totalUsed / 168) * 100);
  const bizTotal  = Object.values(bizW).reduce((s, v) => s + (parseFloat(v) || 0), 0);
  const building  = parseFloat(bizW.building) || 0;
  const msg       = getMsg(remaining);

  const colHeaders = (
    <div style={{ display: "flex", padding: "0 8px 5px", borderBottom: "1px solid #1a1a1a", marginBottom: 3 }}>
      <div style={{ flex: 1, fontSize: 9, color: "#333", letterSpacing: "0.1em", textTransform: "uppercase" }}>Category</div>
      <div style={{ display: "flex", gap: 4 }}>
        <div style={{ width: 46, fontSize: 9, color: "#333", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.08em" }}>Daily</div>
        <div style={{ width: 18 }} />
        <div style={{ width: 50, fontSize: 9, color: "#333", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.08em" }}>Weekly</div>
      </div>
    </div>
  );

  const NavBtn = ({ label, onClick }) => (
    <button onClick={onClick} style={{
      marginTop: 18, width: "100%", background: ORANGE, color: "#fff",
      border: "none", borderRadius: 7, padding: "12px",
      fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 12,
      letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
    }}>{label}</button>
  );

  return (
    <div style={{ background: "#0a0a0a", fontFamily: "'DM Mono','Courier New',monospace", color: "#e8e4dc", minHeight: "auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }
        .hrow:hover { background: rgba(232,86,42,0.04) !important; }
        @keyframes fu { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fu { animation: fu 0.3s ease forwards; }
      `}</style>

      <div style={{ borderBottom: "1px solid #1a1a1a", padding: "14px 20px 10px", background: "#0a0a0a", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <div style={{ fontSize: 10, color: ORANGE, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Syne',sans-serif", marginBottom: 3 }}>Get Skooled — The Audit</div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 10 }}>The 168 Hour Reality Check</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["Life Audit", "Business Hours", "Verdict"].map((s, i) => (
              <button key={i} onClick={() => setSection(i + 1)} style={{
                background: section === i + 1 ? ORANGE : "transparent",
                color: section === i + 1 ? "#fff" : "#444",
                border: `1px solid ${section === i + 1 ? ORANGE : "#222"}`,
                borderRadius: 5, padding: "4px 10px", fontSize: 10,
                fontFamily: "'Syne',sans-serif", fontWeight: 700,
                letterSpacing: "0.07em", cursor: "pointer", textTransform: "uppercase",
              }}>{i + 1}. {s}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 620, margin: "0 auto", padding: "16px 20px 50px" }}>

        {section === 1 && (
          <div className="fu">
            <p style={{ fontSize: 11, lineHeight: 1.8, color: "#555", marginBottom: 14, borderLeft: `2px solid ${ORANGE}`, paddingLeft: 10 }}>
              This isn't a worksheet. It's a mirror.<br />
              <span style={{ color: "#ccc" }}>Enter daily OR weekly — we'll sync the other for you.</span>
            </p>
            <div style={{ background: "#111", border: `1px solid ${over ? "#ff4444" : "#1a1a1a"}`, borderRadius: 9, padding: "12px 16px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 9, color: "#555", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 2 }}>Hours Remaining</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "2.2rem", fontWeight: 800, color: over ? "#ff4444" : remaining <= 10 ? ORANGE : "#fff", lineHeight: 1 }}>
                  {over ? `-${Math.round(totalUsed - 168)}` : Math.round(remaining)}
                </div>
                <div style={{ fontSize: 9, color: "#444", marginTop: 2 }}>of 168 hours / week</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 5 }}>Used: {Math.round(totalUsed)}</div>
                <div style={{ width: 90, height: 3, background: "#1e1e1e", borderRadius: 2 }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: over ? "#ff4444" : ORANGE, borderRadius: 2, transition: "width 0.2s" }} />
                </div>
              </div>
            </div>
            {colHeaders}
            {categories.map(cat => (
              <div key={cat.id} className="hrow" style={{ display: "flex", alignItems: "center", padding: "7px 8px", borderBottom: "1px solid #111", borderRadius: 4, gap: 8 }}>
                <span style={{ fontSize: 14, width: 20, flexShrink: 0 }}>{cat.emoji}</span>
                <div style={{ flex: 1, fontSize: 11, color: "#bbb" }}>{cat.label}</div>
                <InputPair id={cat.id} vals={weekly} onWeekly={setW} onDaily={setD} highlight={true} />
              </div>
            ))}
            <div style={{ marginTop: 14, background: "#111", border: "1px solid #1a1a1a", borderRadius: 9, padding: "14px" }}>
              <div style={{ fontSize: 11, fontWeight: 500, marginBottom: 3 }}>📱 Screen Time Reality Check</div>
              <div style={{ fontSize: 10, color: "#555", lineHeight: 1.6, marginBottom: 8 }}>Settings → Screen Time → Weekly average. Write it here. Try not to spiral.</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <InputPair id="screen" vals={screenWeekly} onWeekly={setScreenWeekly} onDaily={setScreenDaily} highlight={true} />
                <span style={{ fontSize: 10, color: "#444" }}>hrs on your phone</span>
              </div>
              {screenW && parseFloat(screenW) > 20 && (
                <div style={{ marginTop: 8, fontSize: 10, color: ORANGE, lineHeight: 1.6, borderTop: "1px solid #1a1a1a", paddingTop: 8 }}>
                  {parseFloat(screenW) > 40
                    ? `${screenW} hrs on your phone. That's more than a full-time job. How much of it was building something?`
                    : `${screenW} hrs. Some of that was research. Most of it wasn't. You know which is which.`}
                </div>
              )}
            </div>
            <NavBtn label="See Where Those Hours Go →" onClick={() => setSection(2)} />
          </div>
        )}

        {section === 2 && (
          <div className="fu">
            <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 9, padding: "12px 16px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 2 }}>Available this week</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "2rem", fontWeight: 800, color: remaining <= 0 ? "#ff4444" : "#fff" }}>{Math.max(0, Math.round(remaining))} hrs</div>
              </div>
              <div style={{ fontSize: 10, color: "#444", maxWidth: 160, textAlign: "right", lineHeight: 1.6 }}>Most coaches have never tracked this. The ones who have are already ahead.</div>
            </div>
            {colHeaders}
            {businessCategories.map(cat => (
              <div key={cat.id} className="hrow" style={{ display: "flex", alignItems: "center", padding: "7px 8px", borderBottom: "1px solid #111", borderRadius: 4, gap: 8 }}>
                <span style={{ fontSize: 14, width: 20, flexShrink: 0 }}>{cat.emoji}</span>
                <div style={{ flex: 1, fontSize: 11, color: cat.id === "building" ? "#fff" : "#bbb" }}>{cat.label}</div>
                <InputPair id={cat.id} vals={bizW} onWeekly={setBW} onDaily={setBD} highlight={cat.id === "building"} />
              </div>
            ))}
            {bizTotal > 0 && (
              <div style={{ marginTop: 12, background: "#111", border: "1px solid #1a1a1a", borderRadius: 9, padding: "12px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total business hrs</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "#e8e4dc", marginTop: 2 }}>{Math.round(bizTotal)}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>Actually building</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: ORANGE, marginTop: 2 }}>{Math.round(building)}</div>
                  </div>
                </div>
                <div style={{ fontSize: 10, color: "#666", lineHeight: 1.7, borderTop: "1px solid #1a1a1a", paddingTop: 8 }}>
                  {building / bizTotal < 0.15
                    ? `${Math.round((building / bizTotal) * 100)}% of your business hours are actually building. The rest is feeding the machine. It is never, ever full.`
                    : building / bizTotal < 0.3
                    ? `${Math.round((building / bizTotal) * 100)}% building. Better than most. Imagine what changes when the model does the heavy lifting.`
                    : `${Math.round((building / bizTotal) * 100)}% building. You're one of the focused ones. Let's make sure what you're building has no ceiling.`}
                </div>
              </div>
            )}
            <NavBtn label="See The Verdict →" onClick={() => setSection(3)} />
          </div>
        )}

        {section === 3 && (
          <div className="fu">
            <div style={{ background: "#111", border: `1px solid ${ORANGE_BORDER}`, borderRadius: 9, padding: "18px 16px", marginBottom: 14 }}>
              <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Your weekly hours to build</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "3rem", fontWeight: 800, color: msg.color, lineHeight: 1, marginBottom: 10 }}>
                {Math.max(0, Math.round(remaining))}
              </div>
              <div style={{ fontSize: 11, color: "#888", lineHeight: 1.8, borderTop: "1px solid #1a1a1a", paddingTop: 10 }}>{msg.text}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { label: "Life hours accounted for", value: `${Math.round(totalUsed)}/168`, color: "#e8e4dc" },
                { label: "Screen time this week",    value: screenW ? `${screenW} hrs` : "—", color: screenW && parseFloat(screenW) > 30 ? ORANGE : "#e8e4dc" },
                { label: "Business hours total",     value: `${Math.round(bizTotal)} hrs`, color: "#e8e4dc" },
                { label: "Actually building",        value: `${Math.round(building)} hrs`, color: ORANGE },
              ].map((s, i) => (
                <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 7, padding: "10px 12px" }}>
                  <div style={{ fontSize: 9, color: "#444", marginBottom: 3, lineHeight: 1.4 }}>{s.label}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: 9, padding: "16px", marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 500, marginBottom: 8, color: ORANGE }}>The question that actually matters:</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.9 }}>
                How many of those hours went to the things that make life worth living — your relationships, your health, your creativity, your joy?
                <br /><br />
                <span style={{ color: "#e8e4dc" }}>Is that the life you built a business to have?</span>
                <br /><br />
                <span style={{ color: "#3a3a3a", fontSize: 10 }}>That's not a motivation problem. That's a model problem. And model problems have model solutions.</span>
              </div>
            </div>
            <div style={{ background: "#111", border: `1px solid ${ORANGE_BORDER}`, borderRadius: 9, padding: "16px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 800, marginBottom: 5 }}>Now you know the real numbers.</div>
              <div style={{ fontSize: 11, color: "#444", lineHeight: 1.8 }}>The next section looks at your business model<br />and whether it's actually built to scale.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
