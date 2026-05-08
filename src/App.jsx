import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'framer-motion';
import { Blocks, BrainCircuit, Building2, CalendarDays, ChevronRight, Cloud, Code2, Cpu, Database, Globe, Layers3, LayoutDashboard, Lock, Map, MonitorSmartphone, Puzzle, Rocket, ScanSearch, ServerCog, ShieldCheck, Sparkles, Star, Wrench, Workflow, Zap } from 'lucide-react';
import { siCloudflare, siDocker, siDuckdb, siFastapi, siFlask, siNodedotjs, siOllama, siOpencv, siPandas, siPlotly, siPostgresql, siPython, siRailway, siReact, siSqlite, siStreamlit, siVite, siXyflow } from 'simple-icons';
import { copy } from './content/translations.js';
import ordoLogo from './assets/ordo/logo.png';

const ordoDashboard = '/ordo-data/assets/dashboard-BhJb6xgr.png';
const ordoNormalization = '/ordo-data/assets/normalizacion-CSn--oZg.png';
const ordoAi = '/ordo-data/assets/normalizacion-CSn--oZg.png';

const capabilityIcons = [
  {
    card: Building2,
    items: [Globe, MonitorSmartphone, ShieldCheck],
    tone: 'amber',
  },
  {
    card: LayoutDashboard,
    items: [LayoutDashboard, Lock, Zap],
    tone: 'blue',
  },
  {
    card: BrainCircuit,
    items: [ScanSearch, Map, Workflow],
    tone: 'violet',
  },
];

const aboutStatusVisuals = [
  { icon: Cpu, tone: 'teal' },
  { icon: Layers3, tone: 'blue' },
  { icon: ShieldCheck, tone: 'violet' },
];

const technologyGroups = [
  { label: 'Frontend', icon: Code2, tone: 'blue', chips: ['React', 'Vite', 'React Flow', 'TipTap', 'FullCalendar'] },
  { label: 'Backend', icon: ServerCog, tone: 'green', chips: ['Python', 'FastAPI', 'Flask', 'Streamlit', 'Node.js'] },
  { label: 'Datos', icon: Database, tone: 'amber', chips: ['PostgreSQL', 'DuckDB', 'SQLite', 'Pandas', 'Plotly'] },
  { label: 'IA & Vision', icon: BrainCircuit, tone: 'violet', chips: ['OpenCV', 'Ollama', 'IA / LLMs locales', 'Tesseract OCR'] },
  { label: 'Infraestructura', icon: Cloud, tone: 'cyan', chips: ['Docker', 'Railway', 'Cloudflare R2'] },
  { label: 'Herramientas', icon: Wrench, tone: 'paper', chips: ['APIs / Integraciones', 'Mapas / Geoespacial'] },
];

const whyCardVisuals = [
  { icon: Blocks, tone: 'blue', progress: '12%' },
  { icon: Puzzle, tone: 'blue', progress: '18%' },
  { icon: Layers3, tone: 'cyan', progress: '34%' },
  { icon: Zap, tone: 'cyan', progress: '16%' },
  { icon: Star, tone: 'teal', progress: '11%' },
  { icon: ShieldCheck, tone: 'teal', progress: '15%' },
];

const methodCardVisuals = [
  { icon: ScanSearch, tone: 'blue', progress: '12%' },
  { icon: Blocks, tone: 'blue', progress: '18%' },
  { icon: Code2, tone: 'teal', progress: '16%' },
  { icon: Rocket, tone: 'violet', progress: '14%' },
];

const technologyIconMap = {
  React: { type: 'simple', icon: siReact },
  Vite: { type: 'simple', icon: siVite },
  'React Flow': { type: 'simple', icon: siXyflow },
  TipTap: { type: 'fallback', icon: Blocks, color: '#8ee6ff' },
  FullCalendar: { type: 'fallback', icon: CalendarDays, color: '#8ac4ff' },
  Python: { type: 'simple', icon: siPython },
  FastAPI: { type: 'simple', icon: siFastapi },
  Flask: { type: 'simple', icon: siFlask },
  Streamlit: { type: 'simple', icon: siStreamlit },
  'Node.js': { type: 'simple', icon: siNodedotjs },
  PostgreSQL: { type: 'simple', icon: siPostgresql },
  DuckDB: { type: 'simple', icon: siDuckdb },
  SQLite: { type: 'simple', icon: siSqlite },
  Pandas: { type: 'simple', icon: siPandas },
  Plotly: { type: 'simple', icon: siPlotly },
  OpenCV: { type: 'simple', icon: siOpencv },
  Ollama: { type: 'simple', icon: siOllama },
  'IA / LLMs locales': { type: 'fallback', icon: BrainCircuit, color: '#a86bff' },
  'Tesseract OCR': { type: 'fallback', icon: ScanSearch, color: '#66e7e5' },
  Docker: { type: 'simple', icon: siDocker },
  Railway: { type: 'simple', icon: siRailway },
  'Cloudflare R2': { type: 'simple', icon: siCloudflare },
  'APIs / Integraciones': { type: 'fallback', icon: Workflow, color: '#d0d6df' },
  'Mapas / Geoespacial': { type: 'fallback', icon: Map, color: '#9bdd4a' },
};

