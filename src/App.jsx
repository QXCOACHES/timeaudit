import { useState } from "react";

const ORANGE = "#e8562a";
const ORANGE_BORDER = "rgba(232,86,42,0.25)";

const categories = [
  { id: "sleep", label: "Sleep", emoji: "😴", placeholder: "56", hint: "Most humans need 7-9hrs. Be honest." },
  { id: "eating", label: "Eating + Food Prep", emoji: "🍳", placeholder: "14", hint: "Cooking, eating, cleaning up." },
  { id: "hygiene", label: "Hygiene + Getting Ready", emoji: "🚿", placeholder: "7", hint: "Showers, grooming, getting dressed." },
  { id: "cleaning", label: "Cleaning + Errands", emoji: "🧹", placeholder: "5", hint: "Laundry, groceries, life admin." },
  { id: "commuting", label: "Commuting + Transport", emoji: "🚗", placeholder: "5", hint: "Getting places. Including the school run." },
  { id: "job", label: "Job / Other Work", emoji: "💼", placeholder: "0", hint: "If you still have a 9-5. No judgment." },
  { id: "exercise", label: "Exercise + Physical Health", emoji: "🏋️", placeholder: "7", hint: "Workouts, walks, movement." },
  { id: "relationships", label: "Relationships + Family", emoji: "❤️", placeholder: "14", hint: "Partner, kids, friends. The people who matter." },
  { id: "downtime", label: "Downtime + Recovery", emoji: "🛋️", placeholder: "10", hint: "Netflix, doing nothing, actually resting." },
  { id: "hobbies", label: "Hobbies + Things You Love", emoji: "🎸", placeholder: "5", hint: "Music, art, reading, whatever feeds you." },
  { id: "clients", label: "Existing Client Calls + Servicing", emoji: "📞", placeholder: "10", hint: "The work you're already committed to." },
];

const businessCategories = [
  { id: "content", label: "Content Creation", emoji: "✍️" },
  { id: "dms", label: "DMs + Outreach", emoji: "💬" },
  { id: "sales", label: "Discovery + Sales Calls", emoji: "🤝" },
  { id: "admin", label: "Admin + Emails", emoji: "📧" },
  { id: "strategy", label: "Strategy + Planning", emoji: "🗺️" },
  { id: "building", label: "Actually Building Things", emoji: "🔨" },
];

const getConfrontingMessage = (hours) => {
  if (hours <= 0) return { text: "Zero. You have zero hours. Something in this audit needs a hard look.", color: "#ff4444" };
  if (hours <= 5) return { text: "Less than 5 hours. That's not a business. That's a very expensive hobby.", color: ORANGE };
  if (hours <= 10) return { text: "Under 10 hours. Tight — but a community model uses these hours 10x more efficiently than 1-on-1.", color: ORANGE };
  if (hours <= 20) return { text: "10-20 hours. Enough to build something real — if every hour is pointed at the right thing.", color: "#ffffff" };
  if (hours <= 35) return { text: "20-35 hours. This is workable. The question is what you're doing with them.", color: "#ffffff" };
  return { text: "35+ hours. You have the time. The question was never time.", color: "#ffffff" };
};

