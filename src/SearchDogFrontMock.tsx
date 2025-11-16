import React, { useEffect, useState } from "react";

const TABS = ["// SCAN TARGET", "DASHBOARD", "HISTORY", "INTEL PACKS", "ACCOUNT"] as const;

type Tab = (typeof TABS)[number];
type ScanState = "idle" | "scanning" | "complete";

// Temporary stub 3D Graph component
function IdentityGraph() {
  return (
    <div className="w-full h-full flex items-center justify-center text-[#00ff7b] animate-pulse">
      INITIALIZING 3D GRAPH ENGINE...
    </div>
  );
}

// Simple World Map stub
function WorldMap({ fullRecon }: { fullRecon?: boolean }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${fullRecon ? "animate-spin-slow" : ""}`}>
      {/* Dot-matrix glow background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#00ff7b22 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Platform-origin pins */}
      <div className="absolute w-2 h-2 bg-[#00ff7b] rounded-full shadow-[0_0_10px_#00ff7b] animate-pulse" style={{ top: "40%", left: "32%" }} />
      <div className="absolute w-2 h-2 bg-[#00e0ff] rounded-full shadow-[0_0_10px_#00e0ff] animate-ping" style={{ top: "48%", left: "55%" }} />
      <div className="absolute w-2 h-2 bg-[#ff4b4b] rounded-full shadow-[0_0_10px_#ff4b4b] animate-pulse" style={{ top: "62%", left: "45%" }} />

      {/* Fallback text */}
      <div className="text-gray-500 text-[10px] z-10">identity signal distribution</div>
    </div>
  );
}

// Cinematic overlay component
function CinematicOverlay({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50 bg-black/80 animate-pulse text-center text-[#00ff7b] flex items-center justify-center font-bold tracking-widest">
      DEEP RECON SYSTEM ENGAGED...
    </div>
  );
}

export default function SearchDogFrontMock() {
  const [activeTab, setActiveTab] = useState<Tab>("// SCAN TARGET");
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [scanLog, setScanLog] = useState<string[]>(["> system online. waiting for target..."]);
  const [armedPacks, setArmedPacks] = useState<Record<string, boolean>>({});

  const playSFX = (name: string) => {
    const audio = new Audio(`/sfx/${name}.mp3`);
    audio.volume = 0.25;
    audio.play().catch(() => {});
  };

  const togglePack = (id: string) => {
    playSFX("perkUnlock");
    setArmedPacks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const triggerScan = () => {
    if (scanState === "scanning") return;
    setScanState("scanning");
    setScanLog(["> initializing search modules...", "// username-recon: ready", "// leak-scout: ready", "// social-linker: ready", "// graph-builder: armed"]);
  };

  useEffect(() => {
    if (scanState !== "scanning") return;

    const steps = [
      "[01%] resolving target identifiers...",
      "[24%] probing social surfaces...",
      "[57%] fetching breach exposure data...",
      "[86%] constructing identity graph...",
      "[100%] scan complete. preview report ready.",
    ];

    let i = 0;
    setScanLog((prev) => [...prev, steps[0]]);

    const id = setInterval(() => {
      i += 1;
      if (i >= steps.length) {
        clearInterval(id);
        setScanState("complete");
        return;
      }
      setScanLog((prev) => [...prev, steps[i]]);
    }, 550);

    return () => clearInterval(id);
  }, [scanState]);

  const statusLabel = scanState === "idle" ? "status: ready" : scanState === "scanning" ? "status: scanning..." : "status: report-ready";

  const renderMainPanel = () => {
    switch (activeTab) {
      case "// SCAN TARGET":
        return (
          <div className="relative h-full flex flex-col lg:flex-row items-stretch">
            <div className="flex-1 flex flex-col justify-center px-10 py-12 lg:py-0">
              <div className="max-w-xl">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                  TRACK ANYONE.
                  <br />
                  <span className="text-gray-300">SEE EVERYTHING.</span>
                </h1>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-8 max-w-lg">
                  SearchDog is a digital footprint intelligence engine. Enter a username, email, phone, or image. We hunt public trails across social platforms, forums,
                  leaks, and cached pages — then map how it all connects.
                </p>

                <div className="bg-black/80 border border-gray-800 rounded-xl p-4 mb-4 shadow-[0_0_40px_rgba(0,0,0,0.7)]">
                  <label className="text-[11px] uppercase tracking-widest text-gray-500 mb-2 block">TARGET IDENTIFIER</label>
                  <div className="flex flex-col md:flex-row gap-3 items-stretch">
                    <input
                      type="text"
                      placeholder="@handle, email, phone, or paste image link..."
                      className="flex-1 bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#0028ff]"
                    />
                    <button
                      onClick={() => {
                        playSFX("tick");
                        triggerScan();
                      }}
                      className="px-6 py-2 bg-[#0028ff] rounded-lg text-xs md:text-sm font-semibold tracking-wider uppercase hover:bg-[#2044ff] transition flex items-center justify-center gap-2"
                    >
                      {scanState === "scanning" && <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                      {scanState === "idle" && "Initiate Scan"}
                      {scanState === "scanning" && "Scanning"}
                      {scanState === "complete" && "Rescan"}
                    </button>
                  </div>
                </div>

                <div className="relative bg-black/70 border border-gray-900 rounded-lg p-3 text-[11px] text-gray-400 font-mono h-28 overflow-hidden">
                  {/* GAME HUD: Progress Bar */}
                  {scanState === "scanning" && <div className="absolute top-0 left-0 h-1 bg-[#00ff7b] animate-pulse" style={{ width: "100%", opacity: 0.6 }} />}
                  <div className="space-y-0.5">
                    {scanLog.map((line, idx) => (
                      <div key={idx} className={idx === scanLog.length - 1 && scanState === "scanning" ? "text-[#00ff7b]" : ""}>
                        {line}
                      </div>
                    ))}
                  </div>
                  {scanState === "idle" && <div className="opacity-40 mt-1">hint: try your own email first.</div>}
                  {scanState === "complete" && <div className="opacity-60 mt-2 text-[#00ff7b]">&gt; sample output route: /reports/demo-identity.pdf</div>}
                </div>

                {/* LIVE IDENTITY PREVIEW */}
                {scanState === "scanning" && (
                  <div className="mt-4 border border-gray-800 bg-black/60 rounded-xl p-3 text-[11px] text-gray-300 font-mono animate-pulse">
                    <div className="uppercase text-gray-500 tracking-[0.2em] mb-1">Live Identity Preview</div>
                    <div>
                      &gt; probable match: <span className="text-[#00ff7b]">ghostwire</span> → 92%
                    </div>
                    <div>
                      &gt; platforms detected: <span className="text-[#00ff7b]">5</span>
                    </div>
                    <div>
                      &gt; alias cluster: <span className="text-[#00ff7b]">active</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full lg:w-[420px] border-l border-gray-900 bg-black/80 flex flex-col justify-center px-8 py-10">
              <div className="border border-gray-800 rounded-2xl p-5 bg-gradient-to-br from-black via-black to-[#050815] shadow-[0_0_50px_rgba(0,0,0,0.9)]">
                <div className="h-40 mb-5 border border-gray-900 rounded-xl bg-black/60 overflow-hidden">
                  <WorldMap fullRecon={scanState === "scanning"} />
                </div>
                <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3">DIGITAL FOOTPRINT SNAPSHOT</h2>

                <div className="text-xs text-gray-300 space-y-2 mb-5">
                  <p>
                    • Cross-platform account detection
                    <span className="text-gray-500"> (social, forums, dev, gaming)</span>
                  </p>
                  <p>
                    • Breach + exposure check
                    <span className="text-gray-500"> (public credential leaks)</span>
                  </p>
                  <p>• Connection graph of linked identities</p>
                  <p>• AI-generated intelligence dossier export (PDF)</p>
                </div>

                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">SCAN MODES</div>
                <div className="grid grid-cols-3 gap-2 text-[11px] mb-5">
                  <div className="border border-gray-800 rounded-lg px-2 py-1.5 bg-white/5 hover:bg-white/10 transition flex items-center justify-between cursor-pointer">
                    <span>Instant Trace</span>
                    <span className="text-[#00ff7b]">~3s</span>
                  </div>
                  <div className="border border-gray-800 rounded-lg px-2 py-1.5 bg-white/5 hover:bg-white/10 transition flex items-center justify-between cursor-pointer">
                    <span>Deep Link</span>
                    <span className="text-[#ffdf40]">enhanced</span>
                  </div>
                  <div className="border border-gray-800 rounded-lg px-2 py-1.5 bg-white/5 hover:bg-white/10 transition flex items-center justify-between cursor-pointer">
                    <span>Full Recon</span>
                    <span className="text-[#ff4b4b]">beta</span>
                  </div>
                </div>

                <button className="w-full mt-1 border border-[#0028ff] bg-[#0028ff] text-xs uppercase tracking-[0.2em] py-2 rounded-lg font-semibold hover:bg-transparent hover:text-[#0028ff] transition">
                  Preview Sample Report
                </button>
              </div>
            </div>
          </div>
        );

      case "DASHBOARD":
        return (
          <div className="h-full flex flex-col px-10 py-8 gap-8 text-xs">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight mb-1">Operations Dashboard</h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em]">LIVE SIGNAL: IDENTITY LINK ANALYSIS</p>
            </div>

            {/* TOP METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {[
                { label: "SCANS TODAY", value: "14", sub: "4 deep recon / 10 quick traces", glow: "" },
                { label: "LINKED ACCOUNTS", value: "37", sub: "profiles, usernames & identities connected", glow: "text-[#00ff7b]" },
                { label: "CONNECTION DENSITY", value: "HIGH", sub: "strong cross-platform identity overlap", glow: "text-[#ffdf40]" },
              ].map((box, i) => (
                <div key={i} className="border border-gray-800 rounded-2xl p-5 bg-black/70 shadow-[0_0_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_60px_rgba(0,0,0,0.6)] transition">
                  <div className="text-gray-500 uppercase tracking-[0.2em] mb-2">{box.label}</div>
                  <div className={`text-4xl font-bold ${box.glow}`}>{box.value}</div>
                  <div className="mt-2 text-gray-500">{box.sub}</div>
                </div>
              ))}
            </div>

            {/* MAIN GRID */}
            <div className="flex-1 flex flex-col lg:flex-row gap-6 text-xs">
              {/* RECENT TARGETS */}
              <div className="flex-1 border border-gray-800 rounded-2xl bg-black/70 p-5 flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.4)]">
                <div className="flex justify-between items-center mb-3">
                  <div className="uppercase tracking-[0.2em] text-gray-400">RECENT TARGETS</div>
                  <div className="text-gray-500 text-[10px]">sorted by time</div>
                </div>
                <div className="flex-1 space-y-2 overflow-auto pr-2">
                  {[
                    { t: "@ghost.wire", r: "high" },
                    { t: "hunter@protonmail", r: "medium" },
                    { t: "+1 (555) 398-1022", r: "medium" },
                    { t: "0xspecter", r: "medium" },
                    { t: "@nighttrace", r: "medium" },
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white/5 rounded-lg px-3 py-2 hover:bg-white/10 transition">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-white/30 rounded-sm" />
                        {row.t}
                      </span>
                      <span className={row.r === "high" ? "text-[#ff4b4b]" : "text-gray-500"}>{row.r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FOOTPRINT GRAPH */}
              <div className="w-full lg:w-[380px] border border-gray-800 rounded-2xl bg-black/70 p-5 flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.4)]">
                <div className="uppercase tracking-[0.2em] text-gray-400 mb-3">FOOTPRINT GRAPH</div>
                <div className="flex-1 bg-[#05050a] rounded-xl border border-gray-900 flex items-center justify-center overflow-hidden">
                  <IdentityGraph />
                </div>
                <div className="mt-2 text-[10px] text-gray-500">nodes: 128 • edges: 412 • communities: 9</div>
              </div>
            </div>
          </div>
        );

      case "HISTORY":
        return (
          <div className="h-full flex flex-col px-10 py-8 text-xs">
            <h1 className="text-2xl font-semibold mb-4 tracking-tight">Scan Archive</h1>
            <p className="text-gray-400 mb-6">Complete record of past recon operations with detailed metadata and quick-view access.</p>

            <div className="border border-gray-800 rounded-2xl overflow-hidden bg-black/70 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
              <div className="grid grid-cols-5 bg-white/5 px-4 py-2 uppercase text-[10px] tracking-[0.25em] text-gray-500 border-b border-gray-800">
                <div>Target</div>
                <div>Mode</div>
                <div>Match Strength</div>
                <div>Timestamp</div>
                <div>View</div>
              </div>

              {[
                { t: "@ghost.wire", m: "Deep Recon", s: "Strong", time: "14:22:31" },
                { t: "hunter@protonmail", m: "Quick Trace", s: "Medium", time: "13:05:02" },
                { t: "0xspecter", m: "Quick Trace", s: "Weak", time: "11:41:17" },
                { t: "@nighttrace", m: "Deep Recon", s: "Strong", time: "09:57:44" },
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-5 px-4 py-2 border-t border-gray-900 hover:bg-white/5 transition">
                  <div className="font-medium">{row.t}</div>
                  <div className="text-gray-400">{row.m}</div>
                  <div className={row.s === "Strong" ? "text-[#ff4b4b]" : row.s === "Medium" ? "text-[#ffdf40]" : "text-[#00ff7b]"}>{row.s}</div>
                  <div className="text-gray-500">{row.time}</div>
                  <button className="text-[#0028ff] underline hover:text-[#3d5bff] text-[11px]">Open</button>
                </div>
              ))}
            </div>
          </div>
        );

      case "INTEL PACKS":
        return (
          <div className="h-full flex flex-col px-10 py-8 text-xs">
            <h1 className="text-2xl font-semibold mb-2">Intel Packs</h1>
            <p className="text-gray-400 mb-6">Upgrade SearchDog with specialist data feeds and advanced analysis modules.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: "PACK 01", name: "Social Radius", desc: "Enhanced social graph building with deeper community detection and shared-interest clustering.", stat: "+12% link discovery" },
                { id: "PACK 02", name: "Leak Sentinel", desc: "Expanded coverage of public breach corpora and exposure scoring tuned for threat intel teams.", stat: "+21% exposure hits" },
                { id: "PACK 03", name: "Persona Ghostwrite", desc: "Advanced AI layer generating red-team style dossiers and social engineering risk profiles.", stat: "+AI narrative" },
              ].map((p) => (
                <div key={p.id} className="border border-gray-800 rounded-xl bg-black/80 p-4 flex flex-col gap-2">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-gray-500">{p.id}</div>
                  <div className="text-sm font-semibold">{p.name}</div>
                  <p className="text-gray-400 text-[11px]">{p.desc}</p>
                  <div className="mt-auto flex justify-between items-center text-[11px] text-gray-500">
                    <span>{p.stat}</span>
                    <button
                      onClick={() => togglePack(p.id)}
                      className={`border px-3 py-1 rounded-md transition ${
                        armedPacks[p.id] ? "border-[#00ff7b] text-[#00ff7b] shadow-[0_0_10px_#00ff7b]" : "border-gray-700 hover:border-[#0028ff]"
                      }`}
                    >
                      {armedPacks[p.id] ? "ARMED ✔" : "Arm"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "ACCOUNT":
        return (
          <div className="h-full flex flex-col px-10 py-8 text-xs">
            <h1 className="text-3xl font-semibold mb-4 tracking-tight">Operator Profile</h1>
            <p className="text-gray-400 mb-8">Manage your SearchDog identity, access tier, interface controls, and operational keys.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Operator Card */}
              <div className="border border-gray-800 rounded-2xl bg-black/80 p-6 flex flex-col gap-4 shadow-[0_0_30px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border border-gray-700 flex items-center justify-center bg-white/5 text-2xl">🐺</div>
                  <div>
                    <div className="text-base font-semibold">guest-vwu208jw</div>
                    <div className="text-[11px] text-gray-500">Tier: Prealpha Access</div>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Your encrypted operator ID grants access to SearchDog&apos;s reconnaissance suite. API keys, export routes, and advanced ops settings will appear as your
                  clearance expands.
                </p>
                <button className="self-start border border-gray-700 px-4 py-1.5 rounded-md text-[11px] hover:border-[#0028ff] hover:text-[#0028ff] transition">
                  Generate API Key
                </button>
              </div>

              {/* Preferences */}
              <div className="border border-gray-800 rounded-2xl bg-black/80 p-6 flex flex-col gap-4 col-span-2 shadow-[0_0_30px_rgba(0,0,0,0.4)]">
                <div className="text-[11px] uppercase tracking-[0.25em] text-gray-500">Interface Preferences</div>
                <div className="space-y-3 text-[12px]">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                    <span>Hacker Noise / UI SFX</span>
                    <span className="text-[#00ff7b] font-semibold">ON</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                    <span>High Contrast Mode</span>
                    <span className="text-gray-500">OFF</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                    <span>Keyboard Layout</span>
                    <span className="text-gray-500">AUTO DETECT</span>
                  </div>
                </div>

                {/* Coming Soon */}
                <div className="mt-4 p-4 border border-gray-800 rounded-xl bg-white/5 text-gray-400 text-[11px]">
                  Additional operator customizations — including theme skins, command macros, and secure workspace sync — unlock in Tier 02.
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      {/* TOP BAR */}
      <header className="flex items-center justify-between px-8 pt-4 pb-2 text-xs tracking-widest text-gray-400 border-b border-gray-900">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 mr-1" />
          <span className="uppercase">searchdog://interface</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="uppercase">session: guest-vwu208jw</span>
          <span className="text-[10px] text-gray-500">v0.1.0-prealpha</span>
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="flex-1 flex overflow-hidden">
        <aside className="w-64 border-r border-gray-900 bg-black/80 flex flex-col justify-between">
          <div>
              <div className="px-6 py-6 flex items-center gap-3 border-b border-gray-900">
                <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center bg-gradient-to-br from-[#001f3f] to-[#0836ff] text-lg font-bold">
                  SD
                </div>
              <div className="text-xs uppercase tracking-widest text-gray-400">
                <div className="text-[10px] text-gray-500">profile:</div>
                <div className="text-sm text-white">SEARCHDOG</div>
              </div>
            </div>

            <nav className="mt-4 text-sm">
              {TABS.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`w-full text-left px-6 py-3 flex items-center gap-3 transition hover:bg-white/5 ${
                    activeTab === item ? "bg-[#0028ff] text-white" : "text-gray-400"
                  }`}
                >
                  <span className="w-1 h-4 bg-white/40" />
                  <span className="tracking-wide text-xs md:text-[13px] uppercase">{item}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="px-6 py-4 text-[10px] text-gray-500 border-t border-gray-900 flex justify-between items-center">
            <span>© SEARCHDOG OPERATIONS</span>
            <span className="uppercase">{statusLabel}</span>
          </div>
        </aside>

        <section className="flex-1 relative overflow-hidden bg-black">
          {/* Cinematic overlay trigger */}
          <CinematicOverlay active={scanState === "scanning"} />
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, #ffffff11 0, #000000 60%), radial-gradient(circle at center, transparent 0, transparent 20%, #ffffff08 21%, transparent 22%)",
              backgroundBlendMode: "screen",
              backgroundSize: "cover, 12px 12px",
            }}
          />

          <div className="relative h-full flex flex-col items-stretch">{renderMainPanel()}</div>

          <footer className="absolute bottom-0 left-0 right-0 h-9 bg-black/90 border-t border-gray-900 flex items-center justify-between px-6 text-[10px] text-gray-500 uppercase tracking-widest">
            <div>ENTER ⏎ BEGIN SCAN • TAB ⇥ SWITCH MENU</div>
            <div>SEARCHDOG // THE DOG THAT HUNTS IN THE DARK</div>
          </footer>
        </section>
      </main>
    </div>
  );
}