/* Routing */
function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  function navigate(href) {
    if (href.startsWith('http') || href.startsWith('#') || href.includes('#')) return;
    window.history.pushState({}, '', href);
    setPath(window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return { path, navigate };
}

/* Scroll reveal */
function Reveal({ children, className = '', direction = 'up' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.65'],
  });
  const smooth = useSpring(scrollYProgress, { mass: 0.6, stiffness: 100, damping: 24 });

  const xOffset = direction === 'left' ? -60 : direction === 'right' ? 60 : 0;
  const yOffset = direction === 'up' ? 50 : 0;

  const x = useTransform(smooth, [0, 1], [xOffset, 0]);
  const y = useTransform(smooth, [0, 1], [yOffset, 0]);
  const opacity = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={`reveal-mask ${className}`}>
      <motion.div style={{ opacity, x, y, willChange: 'transform, opacity' }}>
        {children}
      </motion.div>
    </div>
  );
}

/* Scroll-linked container */
function StaggerContainer({ children, className = '', direction = 'right' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.55'],
  });
  const smooth = useSpring(scrollYProgress, { mass: 0.8, stiffness: 80, damping: 22 });

  const xOffset = direction === 'left' ? -80 : direction === 'right' ? 80 : 0;
  const x = useTransform(smooth, [0, 1], [xOffset, 0]);
  const opacity = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, x, willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

function TechnologyChipIcon({ chip }) {
  const entry = technologyIconMap[chip];

  if (!entry) {
    return <span className="tech-chip-glyph" aria-hidden="true">{chip.slice(0, 1)}</span>;
  }

  if (entry.type === 'simple') {
    return (
      <svg className="tech-chip-logo" viewBox="0 0 24 24" aria-hidden="true">
        <path d={entry.icon.path} fill={`#${entry.icon.hex}`} />
      </svg>
    );
  }

  const Icon = entry.icon;
  return <Icon className="tech-chip-fallback" size={14} strokeWidth={1.9} aria-hidden="true" style={{ color: entry.color }} />;
}

/* Interactive card */
function InteractiveCard({ children, className = '' }) {
  const cardRef = useRef(null);

  function handleMouseMove(event) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} className={className}>
      {children}
    </div>
  );
}

/* SmartLink */
function SmartLink({ href, onNavigate, children, className, ...props }) {
  const isExternal = href?.startsWith('http');
  const isStaticFile = href?.includes('/ordo-data/');
  const isHashRoute = href?.includes('#');

  function handleClick(event) {
    if (isExternal || isStaticFile || isHashRoute) return;
    if (!href?.startsWith('/')) return;
    event.preventDefault();
    onNavigate(href);
  }

  const extraProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a href={href} onClick={handleClick} className={className} {...props} {...extraProps}>
      {children}
    </a>
  );
}