export default function TimeAudit() {
  const [values, setValues] = useState({});
  const [businessValues, setBusinessValues] = useState({});
  const [screenTime, setScreenTime] = useState("");
  const [section, setSection] = useState(1);

  const totalUsed = Object.values(values).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
  const remaining = Math.max(0, 168 - totalUsed);
  const over = totalUsed > 168;
  const pct = Math.min(100, (totalUsed / 168) * 100);
  const businessTotal = Object.values(businessValues).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
  const actuallyBuilding = parseFloat(businessValues.building) || 0;
  const msg = getConfrontingMessage(remaining);

  const handleChange = (id, val, setter) => setter(prev => ({ ...prev, [id]: val }));

  const inputStyle = (highlight) => ({
    width: 64,
    background: "#161616",
    border: `1px solid ${highlight ? ORANGE_BORDER : "#2a2a2a"}`,
    borderRadius: 6,
    color: highlight ? ORANGE : "#ffffff",
    fontSize: 16,
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    padding: "8px 10px",
    textAlign: "center",
    outline: "none",
  });

  const NextBtn = ({ label, onClick }) => (
    <button onClick={onClick} style={{
      marginTop: 32, width: "100%", background: ORANGE, color: "#ffffff",
      border: "none", borderRadius: 8, padding: "16px",
      fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13,
      letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
    }}>{label}</button>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'DM Mono', 'Courier New', monospace", color: "#e8e4dc" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }
        .row:hover { background: rgba(232,86,42,0.04) !important; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease forwards; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1e1e1e", padding: "32px 40px 24px", position: "sticky", top: 0, background: "#0a0a0a", zIndex: 10 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: ORANGE, marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>
            Get Skooled — The Audit
          </div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            The 168 Hour Reality Check
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            {["Life Audit", "Business Hours", "The Verdict"].map((s, i) => (
              <button key={i} onClick={() => setSection(i + 1)} style={{
                background: section === i + 1 ? ORANGE : "transparent",
                color: section === i + 1 ? "#ffffff" : "#555",
                border: `1px solid ${section === i + 1 ? ORANGE : "#2a2a2a"}`,
                borderRadius: 6, padding: "6px 14px", fontSize: 11,
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                letterSpacing: "0.08em", cursor: "pointer", textTransform: "uppercase", transition: "all 0.2s",
              }}>{i + 1}. {s}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 40px 80px" }}>

        {/* SECTION 1 — LIFE AUDIT */}
        {section === 1 && (
          <div className="fade-up">
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#888", marginBottom: 32, borderLeft: `2px solid ${ORANGE}`, paddingLeft: 16 }}>
              This isn't a worksheet. It's a mirror.<br />
              Fill in your honest weekly hours for each category.<br />
              <span style={{ color: "#ffffff" }}>Watch what happens to 168.</span>
            </p>

            {/* Counter */}
            <div style={{ background: "#111", border: `1px solid ${over ? "#ff4444" : "#1e1e1e"}`, borderRadius: 12, padding: "20px 24px", marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, color: "#555", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Hours Remaining</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "3rem", fontWeight: 800, color: over ? "#ff4444" : remaining <= 10 ? ORANGE : "#ffffff", lineHeight: 1, transition: "color 0.3s" }}>
                  {over ? `-${Math.round(totalUsed - 168)}` : Math.round(remaining)}
                </div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>of 168 hours this week</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#555", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Used</div>
                <div style={{ fontSize: 24, fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>{Math.round(totalUsed)}</div>
                <div style={{ width: 120, height: 4, background: "#1e1e1e", borderRadius: 2, marginTop: 8 }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: over ? "#ff4444" : ORANGE, borderRadius: 2, transition: "width 0.3s" }} />
                </div>
              </div>
            </div>

            {categories.map((cat) => (
              <div key={cat.id} className="row" style={{ display: "flex", alignItems: "center", padding: "14px 12px", borderBottom: "1px solid #141414", borderRadius: 6, transition: "background 0.15s", gap: 12 }}>
                <span style={{ fontSize: 20, width: 28, flexShrink: 0 }}>{cat.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#e8e4dc" }}>{cat.label}</div>
                  <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{cat.hint}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  <input type="number" min="0" max="168" placeholder={cat.placeholder} value={values[cat.id] || ""} onChange={e => handleChange(cat.id, e.target.value, setValues)} style={inputStyle(true)} />
                  <span style={{ fontSize: 11, color: "#444" }}>hrs</span>
                </div>
              </div>
            ))}

            {/* Screen time */}
            <div style={{ marginTop: 32, background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "24px" }}>
              <div style={{ fontSize: 18, marginBottom: 8 }}>📱</div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>The Screen Time Reality Check</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7, marginBottom: 16 }}>
                Open your phone. Settings → Screen Time. Weekly average.<br />Write it here. Try not to spiral.
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="number" placeholder="?" value={screenTime} onChange={e => setScreenTime(e.target.value)} style={{ ...inputStyle(true), width: 72, fontSize: 20 }} />
                <span style={{ fontSize: 12, color: "#555" }}>hours/week on your phone</span>
              </div>
              {screenTime && parseFloat(screenTime) > 20 && (
                <div style={{ marginTop: 16, fontSize: 12, color: ORANGE, lineHeight: 1.7, borderTop: "1px solid #1e1e1e", paddingTop: 16 }}>
                  {parseFloat(screenTime) > 40
                    ? `${screenTime} hours on your phone. That's more than a full-time job. How much of it was building something?`
                    : `${screenTime} hours. Some of that was research. Most of it wasn't. You know which is which.`}
                </div>
              )}
            </div>

            <NextBtn label="See Where Those Hours Go →" onClick={() => setSection(2)} />
          </div>
        )}

        {/* SECTION 2 — BUSINESS HOURS */}
        {section === 2 && (
          <div className="fade-up">
            <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "20px 24px", marginBottom: 32 }}>
              <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 4 }}>Your available hours this week</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.5rem", fontWeight: 800, color: remaining <= 0 ? "#ff4444" : "#ffffff" }}>
                {Math.max(0, Math.round(remaining))} hrs
              </div>
              <div style={{ fontSize: 12, color: "#444", marginTop: 4 }}>Now let's see where they actually go.</div>
            </div>

            <p style={{ fontSize: 13, lineHeight: 1.8, color: "#666", marginBottom: 28, borderLeft: "2px solid #2a2a2a", paddingLeft: 16 }}>
              Most coaches have never tracked this.<br />
              The ones who have are already ahead of the game.<br />
              <span style={{ color: "#e8e4dc" }}>Be honest. This is for you, not anyone else.</span>
            </p>

            {businessCategories.map((cat) => (
              <div key={cat.id} className="row" style={{ display: "flex", alignItems: "center", padding: "14px 12px", borderBottom: "1px solid #141414", borderRadius: 6, transition: "background 0.15s", gap: 12 }}>
                <span style={{ fontSize: 20, width: 28, flexShrink: 0 }}>{cat.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#e8e4dc" }}>{cat.label}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input type="number" min="0" placeholder="0" value={businessValues[cat.id] || ""} onChange={e => handleChange(cat.id, e.target.value, setBusinessValues)} style={inputStyle(cat.id === "building")} />
                  <span style={{ fontSize: 11, color: "#444" }}>hrs</span>
                </div>
              </div>
            ))}

            {businessTotal > 0 && (
              <div style={{ marginTop: 24, background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "20px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.12em" }}>Total business hours</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#e8e4dc", marginTop: 4 }}>{Math.round(businessTotal)} hrs</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.12em" }}>Actually building</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: ORANGE, marginTop: 4 }}>{Math.round(actuallyBuilding)} hrs</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.7, borderTop: "1px solid #1e1e1e", paddingTop: 16 }}>
                  {actuallyBuilding / businessTotal < 0.15
                    ? `${Math.round((actuallyBuilding / businessTotal) * 100)}% of your business hours are actually building something. The rest is keeping the machine fed. That machine is hungry and it is never, ever full.`
                    : actuallyBuilding / businessTotal < 0.3
                    ? `${Math.round((actuallyBuilding / businessTotal) * 100)}% of your time is building. Better than most. Still — imagine what changes when the model does the heavy lifting.`
                    : `${Math.round((actuallyBuilding / businessTotal) * 100)}% building. You're one of the focused ones. Now let's make sure what you're building has no ceiling.`
                  }
                </div>
              </div>
            )}

            <NextBtn label="See The Verdict →" onClick={() => setSection(3)} />
          </div>
        )}

        {/* SECTION 3 — THE VERDICT */}
        {section === 3 && (
          <div className="fade-up">
            <div style={{ background: "#111", border: `1px solid ${ORANGE_BORDER}`, borderRadius: 12, padding: "28px 24px", marginBottom: 28 }}>
              <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Your weekly hours to build</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "4rem", fontWeight: 800, color: msg.color, lineHeight: 1, marginBottom: 16 }}>
                {Math.max(0, Math.round(remaining))}
              </div>
              <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.8, borderTop: "1px solid #1e1e1e", paddingTop: 16 }}>{msg.text}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
              {[
                { label: "Life hours accounted for", value: `${Math.round(totalUsed)}/168`, color: "#e8e4dc" },
                { label: "Screen time this week", value: screenTime ? `${screenTime} hrs` : "—", color: screenTime && parseFloat(screenTime) > 30 ? ORANGE : "#e8e4dc" },
                { label: "Business hours total", value: `${Math.round(businessTotal)} hrs`, color: "#e8e4dc" },
                { label: "Actually building", value: `${Math.round(actuallyBuilding)} hrs`, color: ORANGE },
              ].map((stat, i) => (
                <div key={i} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 10, padding: "16px 18px" }}>
                  <div style={{ fontSize: 11, color: "#444", marginBottom: 6, lineHeight: 1.4 }}>{stat.label}</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#0f0f0f", border: "1px solid #1e1e1e", borderRadius: 12, padding: "24px", marginBottom: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12, color: ORANGE }}>The question that actually matters:</div>
              <div style={{ fontSize: 14, color: "#888", lineHeight: 1.9 }}>
                Look back at your breakdown. How many hours this week went to the things that actually make life worth living — your relationships, your health, your creativity, your joy?
                <br /><br />
                <span style={{ color: "#e8e4dc" }}>Is that the life you built a business to have?</span>
                <br /><br />
                <span style={{ color: "#555", fontSize: 12 }}>
                  Whatever you just answered — that's not a motivation problem. That's a model problem. And model problems have model solutions.
                </span>
              </div>
            </div>

            <div style={{ background: "#111", border: `1px solid ${ORANGE_BORDER}`, borderRadius: 12, padding: "24px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, marginBottom: 8 }}>
                Now you know the real numbers.
              </div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.8 }}>
                Keep going — the next section looks at your business model<br />
                and whether it's actually built to scale.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
