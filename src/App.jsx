import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import {
  // Navigation
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,

  // Media
  Play,
  Pause,

  // Technology
  Rocket,
  Code2,
  Cloud,
  BrainCircuit,
  Server,
  Orbit,
  Zap,
  Layers,
  Terminal,
  Radar,

  // Security & Status
  ShieldCheck,
  CheckCircle2,

  // Device
  Smartphone,

  // Business
  Users,
  Clock,
  TrendingUp,

  // General
  Quote,
  Sparkles,
  Send,

  // Contact
  Mail,
  Phone,
  MapPin,

  // Special
  Infinity as InfinityIcon,
} from "lucide-react";

// Font Awesome Social Media Icons
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

/* ============================================================
   DATA
============================================================ */

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

const TERMINAL_LINES = [
  "$ skyorbit deploy --env production",
  "> Building containers ...  done (4.2s)",
  "> Running test suite ...   842 passed",
  "> Provisioning cloud infra ... ok",
  "> Deployment live at orbit.app 🚀",
];

const TRUSTED_LOGOS = [
  "Orbit Pay", "Nimbus Cloud", "MedGrid", "Fleetwise", "SecureNet",
  "Vertex Labs", "Northwind", "Halcyon", "Datastream", "Corexa",
];

const STATS = [
  { label: "Projects Shipped", value: 320, suffix: "+", icon: Rocket },
  { label: "Enterprise Clients", value: 85, suffix: "+", icon: Users },
  { label: "Years in Orbit", value: 12, suffix: "+", icon: Clock },
  { label: "Uptime Guaranteed", value: 99.9, suffix: "%", icon: TrendingUp },
];

const SERVICES = [
  { icon: Code2, title: "Web & App Engineering", text: "Full-stack products built on modern, battle-tested architecture.", size: "lg" },
  { icon: Cloud, title: "Cloud & DevOps", text: "Zero-downtime infra, CI/CD and Kubernetes at any scale.", size: "sm" },
  { icon: BrainCircuit, title: "AI & Machine Learning", text: "Custom models and LLM systems that ship real decisions.", size: "sm" },
  { icon: ShieldCheck, title: "Cybersecurity", text: "Threat monitoring and compliance baked into every layer.", size: "sm" },
  { icon: Smartphone, title: "Product Design", text: "Interfaces people enjoy using, validated with real research.", size: "sm" },
  { icon: Server, title: "IT Consulting", text: "Technology roadmaps for teams scaling fast.", size: "lg" },
];