/* Language toggle */
function LanguageToggle({ lang, setLang }) {
  return (
    <div className="language-toggle" aria-label="Language selector">
      {['es', 'en'].map((code) => (
        <button
          key={code}
          type="button"
          className={lang === code ? 'is-active' : ''}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ── AreaChart component for Hero ── */
function AreaChart({ className, color = 'var(--success)' }) {
  return (
    <div className={`arch-chart-container ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${className}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,40 Q10,10 20,25 T40,15 T60,30 T80,10 T100,25 L100,40 L0,40 Z"
          fill={`url(#grad-${className})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,40 Q10,10 20,25 T40,15 T60,30 T80,10 T100,25"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

/* ── Header ── */
function Header({ t, lang, setLang, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <SmartLink href="/" onNavigate={onNavigate} className="brand" aria-label="DuarLabs home">
        <span className="brand-mark">D</span>
        <span>DuarLabs</span>
      </SmartLink>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {t.nav.items.map((item) => (
          <a key={item.label} href={item.href}>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <LanguageToggle lang={lang} setLang={setLang} />
    </header>
  );
}

/* Progress bar */
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });
  return <motion.div className="progress-bar" style={{ scaleX }} />;
}

/* ── Side Nav ── */
function SideNav() {
  const sections = ['home', 'about', 'technologies', 'capabilities', 'projects', 'why', 'methodology'];
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="side-nav">
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`side-nav-dot ${active === id ? 'is-active' : ''}`}
          aria-label={`Scroll to ${id}`}
        />
      ))}
    </div>
  );
}

/* ── Section Intro ── */
function SectionIntro({ label, title, body, direction = 'up' }) {
  return (
    <Reveal className="section-intro" direction={direction}>
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </Reveal>
  );
}

function ScrollIndicator() {
  return (
    <div className="scroll-indicator" aria-hidden="true">
      <div className="scroll-dot" />
    </div>
  );
}

function MiniTrendChart({ values = [] }) {
  const width = 170;
  const height = 60;
  const padding = 6;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);

  const points = values
    .map((value, index) => {
      const x = padding + (index * (width - padding * 2)) / Math.max(values.length - 1, 1);
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;
  const yTicks = [0, 1, 2].map((tick) => {
    const y = padding + (tick * (height - padding * 2)) / 2;
    return Math.round(height - padding - ((y - padding) / (height - padding * 2)) * range + min);
  });
  const xLabels = ['Ja', 'Mar', 'May', 'Jul', 'Set', 'Nov', 'Dec'];

  return (
    <div className="metric-chart" aria-hidden="true">
      <div className="metric-chart-scale">
        {yTicks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
      <div className="metric-chart-plot">
        <svg viewBox={`0 0 ${width} ${height}`} role="presentation">
          <defs>
            <linearGradient id="metric-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.42)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
            </linearGradient>
          </defs>
          {[12, 28, 44].map((line) => (
            <line
              key={line}
              x1={padding}
              x2={width - padding}
              y1={line}
              y2={line}
              className="metric-chart-gridline"
            />
          ))}
          <polygon points={areaPoints} className="metric-chart-area" />
          <polyline points={points} className="metric-chart-line" />
        </svg>
        <div className="metric-chart-labels">
          {xLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SmallTrendChart({ values = [], tone = 'mint', compact = false }) {
  if (!values.length) return null;

  const width = 150;
  const height = compact ? 30 : 40;
  const padding = 5;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);

  const chartPoints = values.map((value, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(values.length - 1, 1);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return { x, y };
  });

  const points = chartPoints
    .map((value, index) => {
      const point = chartPoints[index];
      return `${point.x},${point.y}`;
    })
    .join(' ');

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;
  const lastPoint = chartPoints[chartPoints.length - 1];
  const verticalGuides = Array.from({ length: 5 }, (_, index) => {
    return padding + ((index + 1) * (width - padding * 2)) / 6;
  });

  return (
    <div className={`mini-trend-chart mini-trend-chart-${tone} ${compact ? 'mini-trend-chart-compact' : ''}`} aria-hidden="true">
      <svg viewBox={`0 0 ${width} ${height}`} role="presentation">
        {verticalGuides.map((line) => (
          <line
            key={`x-${line}`}
            x1={line}
            x2={line}
            y1={padding}
            y2={height - padding}
            className="mini-trend-gridline mini-trend-gridline-vertical"
          />
        ))}
        {[10, 20, 30].map((line) => (
          <line
            key={`y-${line}`}
            x1={padding}
            x2={width - padding}
            y1={line}
            y2={line}
            className="mini-trend-gridline"
          />
        ))}
        <polygon points={areaPoints} className="mini-trend-area" />
        <polyline points={points} className="mini-trend-line mini-trend-line-glow" />
        <polyline points={points} className="mini-trend-line" />
        <circle cx={lastPoint.x} cy={lastPoint.y} r="2.4" className="mini-trend-dot" />
      </svg>
    </div>
  );
}

/* Home */
function HomePage({ t, lang, setLang, onNavigate }) {
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const smoothProgress = useSpring(heroProgress, { mass: 0.8, stiffness: 80, damping: 20 });
  
  const heroContentY = useTransform(smoothProgress, [0, 0.6], [0, -140]);
  const heroContentOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const archScale = useTransform(smoothProgress, [0, 0.6], [1, 1.18]);
  const archOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const archBlur = useTransform(smoothProgress, [0, 0.5], ['blur(0px)', 'blur(18px)']);
  const gridOpacity = useTransform(smoothProgress, [0, 0.4], [0.22, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      containerRef.current.style.setProperty('--x', `${e.clientX}px`);
      containerRef.current.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} onNavigate={onNavigate} />
      <ProgressBar />
      <SideNav />
      <main className="landing-page">
        {/* ── Hero with Parallax Dissolve ── */}
        <section ref={heroRef} className="hero-parallax" id="home">
          <div className="hero-sticky">
            {/* Animated grid background */}
            <motion.div className="hero-grid-bg" style={{ opacity: gridOpacity }} />

            {/* Corporate architecture panel */}
            <motion.div
              className="hero-architecture"
              aria-hidden="true"
              style={{
                opacity: archOpacity,
                filter: archBlur,
                scale: archScale
              }}
            >
              <AreaChart className="chart-1" color="var(--success)" />
              <AreaChart className="chart-2" color="var(--blueprint)" />
              <AreaChart className="chart-3" color="#a855f7" />

              <motion.div 
                className="arch-panel arch-panel-main"
                drag
                dragConstraints={heroRef}
                whileDrag={{ scale: 1.05, zIndex: 20 }}
              >
                <div className="arch-panel-header">
                  <span>USUARIOS: 17k</span>
                  <div className="arch-status-pill">
                    <div className="arch-status-dot" />
                    Pllen
                  </div>
                </div>
                <strong>{t.hero.arch.systems}</strong>
              </motion.div>

              <motion.div 
                className="arch-panel arch-panel-sub"
                drag
                dragConstraints={heroRef}
                whileDrag={{ scale: 1.05, zIndex: 20 }}
              >
                <div className="arch-panel-header">
                  <span>STATUS</span>
                  <div className="arch-status-pill">
                    <div className="arch-status-dot" />
                    Open
                  </div>
                </div>
                <strong>{t.hero.arch.data}</strong>
              </motion.div>

              <div className="arch-line arch-line-a" />
              <div className="arch-line arch-line-b" />
              <div className="arch-node arch-node-a" />
              <div className="arch-node arch-node-b" />
              <div className="arch-node arch-node-c" />
            </motion.div>

            {/* Content */}
            <motion.div 
              className="hero-content"
              style={{ opacity: heroContentOpacity, y: heroContentY }}
            >
              <p className="eyebrow">
                {t.hero.eyebrow}
              </p>

              <h1>
                {t.hero.title}
              </h1>

              <p className="hero-slogan">
                {t.hero.slogan}
              </p>

              <p className="hero-body">
                {t.hero.body}
              </p>
              <div className="hero-actions">
                <a href="#projects" className="button button-primary">
                  {t.hero.primary}
                </a>
                <a href="#contact" className="button button-secondary">
                  {t.hero.secondary}
                </a>
              </div>
              <ScrollIndicator />
            </motion.div>
          </div>
        </section>

        <section className="content-band muted" id="about">
          <div className="container about-stage">
            <div className="about-stage-top">
              <Reveal className="about-copy-panel" direction="left">
                <p className="eyebrow">{t.about.label}</p>
                <h2>{t.about.title}</h2>
                <p>{t.about.body}</p>
              </Reveal>
              <StaggerContainer className="about-status-stack" direction="right">
                {t.about.topCards.map((card, index) => (
                  <StaggerItem key={card.title}>
                    <InteractiveCard className={`about-status-card about-status-card-${aboutStatusVisuals[index]?.tone || 'teal'}`}>
                      <div className="about-status-icon" aria-hidden="true">
                        {React.createElement(aboutStatusVisuals[index]?.icon || Sparkles, { size: 28, strokeWidth: 1.9 })}
                      </div>
                      <div className="about-status-head">
                        <span className="about-status-label">{card.label}</span>
                        <div className="about-status-value">
                          <strong>{card.value}</strong>
                          <i />
                        </div>
                      </div>
                      <p>{card.body}</p>
                      <div className="about-status-foot" aria-hidden="true">
                        <span className="about-status-progress" />
                        <div className="about-status-dots">
                          <span /><span /><span />
                          <span /><span /><span />
                          <span /><span /><span />
                          <span /><span /><span />
                        </div>
                      </div>
                    </InteractiveCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
            <Reveal direction="up">
              <div className="about-rail about-rail-lines">
                {t.about.cards.map((card) => (
                  <article key={card.label} className="about-rail-item">
                    <p>
                      <span>{card.label}</span>
                      {card.title}
                    </p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="content-band presentation-band" id="presentation">
          <div className="container presentation-stage">
            <SectionIntro
              label={t.presentation.label}
              title={t.presentation.title}
              body={t.presentation.body}
              direction="left"
            />
            <Reveal className="diagram-shell" direction="up">
              <div className="diagram-panel">
                <div className="polygon-flow polygon-flow-large" aria-hidden="true">
                  <div className="flow-dots flow-dots-left">
                    <span /><span /><span /><span /><span /><span />
                  </div>
                  <div className="flow-dots flow-dots-right">
                    <span /><span /><span /><span /><span /><span /><span /><span /><span />
                  </div>
                  <div className="diagram-arc" />

                  {t.presentation.boardNodes.map((node) => (
                    <div key={node.key} className={`diagram-node diagram-node-${node.key}`}>
                      <div className="diagram-node-shape">
                        <span>{node.label}</span>
                      </div>
                      {node.caption ? <small>{node.caption}</small> : null}
                    </div>
                  ))}

                  <div className="diagram-link diagram-link-a" />
                  <div className="diagram-link diagram-link-b" />
                  <div className="diagram-link diagram-link-c" />
                  <div className="diagram-link diagram-link-d" />

                  <div className="diagram-badge diagram-badge-a">{t.presentation.boardBadges[0].label}</div>
                  <div className="diagram-badge diagram-badge-b">{t.presentation.boardBadges[1].label}</div>
                </div>

              </div>
            </Reveal>

            <div className="presentation-support-grid">
              <Reveal direction="left">
                {/* Tarjeta de capacidad con color propio */}
                <InteractiveCard className="presentation-panel presentation-panel-compact capability-card capability-card-blue">
                  <div className="presentation-copy">
                    <p className="eyebrow">{t.presentation.scriptLabel}</p>
                    <div className="concept-list concept-list-compact">
                      {t.presentation.concepts.map((concept, index) => (
                        <div className="concept-item" key={concept.title}>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <div>
                            <h3>{concept.title}</h3>
                            <p>{concept.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </InteractiveCard>
              </Reveal>
              <Reveal direction="right">
                <StaggerContainer className="keyword-grid keyword-grid-panel" direction="right">
                  {t.presentation.keywords.map((keyword) => (
                    <StaggerItem key={keyword}>
                      <span className="keyword-chip">{keyword}</span>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="content-band technology-band" id="technology">
          <div className="container">
            <div className="technology-stage">
              <Reveal className="technology-copy" direction="up">
                <p className="eyebrow">{t.labels.technology}</p>
                <h2>{t.technologySection.title}</h2>
              </Reveal>
              <Reveal direction="up">
                <div className="technology-table">
                  {technologyGroups.map((group) => (
                    <div key={group.label} className={`technology-row technology-row-${group.tone}`}>
                      <div className="technology-label">
                        <span className="technology-label-icon" aria-hidden="true">
                          {React.createElement(group.icon, { size: 14, strokeWidth: 2 })}
                        </span>
                        <strong>{group.label}</strong>
                      </div>
                      <div className="technology-chip-grid technology-chip-grid-rows">
                        {group.chips
                          .filter((chip) => t.technologySection.chips.includes(chip))
                          .map((chip) => (
                            <span key={chip} className="tech-chip tech-chip-row">
                              <span className="tech-chip-media" aria-hidden="true">
                                <TechnologyChipIcon chip={chip} />
                              </span>
                              <span className="tech-chip-text">{chip}</span>
                            </span>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="content-band" id="capabilities">
          <div className="container">
            <SectionIntro
              label={t.labels.services}
              title={t.capabilitiesTitle}
              direction="left"
            />
            <div className="capability-board">
              <StaggerContainer className="card-grid capability-grid" direction="right">
                {t.capabilities.map((capability, index) => (
                  <StaggerItem key={capability.title}>
                    <InteractiveCard className={`premium-card premium-card-compact capability-card capability-card-${capabilityIcons[index]?.tone || 'amber'}`}>
                      <div className="card-header">
                        <div className="capability-topline" />
                        <div className="capability-badge" aria-hidden="true">
                          {React.createElement(capabilityIcons[index]?.card || Sparkles, { size: 16, strokeWidth: 1.8 })}
                        </div>
                        <p className="card-index">0{index + 1}</p>
                        <div className="card-glow" />
                      </div>
                      <h3>{capability.title}</h3>
                      <p>{capability.body}</p>
                      <ul>
                        {capability.items.map((item, itemIndex) => {
                          const ItemIcon = capabilityIcons[index]?.items?.[itemIndex] || Sparkles;
                          return (
                            <li key={item}>
                              <span className="capability-item-icon" aria-hidden="true">
                                <ItemIcon size={14} strokeWidth={1.9} />
                              </span>
                              <span className="capability-item-text">{item}</span>
                              <ChevronRight size={14} strokeWidth={1.9} className="capability-item-arrow" aria-hidden="true" />
                            </li>
                          );
                        })}
                      </ul>
                    </InteractiveCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        <section className="content-band" id="why">
          <div className="container why-stage">
            <Reveal className="why-copy" direction="left">
              <p className="eyebrow">{t.whySection.label}</p>
              <h2>{t.whySection.title}</h2>
            </Reveal>
            <StaggerContainer className="why-grid" direction="right">
              {t.whySection.items.map((item, index) => (
                <StaggerItem key={item}>
                  <InteractiveCard className={`why-card why-card-${whyCardVisuals[index]?.tone || 'blue'}`}>
                    <div className="why-card-icon" aria-hidden="true">
                      {React.createElement(whyCardVisuals[index]?.icon || Sparkles, { size: 21, strokeWidth: 1.8 })}
                    </div>
                    <div className="why-card-copy">
                      <div className="why-card-head">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <strong>{item}</strong>
                      </div>
                      <div className="why-card-meter" aria-hidden="true">
                        <span style={{ width: whyCardVisuals[index]?.progress || '14%' }} />
                      </div>
                    </div>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="content-band">
          <div className="container method-stage">
            <Reveal className="method-copy" direction="left">
              <p className="eyebrow">{t.methodologySection.label}</p>
              <h2>{t.methodologySection.title}</h2>
            </Reveal>
            <StaggerContainer className="method-grid" direction="right">
              {t.methodologySection.steps.map((step, index) => (
                <StaggerItem key={step.label + step.title}>
                  <InteractiveCard className={`method-card method-card-${methodCardVisuals[index]?.tone || 'blue'}`}>
                    <div className="method-card-top">
                      <span className="method-index">{step.label}</span>
                      <div className="method-card-icon" aria-hidden="true">
                        {React.createElement(methodCardVisuals[index]?.icon || Sparkles, { size: 22, strokeWidth: 1.8 })}
                      </div>
                    </div>
                    <h3>{step.title}</h3>
                    <span className="method-card-accent" aria-hidden="true" />
                    <p>{step.body}</p>
                    <div className="method-card-meter" aria-hidden="true">
                      <span style={{ width: methodCardVisuals[index]?.progress || '14%' }} />
                    </div>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="content-band muted" id="projects">
          <div className="container">
            <SectionIntro
              label={t.projects.label}
              title={t.projects.title}
              body={t.projects.body}
              direction="left"
            />
            <StaggerContainer className="project-grid" direction="right">
              {t.projects.items.map((project, index) => (
                <StaggerItem key={project.title}>
                  <InteractiveCard className="project-card">
                    <div className={`project-visual project-visual-${index + 1}`}>
                      <span>{project.tone}</span>
                      <strong>{project.title}</strong>
                    </div>
                    <div className="project-body">
                      <h3>{project.title}</h3>
                      <p>{project.body}</p>
                      {project.href ? (
                        <SmartLink href={project.href} onNavigate={onNavigate} className="text-link">
                          {t.projects.cta}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </SmartLink>
                      ) : (
                        <span className="text-link text-link-muted">{t.projects.internalCta}</span>
                      )}
                    </div>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="content-band performance-band" id="performance">
          <div className="container performance-stage">
            <div className="performance-stage-copy">
              <SectionIntro
                label={t.performance.label}
                title={t.performance.title}
                body={t.performance.body}
                direction="up"
              />
            </div>
            <Reveal direction="up">
              <div className="performance-panel performance-panel-centered">
                <div className="performance-grid performance-grid-circles">
                  {t.performance.items.map((item) => (
                    <article key={item.value} className="performance-card">
                      <div className={`performance-ring performance-ring-${item.value.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase()}`}>
                        <strong>{item.value}</strong>
                      </div>
                      <span>{item.label}</span>
                      <p>{item.body}</p>
                      <MiniTrendChart values={item.chart} />
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Methodology ── */}
        <section className="content-band muted" id="methodology">
          <div className="container">
            <SectionIntro label={t.methodology.label} title={t.methodology.title} direction="up" />
            <StaggerContainer className="methodology-grid" direction="up">
              {t.methodology.items.map((item) => (
                <StaggerItem key={item.step}>
                  <div className="methodology-item">
                    <span className="method-step">{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="content-band contact-band" id="contact">
          <div className="container contact-grid">
            <SectionIntro
              label={t.contact.label}
              title={t.contact.title}
              body={t.contact.body}
              direction="left"
            />
            <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
              <label>
                {t.contact.name}
                <input type="text" name="name" autoComplete="name" />
              </label>
              <label>
                {t.contact.company}
                <input type="text" name="company" autoComplete="organization" />
              </label>
              <label>
                {t.contact.email}
                <input type="email" name="email" autoComplete="email" />
              </label>
              <label>
                {t.contact.needs}
                <textarea name="needs" rows="5" />
              </label>
              <button type="submit" className="button button-primary">
                {t.contact.submit}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} setLang={setLang} onNavigate={onNavigate} />
    </>
  );
}

/* Ordo */
function OrdoPage({ t, lang, setLang, onNavigate }) {
  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} onNavigate={onNavigate} />
      <main className="ordo-page">
        <section className="ordo-hero">
          <div className="container ordo-hero-grid">
            <Reveal>
              <SmartLink href="/" onNavigate={onNavigate} className="back-link">
                {t.ordo.back}
              </SmartLink>
              <p className="eyebrow">{t.ordo.label}</p>
              <img className="ordo-logo" src={ordoLogo} alt="Ordo Data" />
              <h1>{t.ordo.title}</h1>
              <p className="hero-body">{t.ordo.body}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="/#projects">
                  {t.ordo.primary}
                </a>
                <a className="button button-secondary" href="#ordo-architecture">
                  {t.ordo.secondary}
                </a>
              </div>
            </Reveal>
            <Reveal className="ordo-dashboard" direction="right">
              <img src={ordoDashboard} alt="Minerva dashboard preview" />
            </Reveal>
          </div>
        </section>

        <section className="content-band muted">
          <div className="container">
            <StaggerContainer className="ordo-pillars">
              {t.ordo.pillars.map(([title, body]) => (
                <StaggerItem key={title}>
                  <InteractiveCard className="ordo-pillar-card">
                    <article>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </article>
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <section className="content-band" id="ordo-architecture">
          <div className="container ordo-detail-grid">
            <Reveal className="ordo-image-stack">
              <img src={ordoNormalization} alt="Ordo normalization workflow" />
              <img src={ordoAi} alt="Ordo AI comparison workflow" />
            </Reveal>
            <div className="ordo-sections">
              {t.ordo.sections.map((section) => (
                <Reveal key={section.title}>
                  <article>
                    <h2>{section.title}</h2>
                    <p>{section.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} setLang={setLang} onNavigate={onNavigate} />
    </>
  );
}

/* Footer */
function Footer({ t, lang, setLang, onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <SmartLink href="/" onNavigate={onNavigate} className="brand">
          <span className="brand-mark">D</span>
          <span>DuarLabs</span>
        </SmartLink>
        <p>{new Date().getFullYear()} DuarLabs. {t.footer.rights}</p>
        <LanguageToggle lang={lang} setLang={setLang} />
      </div>
    </footer>
  );
}

/* App root */
export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('duarlabs-lang') || 'es');
  const { path, navigate } = useRoute();
  const t = useMemo(() => copy[lang], [lang]);

  useEffect(() => {
    localStorage.setItem('duarlabs-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  if (path === '/ordo-data') {
    window.location.replace('/ordo-data/index.html');
    return null;
  }

  if (path === '/ordo') {
    return <OrdoPage t={t} lang={lang} setLang={setLang} onNavigate={navigate} />;
  }

  return <HomePage t={t} lang={lang} setLang={setLang} onNavigate={navigate} />;
}