const PROJECTS = [
  { title: "Orbit Pay", tag: "Fintech · Cloud", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80", desc: "Real-time payments infra processing 2M+ transactions daily." },
  { title: "MedGrid", tag: "AI/ML · Health", img: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=900&q=80", desc: "Computer-vision diagnostics assisting radiologists in seconds." },
  { title: "Nimbus Console", tag: "DevOps · SaaS", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=900&q=80", desc: "Multi-cloud dashboard that cut infra costs by 38%." },
  { title: "SecureNet", tag: "Cybersecurity", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80", desc: "Threat-intel platform monitoring 40,000+ endpoints." },
  { title: "Fleetwise", tag: "Mobile · IoT", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80", desc: "IoT fleet tracking cutting delivery delays by 27%." },
];

const PROCESS_STEPS = [
  { title: "Discover", desc: "Map goals, users and constraints before a single line of code." },
  { title: "Design", desc: "Architecture and interface blueprints validated with prototypes." },
  { title: "Develop", desc: "Agile sprints, continuous integration, working software weekly." },
  { title: "Deploy & Scale", desc: "Automated pipelines ship to production with 24/7 monitoring." },
];

const TESTIMONIALS = [
  { name: "Arjun Malhotra", role: "CTO, Orbit Pay", quote: "Skyorbit rebuilt our payments core in four months with zero downtime. Rare engineering discipline.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" },
  { name: "Neha Kapoor", role: "VP Engineering, MedGrid", quote: "The ML pipeline runs across three hospital networks without a single major incident.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" },
  { name: "David Chen", role: "Founder, Nimbus Cloud", quote: "They cut our cloud spend by a third in six weeks. Communication was sharp and constant.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" },
];

const TEAM = [
  { name: "Rahul Sinha", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80", bio: "12 years building payment infra before founding Skyorbit." },
  { name: "Sara Iyer", role: "Head of Engineering", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80", bio: "Ex-cloud platform lead, obsessed with zero-downtime systems." },
  { name: "Vikram Desai", role: "Head of Cloud & DevOps", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80", bio: "Kubernetes contributor and infrastructure-as-code evangelist." },
  { name: "Ananya Roy", role: "Head of AI Research", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80", bio: "Published ML researcher turned production systems builder." },
];

/* ============================================================
   HOOKS
============================================================ */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCountUp(target, active, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function useTypewriter(lines, speed = 28, pause = 900) {
  const [display, setDisplay] = useState([]);
  useEffect(() => {
    let cancelled = false;
    let out = [];
    async function run() {
      for (const line of lines) {
        let current = "";
        for (const ch of line) {
          if (cancelled) return;
          current += ch;
          setDisplay([...out, current]);
          await new Promise((r) => setTimeout(r, speed));
        }
        out = [...out, current];
        await new Promise((r) => setTimeout(r, pause / 3));
      }
    }
    run();
    return () => { cancelled = true; };
  }, []);
  return display;
}

/* ============================================================
   REVEAL
============================================================ */

function Reveal({ children, className = "", delay = 0, variant = "up" }) {
  const [ref, visible] = useReveal();
  const transforms = {
    up: visible ? "translateY(0)" : "translateY(40px)",
    left: visible ? "translateX(0)" : "translateX(-40px)",
    right: visible ? "translateX(0)" : "translateX(40px)",
    scale: visible ? "scale(1)" : "scale(0.92)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: transforms[variant],
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   MAGNETIC BUTTON
============================================================ */

function Magnetic({ children, className = "", onClick }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    setPos({ x, y });
  };
  const onLeave = () => setPos({ x: 0, y: 0 });

  return (
    <button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      {children}
    </button>
  );
}

/* ============================================================
   CURSOR SPOTLIGHT
============================================================ */

function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      el.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} className="cursor-glow" />;
}

/* ============================================================
   SCROLL PROGRESS BAR
============================================================ */

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      setPct(scrolled || 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />;
}

/* ============================================================
   NAVBAR — floating pill
============================================================ */

function Navbar({ goTo, active }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="navbar-float">
        <div className="pill-nav">
          <button className="pill-brand" onClick={() => goTo("home")}>
            <Orbit size={20} strokeWidth={1.8} />
            <span>Skyorbit</span>
          </button>
          <nav className="pill-links">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => goTo(l.id)}
                className={`pill-link ${active === l.id ? "pill-link-active" : ""}`}
              >
                {l.label}
              </button>
            ))}
          </nav>
          <Magnetic className="pill-cta" onClick={() => goTo("contact")}>
            Let's Talk <ArrowUpRight size={15} />
          </Magnetic>
          <button className="pill-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      <div className={`mobile-drawer ${open ? "mobile-drawer-open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <button key={l.id} onClick={() => { goTo(l.id); setOpen(false); }}>{l.label}</button>
        ))}
        <button className="pill-cta" onClick={() => { goTo("contact"); setOpen(false); }}>
          Let's Talk <ArrowUpRight size={15} />
        </button>
      </div>
    </>
  );
}

/* ============================================================
   HERO — split with terminal
============================================================ */

function Hero({ goTo }) {
  const typed = useTypewriter(TERMINAL_LINES);

  return (
    <section id="home" className="hero-split">
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="blob blob-c" />
      <div className="noise-layer" />

      <div className="container hero-split-inner">
        <div className="hero-copy">
          <Reveal variant="left">
            <span className="tag-chip"><Sparkles size={13} /> Engineering software since 2013</span>
          </Reveal>
          <Reveal variant="left" delay={100}>
            <h1 className="hero-h1">
              Software that
              <span className="hero-h1-gradient"> leaves orbit</span>
            </h1>
          </Reveal>
          <Reveal variant="left" delay={200}>
            <p className="hero-p">
              Skyorbit Technologies designs, builds and scales cloud platforms, AI systems and
              digital products — from first commit to global launch.
            </p>
          </Reveal>
          <Reveal variant="left" delay={300}>
            <div className="hero-btn-row">
              <Magnetic className="btn-solid" onClick={() => goTo("contact")}>
                Start a Project <ArrowRight size={17} />
              </Magnetic>
              <button className="btn-outline" onClick={() => goTo("work")}>View Our Work</button>
            </div>
          </Reveal>
          <Reveal delay={420} className="hero-meta-row">
            <div className="avatar-stack">
              {[1, 2, 3, 4].map((n) => (
                <img key={n} src={`https://images.unsplash.com/photo-${["1560250097-0b93528c311a", "1580489944761-15a19d654956", "1519085360753-af0119f7cbe7", "1573497019940-1c28c88b4f3e"][n - 1]}?auto=format&fit=crop&w=100&q=80`} alt="" />
              ))}
            </div>
            <span>85+ teams building with Skyorbit</span>
          </Reveal>
        </div>

        <Reveal variant="right" delay={150} className="hero-visual">
          <div className="terminal-window">
            <div className="terminal-bar">
              <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
              <span className="terminal-title"><Terminal size={12} /> skyorbit-cli</span>
            </div>
            <div className="terminal-body">
              {typed.map((line, i) => (
                <div key={i} className="terminal-line">{line}</div>
              ))}
              <span className="cursor-blink">▍</span>
            </div>
          </div>
          <div className="float-card float-card-1">
            <Radar size={18} /> <div><strong>99.9%</strong><span>Uptime</span></div>
          </div>
          <div className="float-card float-card-2">
            <Zap size={18} /> <div><strong>4.2s</strong><span>Avg deploy</span></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   TRUSTED TICKER
============================================================ */

function TrustedTicker() {
  const loop = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS];
  return (
    <div className="ticker-strip">
      <span className="ticker-label">Trusted by teams at <br/> SR Business Solutions </span>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {loop.map((name, i) => <span key={i} className="ticker-name">{name}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ABOUT — asymmetric
============================================================ */

function About() {
  return (
    <section id="about" className="section">
      <div className="container about-split">
        <Reveal variant="left">
          <span className="eyebrow">About Skyorbit</span>
          <h2 className="h2">Engineering talent, <em>startup speed</em></h2>
          <p className="body-text">
            Since 2013, Skyorbit has partnered with founders and enterprises to turn ambitious
            ideas into resilient, production-grade software. Our pods embed directly with yours —
            moving fast without breaking what matters.
          </p>
          <div className="check-grid">
            {[
              "Senior engineering pods, not outsourced juniors",
              "Cloud-native architecture built to scale",
              "Security baked into every sprint",
              "Weekly working demos, always",
            ].map((t) => (
              <div key={t} className="check-item"><CheckCircle2 size={16} />{t}</div>
            ))}
          </div>
        </Reveal>

        <Reveal variant="right" delay={150} className="about-image-stack">
          <img className="about-img-main" src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80" alt="Engineers collaborating" />
          <img className="about-img-sub" src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80" alt="Circuit board detail" />
          <div className="about-ring"><InfinityIcon size={22} /></div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   STATS — rings
============================================================ */

function StatRing({ stat }) {
  const [ref, visible] = useReveal();
  const raw = useCountUp(stat.value, visible);
  const pct = Math.min(raw / (stat.value > 100 ? stat.value : 100) * 100, 100);
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (pct / 100) * circumference;
  const Icon = stat.icon;
  const display = stat.suffix === "%" ? raw.toFixed(1) : Math.floor(raw).toLocaleString();

  return (
    <div ref={ref} className="ring-card">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
        <circle
          cx="50" cy="50" r="42" stroke="url(#ringGrad)" strokeWidth="6" fill="none"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          transform="rotate(-90 50 50)" style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.16,1,.3,1)" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <foreignObject x="20" y="35" width="60" height="30">
          <Icon size={20} color="#22D3EE" />
        </foreignObject>
      </svg>
      <div className="ring-number">{display}{stat.suffix}</div>
      <div className="ring-label">{stat.label}</div>
    </div>
  );
}

function StatsSection() {
  return (
    <section className="section section-dark stats-section-v2">
      <div className="container stats-grid-v2">
        {STATS.map((s) => <StatRing key={s.label} stat={s} />)}
      </div>
    </section>
  );
}

/* ============================================================
   SERVICES — bento grid
============================================================ */

function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal className="section-head-center">
          <span className="eyebrow">What We Do</span>
          <h2 className="h2">Full-stack capability, <em>one partner SR Business Solutions </em></h2>
        </Reveal>
        <div className="bento-grid">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 80} className={`bento-cell bento-${s.size}`}>
                <div className="bento-card">
                  <span className="bento-icon"><Icon size={24} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ArrowUpRight className="bento-arrow" size={18} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WORK — horizontal scroll gallery
============================================================ */

function WorkGallery() {
  const trackRef = useRef(null);

  const scrollByCards = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section id="work" className="section section-dark">
      <div className="container section-head-row">
        <div>
          <span className="eyebrow eyebrow-light">Selected Work</span>
          <h2 className="h2 h2-light">Products we've <em>launched</em></h2>
        </div>
        <div className="hscroll-arrows">
          <button onClick={() => scrollByCards(-1)} aria-label="Previous"><ChevronLeft size={18} /></button>
          <button onClick={() => scrollByCards(1)} aria-label="Next"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="hscroll-track" ref={trackRef}>
        <div className="hscroll-spacer" />
        {PROJECTS.map((p) => (
          <div className="hscroll-card" key={p.title}>
            <div className="hscroll-img-wrap">
              <img src={p.img} alt={p.title} />
              <span className="hscroll-tag">{p.tag}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <button className="hscroll-link">View case study <ArrowRight size={14} /></button>
          </div>
        ))}
        <div className="hscroll-spacer" />
      </div>
    </section>
  );
}

/* ============================================================
   PROCESS — vertical timeline
============================================================ */

function Process() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head-center">
          <span className="eyebrow">How We Work</span>
          <h2 className="h2">A process built for <em>momentum</em></h2>
        </Reveal>
        <div className="timeline">
          <div className="timeline-line" />
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 120} variant={i % 2 === 0 ? "left" : "right"} className={`timeline-row ${i % 2 === 0 ? "timeline-row-left" : "timeline-row-right"}`}>
              <div className="timeline-card">
                <span className="timeline-index">{String(i + 1).padStart(2, "0")}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
              <span className="timeline-dot" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   VIDEO — full bleed
============================================================ */

function VideoBlock() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.pause(); else v.play();
    setPlaying(!playing);
  };

  return (
    <section className="video-fullbleed">
      <video
        ref={videoRef}
        poster="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80"
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
        muted loop playsInline
      />
      <div className="video-fullbleed-overlay" />
      <div className="video-fullbleed-content">
        <Magnetic className="magnetic-play" onClick={toggle}>
          {playing ? <Pause size={28} /> : <Play size={28} />}
        </Magnetic>
        <div>
          <h3>Inside the engineering war room</h3>
          <p>A short look at how a Skyorbit sprint actually runs.</p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIAL STACK
============================================================ */

function TestimonialStack() {
  const [front, setFront] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFront((f) => (f + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section section-dark">
      <div className="container">
        <Reveal className="section-head-center">
          <span className="eyebrow eyebrow-light">Client Voices</span>
          <h2 className="h2 h2-light">Trusted by <em>teams who ship</em></h2>
        </Reveal>

        <div className="stack-wrap">
          {TESTIMONIALS.map((t, i) => {
            const offset = (i - front + TESTIMONIALS.length) % TESTIMONIALS.length;
            return (
              <div
                key={t.name}
                className="stack-card"
                style={{
                  transform: `translateY(${offset * 14}px) scale(${1 - offset * 0.05}) rotate(${offset === 0 ? 0 : offset % 2 === 0 ? 2 : -2}deg)`,
                  zIndex: TESTIMONIALS.length - offset,
                  opacity: offset > 2 ? 0 : 1,
                }}
                onClick={() => setFront((f) => (f + 1) % TESTIMONIALS.length)}
              >
                <Quote size={26} className="stack-quote-icon" />
                <p>&ldquo;{t.quote}&rdquo;</p>
                <div className="stack-person">
                  <img src={t.img} alt={t.name} />
                  <div><strong>{t.name}</strong><span>{t.role}</span></div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="stack-hint">Tap a card to cycle</p>
      </div>
    </section>
  );
}

/* ============================================================
   TEAM — flip cards
============================================================ */

function Team() {
  return (
    <section id="team" className="section">
      <div className="container">
        <Reveal className="section-head-center">
          <span className="eyebrow">Leadership</span>
          <h2 className="h2">The people behind <em>the orbit</em></h2>
        </Reveal>
        <div className="flip-grid">
          {TEAM.map((f, i) => (
            <Reveal key={f.name} delay={i * 90} className="flip-outer">
              <div className="flip-card">
                <div className="flip-face flip-front">
                  <img src={f.img} alt={f.name} />
                  <div className="flip-front-info">
                    <strong>{f.name}</strong>
                    <span>{f.role}</span>
                  </div>
                </div>
                <div className="flip-face flip-back">
                  <strong>{f.name}</strong>
                  <p>{f.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
============================================================ */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "" });
  const [sent, setSent] = useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = () => { if (!form.name || !form.email || !form.phone) return; setSent(true); };

  return (
    <section id="contact" className="section section-dark contact-section">
      <div className="contact-glow" />
      <div className="container contact-grid">
        <Reveal variant="left">
          <span className="eyebrow eyebrow-light">Let's Build Something</span>
          <h2 className="h2 h2-light">Tell us about <em>your project</em></h2>
          <p className="body-text body-text-light">
            Whether you need a full product team or a focused sprint, we'll respond within one
            business day with next steps and a realistic timeline.
          </p>
          <div className="contact-info-v2">
            <span><MapPin size={16} /> Cyber Towers, HITEC City, Hyderabad, India</span>
            <span><Phone size={16} /> +91 98765 12340</span>
            <span><Mail size={16} /> hello@skyorbittech.com</span>
          </div>
        </Reveal>

        <Reveal variant="right" delay={150}>
          <div className="glass-card">
            {sent ? (
              <div className="apply-success">
                <CheckCircle2 size={36} />
                <h3>Message received!</h3>
                <p>A Skyorbit solutions engineer will reach out within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3>Request a Consultation</h3>
                <div className="input-group">
                  <label>Full Name</label>
                  <input value={form.name} onChange={update("name")} placeholder="Your name" />
                </div>
                <div className="input-group">
                  <label>Work Email</label>
                  <input value={form.email} onChange={update("email")} placeholder="you@company.com" type="email" />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input value={form.phone} onChange={update("phone")} placeholder="+91 " />
                </div>
                <div className="input-group">
                  <label>Service Needed</label>
                  <select value={form.service} onChange={update("service")}>
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <Magnetic className="btn-solid full-width" onClick={submit}>
                  Send Message <Send size={16} />
                </Magnetic>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
============================================================ */

function Footer({ goTo, goPage }) {
  return (
    <footer className="footer-v2">
      <div className="footer-giant-text">SKYORBIT</div>
      <div className="container footer-grid-v2">
        <div className="footer-brand-v2">
          <div className="pill-brand" style={{ padding: 0 }}>
            <Orbit size={22} strokeWidth={1.8} /><span>Skyorbit</span>
          </div>
          <p>Cloud, AI and product engineering for companies building what's next.</p>
          <div className="footer-social-v2">
            <a href="#" aria-label="GitHub"><FaGithub size={16} /></a>
            <a href="#" aria-label="Twitter"><FaTwitter size={16} /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn size={16} /></a>
            <a href="#" aria-label="YouTube"><FaYoutube size={16} /></a>
          </div>
        </div>
        <div className="footer-col-v2">
          <h4>Quick Links</h4>
          {NAV_LINKS.map((l) => <button key={l.id} onClick={() => goTo(l.id)}>{l.label}</button>)}
        </div>
        <div className="footer-col-v2">
          <h4>Services</h4>
          {SERVICES.slice(0, 4).map((s) => <button key={s.title} onClick={() => goTo("services")}>{s.title}</button>)}
        </div>
        <div className="footer-col-v2">
          <h4>Get in Touch</h4>
          <span><MapPin size={14} /> Hyderabad, India</span>
          <span><Phone size={14} /> +91 98765 12340</span>
          <span><Mail size={14} /> hello@skyorbittech.com</span>
        </div>
      </div>
      <div className="footer-bottom-v2">
        <span>© {new Date().getFullYear()} SR Business Solutions. All rights reserved.</span>
        <div className="footer-legal-v2">
          <button onClick={() => goPage("privacy")}>Privacy Policy</button>
          <button onClick={() => goPage("terms")}>Terms &amp; Conditions</button>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   LEGAL PAGES
============================================================ */

function LegalShell({ title, updated, children, onBack }) {
  return (
    <div className="legal-page-v2">
      <div className="container legal-container-v2">
        <button className="legal-back-v2" onClick={onBack}><ChevronLeft size={16} /> Back to website</button>
        <h1>{title}</h1>
        <p className="legal-updated-v2">Last updated: {updated}</p>
        <div className="legal-body-v2">{children}</div>
      </div>
    </div>
  );
}

function PrivacyPolicy({ onBack }) {
  return (
    <LegalShell title="Privacy Policy" updated="September 2026" onBack={onBack}>
      <p>Skyorbit Technologies ("Skyorbit", "we", "us") respects your privacy. This Privacy Policy explains what information we collect through this website, how we use it, and the choices available to you.</p>
      <h3>1. Information We Collect</h3>
      <p>When you submit a consultation request, we may collect your name, work email, phone number and details about the service you're interested in. We do not collect sensitive personal data through this website.</p>
      <h3>2. How We Use Your Information</h3>
      <p>Information submitted is used solely to respond to your enquiry, scope potential projects, and share relevant updates about Skyorbit. We do not sell or rent your personal information to third parties.</p>
      <h3>3. Cookies</h3>
      <p>This website may use cookies to improve browsing experience and understand site usage. You can disable cookies through your browser settings at any time.</p>
      <h3>4. Data Security</h3>
      <p>We apply reasonable technical and organisational measures to protect the information you share with us from unauthorised access, alteration or disclosure.</p>
      <h3>5. Third-Party Links</h3>
      <p>Our website may contain links to external sites. We are not responsible for the privacy practices of those websites and encourage you to review their policies separately.</p>
      <h3>6. Your Rights</h3>
      <p>You may request access to, correction of, or deletion of your personal information held by us by contacting us using the details in the Contact section.</p>
      <h3>7. Changes to This Policy</h3>
      <p>We may update this Privacy Policy from time to time. Continued use of the website after changes constitutes acceptance of the revised policy.</p>
      <h3>8. Contact Us</h3>
      <p>For any privacy-related questions, please write to hello@skyorbittech.com or visit our office at Cyber Towers, HITEC City, Hyderabad, India.</p>
    </LegalShell>
  );
}

function TermsConditions({ onBack }) {
  return (
    <LegalShell title="Terms &amp; Conditions" updated="September 2026" onBack={onBack}>
      <p>These Terms &amp; Conditions govern your use of the Skyorbit Technologies website. By accessing this website, you agree to be bound by these terms.</p>
      <h3>1. Use of Website</h3>
      <p>The content on this website, including text, images, videos and graphics, is provided for general informational purposes about Skyorbit, our services and past work.</p>
      <h3>2. Accuracy of Information</h3>
      <p>While we strive to keep service details, case studies and timelines accurate and up to date, Skyorbit reserves the right to modify offerings and content without prior notice.</p>
      <h3>3. Enquiries &amp; Proposals</h3>
      <p>Submitting a form through this website does not create a binding contract. All engagements are subject to a separate signed statement of work between Skyorbit and the client.</p>
      <h3>4. Intellectual Property</h3>
      <p>All logos, trademarks and original content on this website are the property of Skyorbit Technologies and may not be reproduced without written permission.</p>
      <h3>5. Limitation of Liability</h3>
      <p>Skyorbit shall not be held liable for any direct or indirect loss arising from the use of, or inability to use, this website or reliance on any information presented on it.</p>
      <h3>6. Third-Party Content</h3>
      <p>Images and media used on this website are for illustrative purposes and may not depict our exact office, staff or client environments at all times.</p>
      <h3>7. Governing Law</h3>
      <p>These terms are governed by the laws of India, and any disputes shall be subject to the jurisdiction of the courts located in Hyderabad, Telangana.</p>
      <h3>8. Contact</h3>
      <p>For questions about these Terms &amp; Conditions, please contact us at hello@skyorbittech.com.</p>
    </LegalShell>
  );
}

/* ============================================================
   GLOBAL STYLES
============================================================ */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin: 0; }
      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
      }

      :root {
        --bg: #08060F;
        --bg-2: #0D0A1A;
        --violet: #8B5CF6;
        --cyan: #22D3EE;
        --pink: #EC4899;
        --ivory: #F7F5FA;
        --ink: #120E1F;
        --muted: #6f7086;
      }

      .site-root-v2 { font-family: 'Manrope', sans-serif; color: var(--ink); background: var(--ivory); overflow-x: hidden; position: relative; }
      h1, h2, h3, h4 { margin: 0; font-weight: 800; }
      p { line-height: 1.7; color: var(--muted); margin: 0; }
      button { font-family: inherit; cursor: pointer; }
      em { font-style: normal; background: linear-gradient(120deg, var(--violet), var(--cyan)); -webkit-background-clip: text; background-clip: text; color: transparent; }

      .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

      /* cursor glow */
      .cursor-glow { position: fixed; top: 0; left: 0; width: 500px; height: 500px; border-radius: 50%; pointer-events: none; z-index: 5; background: radial-gradient(circle, rgba(139,92,246,0.10), transparent 70%); transition: transform 0.06s linear; }
      @media (max-width: 880px) { .cursor-glow { display: none; } }

      .scroll-progress { position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, var(--violet), var(--cyan)); z-index: 200; transition: width 0.1s linear; }

      /* ===== NAVBAR (floating pill) ===== */
      .navbar-float { position: fixed; top: 18px; left: 0; right: 0; z-index: 100; display: flex; justify-content: center; padding: 0 16px; }
      .pill-nav { display: flex; align-items: center; gap: 6px; background: rgba(13,10,26,0.75); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.1); border-radius: 40px; padding: 8px 8px 8px 18px; box-shadow: 0 12px 40px rgba(0,0,0,0.35); max-width: 980px; width: 100%; }
      .pill-brand { display: flex; align-items: center; gap: 8px; background: none; border: none; color: #fff; font-weight: 700; font-size: 15px; padding: 6px 8px; }
      .pill-brand svg { color: var(--cyan); }
      .pill-links { display: flex; gap: 2px; margin: 0 auto; }
      .pill-link { background: none; border: none; color: #cfd0e6; font-size: 13.5px; font-weight: 600; padding: 8px 13px; border-radius: 30px; transition: all 0.25s ease; }
      .pill-link:hover { background: rgba(255,255,255,0.08); }
      .pill-link-active { color: #fff; background: rgba(139,92,246,0.25); }
      .pill-cta { display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, var(--violet), var(--cyan)); color: #08060F; border: none; font-weight: 700; padding: 10px 18px; border-radius: 30px; font-size: 13.5px; transition: box-shadow 0.3s ease; }
      .pill-cta:hover { box-shadow: 0 8px 24px rgba(139,92,246,0.4); }
      .pill-burger { display: none; background: none; border: none; color: #fff; padding: 6px; }

      @media (max-width: 880px) { .pill-links, .pill-cta { display: none; } .pill-burger { display: block; } }
      .mobile-drawer { position: fixed; top: 78px; left: 16px; right: 16px; z-index: 99; background: rgba(13,10,26,0.96); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; max-height: 0; overflow: hidden; transition: max-height 0.4s ease; display: flex; flex-direction: column; }
      .mobile-drawer-open { max-height: 420px; }
      .mobile-drawer button { background: none; border: none; color: #e7e9f2; text-align: left; padding: 14px 20px; font-size: 15px; border-top: 1px solid rgba(255,255,255,0.06); }

      /* ===== HERO ===== */
      .hero-split { position: relative; min-height: 100vh; display: flex; align-items: center; background: var(--bg); overflow: hidden; padding-top: 100px; }
      .blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.55; }
      .blob-a { width: 480px; height: 480px; background: var(--violet); top: -120px; left: -100px; animation: float1 14s ease-in-out infinite; }
      .blob-b { width: 420px; height: 420px; background: var(--cyan); bottom: -140px; right: -80px; animation: float2 18s ease-in-out infinite; }
      .blob-c { width: 300px; height: 300px; background: var(--pink); top: 40%; right: 20%; opacity: 0.28; animation: float1 20s ease-in-out infinite reverse; }
      @keyframes float1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px,30px); } }
      @keyframes float2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,-40px); } }
      .noise-layer { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 24px 24px; }

      .hero-split-inner { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; padding: 40px 24px 80px; }
      .tag-chip { display: inline-flex; align-items: center; gap: 7px; color: var(--cyan); border: 1px solid rgba(34,211,238,0.35); padding: 6px 14px; border-radius: 30px; font-size: 12px; font-weight: 700; background: rgba(34,211,238,0.06); }
      .hero-h1 { font-size: clamp(34px, 5vw, 54px); color: #fff; line-height: 1.1; margin-top: 20px; }
      .hero-h1-gradient { display: block; }
      .hero-p { color: #b9bbd6; font-size: 16.5px; margin-top: 20px; max-width: 480px; }
      .hero-btn-row { display: flex; gap: 14px; margin-top: 30px; flex-wrap: wrap; }
      .btn-solid { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, var(--violet), var(--cyan)); color: #08060F; font-weight: 700; border: none; padding: 15px 26px; border-radius: 14px; font-size: 14.5px; transition: box-shadow 0.3s ease; }
      .btn-solid:hover { box-shadow: 0 14px 30px rgba(139,92,246,0.4); }
      .btn-outline { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.18); color: #fff; padding: 15px 24px; border-radius: 14px; font-size: 14.5px; font-weight: 600; transition: all 0.3s ease; }
      .btn-outline:hover { background: rgba(255,255,255,0.1); }
      .full-width { width: 100%; justify-content: center; }

      .hero-meta-row { display: flex; align-items: center; gap: 12px; margin-top: 40px; color: #9a9cc0; font-size: 13px; }
      .avatar-stack { display: flex; }
      .avatar-stack img { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--bg); margin-left: -10px; object-fit: cover; }
      .avatar-stack img:first-child { margin-left: 0; }

      .hero-visual { position: relative; }
      .terminal-window { background: #0D0A1A; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 30px 70px rgba(0,0,0,0.5); }
      .terminal-bar { display: flex; align-items: center; gap: 7px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.06); }
      .dot { width: 10px; height: 10px; border-radius: 50%; }
      .dot-r { background: #FF5F57; } .dot-y { background: #FEBC2E; } .dot-g { background: #28C840; }
      .terminal-title { margin-left: 10px; display: flex; align-items: center; gap: 6px; color: #8b8dab; font-size: 11.5px; font-family: 'JetBrains Mono', monospace; }
      .terminal-body { padding: 22px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #8FE9C8; min-height: 170px; }
      .terminal-line { margin-bottom: 8px; white-space: pre-wrap; }
      .cursor-blink { animation: blink 1s step-start infinite; color: var(--cyan); }
      @keyframes blink { 50% { opacity: 0; } }

      .float-card { position: absolute; display: flex; align-items: center; gap: 10px; background: rgba(13,10,26,0.9); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 12px 16px; color: #fff; box-shadow: 0 20px 40px rgba(0,0,0,0.4); animation: floatCard 5s ease-in-out infinite; }
      .float-card svg { color: var(--cyan); }
      .float-card strong { display: block; font-size: 15px; }
      .float-card span { font-size: 11px; color: #9a9cc0; }
      .float-card-1 { top: -18px; right: -14px; animation-delay: 0.2s; }
      .float-card-2 { bottom: -16px; left: -18px; animation-delay: 1s; }
      @keyframes floatCard { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

      @media (max-width: 980px) { .hero-split-inner { grid-template-columns: 1fr; } .hero-visual { margin-top: 30px; } }

      /* ===== TICKER ===== */
      .ticker-strip { background: var(--bg-2); border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 20px 0; display: flex; align-items: center; gap: 30px; }
      .ticker-label { flex-shrink: 0; padding-left: 24px; color: #7d7fa0; font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
      .ticker-viewport { overflow: hidden; flex: 1; }
      .ticker-track { display: flex; gap: 50px; width: max-content; animation: tickerScroll 24s linear infinite; }
      .ticker-name { color: #6f7096; font-size: 15px; font-weight: 700; white-space: nowrap; }
      @keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

      /* ===== SECTIONS ===== */
      .section { padding: 100px 0; }
      .section-dark { background: var(--bg); }
      .section-dark p { color: #a9abc8; }
      .section-head-center { text-align: center; max-width: 620px; margin: 0 auto 54px; }
      .section-head-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap; padding: 0 24px; max-width: 1180px; margin: 0 auto 40px; }
      .eyebrow { display: block; color: var(--violet); font-weight: 700; font-size: 12.5px; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 12px; }
      .eyebrow-light { color: var(--cyan); }
      .h2 { font-size: clamp(28px, 4vw, 40px); line-height: 1.2; }
      .h2-light { color: #fff; }
      .body-text { margin-top: 18px; font-size: 15.5px; max-width: 520px; }
      .body-text-light { color: #a9abc8; }

      /* ===== ABOUT ===== */
      .about-split { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
      .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 28px; }
      .check-item { display: flex; align-items: flex-start; gap: 8px; font-size: 13.5px; color: var(--ink); }
      .check-item svg { color: var(--violet); flex-shrink: 0; margin-top: 2px; }
      .about-image-stack { position: relative; }
      .about-img-main { width: 100%; border-radius: 20px; aspect-ratio: 4/3.2; object-fit: cover; display: block; }
      .about-img-sub { position: absolute; width: 46%; bottom: -32px; left: -30px; border-radius: 16px; border: 5px solid var(--ivory); box-shadow: 0 20px 40px rgba(20,20,50,0.2); object-fit: cover; aspect-ratio: 1; }
      .about-ring { position: absolute; top: -20px; right: -20px; width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, var(--violet), var(--cyan)); display: flex; align-items: center; justify-content: center; color: #08060F; animation: spinSlow 12s linear infinite; }
      @keyframes spinSlow { from { transform: rotate(0); } to { transform: rotate(360deg); } }
      @media (max-width: 900px) { .about-split { grid-template-columns: 1fr; } .check-grid { grid-template-columns: 1fr; } .about-img-sub { left: 10px; } }

      /* ===== STATS RINGS ===== */
      .stats-section-v2 { padding: 70px 0; background: var(--bg); }
      .stats-grid-v2 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
      .ring-card { display: flex; flex-direction: column; align-items: center; text-align: center; }
      .ring-number { font-size: 24px; font-weight: 800; color: #fff; margin-top: 10px; }
      .ring-label { font-size: 12.5px; color: #9a9cc0; margin-top: 4px; }
      @media (max-width: 700px) { .stats-grid-v2 { grid-template-columns: repeat(2, 1fr); gap: 30px; } }

      /* ===== BENTO SERVICES ===== */
      .bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 200px; gap: 18px; }
      .bento-lg { grid-column: span 2; }
      .bento-sm { grid-column: span 1; }
      .bento-card { position: relative; height: 100%; background: linear-gradient(160deg, #fff, #f7f5fb); border: 1px solid #ece9f5; border-radius: 20px; padding: 26px; display: flex; flex-direction: column; transition: transform 0.35s ease, box-shadow 0.35s ease; }
      .bento-card:hover { transform: translateY(-6px); box-shadow: 0 24px 50px rgba(80,60,150,0.14); }
      .bento-icon { display: inline-flex; align-items: center; justify-content: center; width: 46px; height: 46px; border-radius: 12px; background: linear-gradient(135deg, rgba(139,92,246,0.15), rgba(34,211,238,0.15)); color: var(--violet); }
      .bento-card h3 { font-size: 17px; margin-top: 16px; }
      .bento-card p { font-size: 13.5px; margin-top: 8px; }
      .bento-arrow { position: absolute; top: 24px; right: 24px; color: #b8b6cf; transition: all 0.3s ease; }
      .bento-card:hover .bento-arrow { color: var(--violet); transform: translate(3px,-3px); }
      @media (max-width: 900px) { .bento-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 190px; } .bento-lg { grid-column: span 2; } }
      @media (max-width: 620px) { .bento-grid { grid-template-columns: 1fr; grid-auto-rows: auto; } .bento-lg, .bento-sm { grid-column: span 1; } .bento-card { min-height: 170px; } }

      /* ===== HORIZONTAL SCROLL WORK ===== */
      .hscroll-arrows { display: flex; gap: 10px; }
      .hscroll-arrows button { width: 40px; height: 40px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.04); color: #fff; display: flex; align-items: center; justify-content: center; transition: all 0.25s ease; }
      .hscroll-arrows button:hover { background: var(--cyan); border-color: var(--cyan); color: #08060F; }
      .hscroll-track { display: flex; gap: 22px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 4px 0 20px; scrollbar-width: none; }
      .hscroll-track::-webkit-scrollbar { display: none; }
      .hscroll-spacer { flex: 0 0 calc((100vw - 1132px) / 2); min-width: 4px; }
      .hscroll-card { flex: 0 0 320px; scroll-snap-align: start; background: #0D0A1A; border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; overflow: hidden; padding-bottom: 22px; transition: transform 0.35s ease; }
      .hscroll-card:hover { transform: translateY(-6px); }
      .hscroll-img-wrap { position: relative; height: 190px; overflow: hidden; }
      .hscroll-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
      .hscroll-card:hover .hscroll-img-wrap img { transform: scale(1.1); }
      .hscroll-tag { position: absolute; top: 14px; right: 14px; background: rgba(8,6,15,0.85); color: var(--cyan); font-size: 10.5px; font-weight: 700; padding: 5px 11px; border-radius: 20px; }
      .hscroll-card h3 { color: #fff; font-size: 17px; padding: 18px 20px 6px; }
      .hscroll-card p { font-size: 13.5px; padding: 0 20px; }
      .hscroll-link { display: inline-flex; align-items: center; gap: 6px; background: none; border: none; color: var(--cyan); font-weight: 700; font-size: 13px; margin: 14px 20px 0; }

      /* ===== PROCESS TIMELINE ===== */
      .timeline { position: relative; max-width: 780px; margin: 0 auto; display: flex; flex-direction: column; gap: 50px; }
      .timeline-line { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg, var(--violet), var(--cyan)); transform: translateX(-50%); opacity: 0.3; }
      .timeline-row { position: relative; display: flex; }
      .timeline-row-left { justify-content: flex-start; }
      .timeline-row-right { justify-content: flex-end; }
      .timeline-card { width: 46%; background: #fff; border: 1px solid #ece9f5; border-radius: 16px; padding: 24px; box-shadow: 0 14px 34px rgba(60,40,120,0.08); }
      .timeline-index { color: var(--violet); font-weight: 800; font-size: 20px; }
      .timeline-card h4 { font-size: 16.5px; margin: 10px 0 6px; }
      .timeline-card p { font-size: 13.5px; }
      .timeline-dot { position: absolute; top: 26px; left: 50%; transform: translateX(-50%); width: 14px; height: 14px; border-radius: 50%; background: linear-gradient(135deg, var(--violet), var(--cyan)); box-shadow: 0 0 0 5px var(--ivory); }
      @media (max-width: 700px) { .timeline-line { left: 18px; } .timeline-row-left, .timeline-row-right { justify-content: flex-start; padding-left: 40px; } .timeline-card { width: 100%; } .timeline-dot { left: 18px; } }

      /* ===== VIDEO FULLBLEED ===== */
      .video-fullbleed { position: relative; height: 70vh; min-height: 420px; overflow: hidden; }
      .video-fullbleed video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .video-fullbleed-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(8,6,15,0.5), rgba(8,6,15,0.85)); }
      .video-fullbleed-content { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; text-align: center; padding: 0 24px; }
      .video-fullbleed-content h3 { color: #fff; font-size: clamp(20px, 3vw, 28px); }
      .video-fullbleed-content p { color: #b9bbd6; margin-top: 8px; }
      .magnetic-play { width: 84px; height: 84px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.08); backdrop-filter: blur(6px); color: #fff; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease; }
      .magnetic-play:hover { background: linear-gradient(135deg, var(--violet), var(--cyan)); color: #08060F; }

      /* ===== TESTIMONIAL STACK ===== */
      .stack-wrap { position: relative; max-width: 560px; margin: 0 auto; height: 300px; }
      .stack-card { position: absolute; inset: 0; background: #0D0A1A; border: 1px solid rgba(255,255,255,0.1); border-radius: 22px; padding: 40px; cursor: pointer; transition: transform 0.6s cubic-bezier(.16,1,.3,1), opacity 0.6s ease; box-shadow: 0 30px 60px rgba(0,0,0,0.4); }
      .stack-quote-icon { color: var(--cyan); }
      .stack-card p { font-size: 18px; color: #eceefc; margin-top: 14px; font-weight: 600; line-height: 1.5; }
      .stack-person { display: flex; align-items: center; gap: 12px; margin-top: 24px; }
      .stack-person img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
      .stack-person strong { display: block; color: #fff; font-size: 14px; }
      .stack-person span { font-size: 12px; color: #9a9cc0; }
      .stack-hint { text-align: center; margin-top: 24px; font-size: 12.5px; color: #6f7096; }

      /* ===== TEAM FLIP CARDS ===== */
      .flip-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
      .flip-outer { perspective: 1200px; height: 300px; }
      .flip-card { position: relative; width: 100%; height: 100%; transition: transform 0.7s cubic-bezier(.16,1,.3,1); transform-style: preserve-3d; }
      .flip-outer:hover .flip-card { transform: rotateY(180deg); }
      .flip-face { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 18px; overflow: hidden; }
      .flip-front { display: flex; flex-direction: column; }
      .flip-front img { width: 100%; height: 220px; object-fit: cover; }
      .flip-front-info { background: #fff; border: 1px solid #ece9f5; border-top: none; padding: 14px 16px; flex: 1; }
      .flip-front-info strong { display: block; font-size: 14.5px; }
      .flip-front-info span { font-size: 12px; color: var(--muted); }
      .flip-back { transform: rotateY(180deg); background: linear-gradient(160deg, var(--violet), var(--cyan)); color: #08060F; padding: 26px; display: flex; flex-direction: column; justify-content: center; }
      .flip-back strong { font-size: 16px; }
      .flip-back p { color: rgba(8,6,15,0.75); font-size: 13.5px; margin-top: 10px; }
      @media (max-width: 900px) { .flip-grid { grid-template-columns: repeat(2, 1fr); } }

      /* ===== CONTACT ===== */
      .contact-section { position: relative; overflow: hidden; }
      .contact-glow { position: absolute; top: -200px; right: -200px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%); filter: blur(40px); }
      .contact-grid { position: relative; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: start; }
      .contact-info-v2 { margin-top: 30px; display: flex; flex-direction: column; gap: 14px; }
      .contact-info-v2 span { display: flex; align-items: flex-start; gap: 10px; color: #b9bbd6; font-size: 14px; }
      .contact-info-v2 svg { color: var(--cyan); flex-shrink: 0; margin-top: 2px; }
      .glass-card { background: rgba(255,255,255,0.04); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); border-radius: 22px; padding: 32px; }
      .glass-card h3 { font-size: 19px; color: #fff; margin-bottom: 20px; }
      .input-group { margin-bottom: 15px; display: flex; flex-direction: column; gap: 6px; }
      .input-group label { font-size: 12px; font-weight: 700; color: #cfd0e6; }
      .input-group input, .input-group select { border: 1px solid rgba(255,255,255,0.14); border-radius: 10px; padding: 12px 14px; font-size: 14px; font-family: inherit; background: rgba(255,255,255,0.03); color: #fff; }
      .input-group input::placeholder { color: #6f7096; }
      .input-group input:focus, .input-group select:focus { outline: none; border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(34,211,238,0.16); }
      .input-group select option { background: #0D0A1A; }
      .apply-success { text-align: center; padding: 30px 0; color: var(--cyan); }
      .apply-success h3 { margin: 14px 0 8px; color: #fff; }
      @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }

      /* ===== FOOTER ===== */
      .footer-v2 { position: relative; background: #05040a; padding: 70px 0 0; overflow: hidden; }
      .footer-giant-text { position: absolute; top: 10px; left: 0; right: 0; text-align: center; font-size: 130px; font-weight: 800; color: rgba(255,255,255,0.025); letter-spacing: 6px; white-space: nowrap; pointer-events: none; }
      .footer-grid-v2 { position: relative; display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap: 40px; padding-bottom: 50px; border-bottom: 1px solid rgba(255,255,255,0.06); }
      .footer-brand-v2 p { color: #7d7fa0; font-size: 13px; margin: 16px 0 18px; max-width: 300px; }
      .footer-social-v2 { display: flex; gap: 10px; }
      .footer-social-v2 a { width: 34px; height: 34px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; color: #b9bbd6; transition: all 0.25s ease; }
      .footer-social-v2 a:hover { background: var(--cyan); border-color: var(--cyan); color: #05040a; }
      .footer-col-v2 { display: flex; flex-direction: column; gap: 11px; position: relative; }
      .footer-col-v2 h4 { color: #fff; font-size: 14px; margin-bottom: 4px; }
      .footer-col-v2 button { background: none; border: none; color: #7d7fa0; text-align: left; font-size: 13px; padding: 0; }
      .footer-col-v2 button:hover { color: var(--cyan); }
      .footer-col-v2 span { display: flex; align-items: flex-start; gap: 8px; color: #7d7fa0; font-size: 13px; }
      .footer-col-v2 span svg { color: var(--cyan); flex-shrink: 0; margin-top: 2px; }
      .footer-bottom-v2 { position: relative; max-width: 1180px; margin: 0 auto; padding: 20px 24px 26px; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
      .footer-bottom-v2 span { color: #5f6083; font-size: 12px; }
      .footer-legal-v2 { display: flex; gap: 20px; }
      .footer-legal-v2 button { background: none; border: none; color: #7d7fa0; font-size: 12px; }
      .footer-legal-v2 button:hover { color: var(--cyan); }
      @media (max-width: 980px) { .footer-grid-v2 { grid-template-columns: 1fr 1fr; } .footer-giant-text { font-size: 70px; } }
      @media (max-width: 560px) { .footer-grid-v2 { grid-template-columns: 1fr; } }

      /* ===== LEGAL ===== */
      .legal-page-v2 { min-height: 100vh; background: var(--ivory); padding: 140px 0 100px; }
      .legal-container-v2 { max-width: 780px; }
      .legal-back-v2 { display: inline-flex; align-items: center; gap: 6px; background: none; border: none; color: var(--violet); font-weight: 700; font-size: 14px; margin-bottom: 28px; }
      .legal-page-v2 h1 { font-size: clamp(26px, 4vw, 38px); }
      .legal-updated-v2 { margin-top: 8px; color: var(--muted); font-size: 13px; }
      .legal-body-v2 { margin-top: 28px; display: flex; flex-direction: column; gap: 16px; }
      .legal-body-v2 h3 { font-size: 17px; margin-top: 8px; color: var(--ink); }
      .legal-body-v2 p { font-size: 14.5px; }
    `}</style>
  );
}

/* ============================================================
   APP
============================================================ */

export default function App() {
  const [page, setPage] = useState("home");
  const [active, setActive] = useState("home");

  const goTo = (id) => {
    if (page !== "home") {
      setPage("home");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 60);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setActive(id);
  };

  const goPage = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  useEffect(() => {
    if (page !== "home") return;
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [page]);

  return (
    <div className="site-root-v2">
      <GlobalStyles />
      <CursorGlow />
      <ScrollProgress />
      <Navbar goTo={goTo} active={active} />

      {page === "home" && (
        <>
          <Hero goTo={goTo} />
          <TrustedTicker />
          <About />
          <StatsSection />
          <Services />
          <WorkGallery />
          <Process />
          <VideoBlock />
          <TestimonialStack />
          <Team />
          <Contact />
        </>
      )}

      {page === "privacy" && <PrivacyPolicy onBack={() => goPage("home")} />}
      {page === "terms" && <TermsConditions onBack={() => goPage("home")} />}

      <Footer goTo={goTo} goPage={goPage} />
    </div>
  );
}