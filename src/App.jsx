import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, BarChart3, Bell, Blocks, BrainCircuit, Building2, CalendarDays, ChevronRight, Cloud, Code2, Cpu, Database, FileSearch, Folder, Globe, GitBranch, Layers3, LayoutDashboard, Lock, Mail, Map, Monitor, MonitorSmartphone, Puzzle, Rocket, Scale, ScanSearch, ServerCog, ShieldCheck, Sparkles, Star, Target, Truck, Wrench, Workflow, Zap, Box, Menu, X } from 'lucide-react';
import { siCloudflare, siDocker, siDuckdb, siFastapi, siFlask, siNodedotjs, siOllama, siOpencv, siPandas, siPlotly, siPostgresql, siPython, siRailway, siReact, siSqlite, siStreamlit, siVite, siXyflow } from 'simple-icons';
import { copy } from './content/translations.js';
import ordoLogo from './assets/ordo/logo.png';
import DuarLabsLogoReveal from './components/DuarLabsLogoReveal.jsx';
import duarLabsMark from './img/logo.png';

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
  { label: 'Infraestructura', icon: Cloud, tone: 'blue', chips: ['Docker', 'Railway', 'Cloudflare R2'] },
  { label: 'Herramientas', icon: Wrench, tone: 'amber', chips: ['APIs / Integraciones', 'Mapas / Geoespacial'] },
];

const whyCardVisuals = [
  { icon: Blocks, tone: 'blue', progress: '12%' },
  { icon: Puzzle, tone: 'blue', progress: '18%' },
  { icon: Layers3, tone: 'teal', progress: '34%' },
  { icon: Zap, tone: 'teal', progress: '16%' },
  { icon: Star, tone: 'amber', progress: '11%' },
  { icon: ShieldCheck, tone: 'amber', progress: '15%' },
];

const methodCardVisuals = [
  { icon: ScanSearch, tone: 'blue', progress: '12%' },
  { icon: Blocks, tone: 'amber', progress: '18%' },
  { icon: Code2, tone: 'teal', progress: '16%' },
  { icon: Rocket, tone: 'violet', progress: '14%' },
];

const headerNavIcons = {
  about: Building2,
  presentation: BrainCircuit,
  technology: Code2,
  capabilities: Blocks,
  projects: Folder,
  why: Scale,
  performance: BarChart3,
  methodology: Layers3,
  contact: Mail,
};

const projectCardVisuals = [
  { icon: Truck, tone: 'amber' },
  { icon: ShieldCheck, tone: 'blue' },
  { icon: Database, tone: 'violet' },
  { icon: FileSearch, tone: 'amber' },
  { icon: Workflow, tone: 'blue' },
  { icon: GitBranch, tone: 'violet' },
];

const presentationConceptVisuals = [
  { icon: ScanSearch, tone: 'cyan' },
  { icon: Blocks, tone: 'violet' },
  { icon: BrainCircuit, tone: 'violet' },
  { icon: Map, tone: 'gold' },
];

const presentationKeywordVisuals = [
  { icon: Database, tone: 'cyan' },
  { icon: Workflow, tone: 'cyan' },
  { icon: GitBranch, tone: 'violet' },
  { icon: Layers3, tone: 'violet' },
  { icon: ScanSearch, tone: 'cyan' },
  { icon: ArrowRight, tone: 'gold' },
  { icon: Zap, tone: 'gold' },
  { icon: Blocks, tone: 'violet' },
];

const presentationFlowVisuals = {
  source: { topIcon: Database, metaIcon: Database, tone: 'cyan' },
  process: { topIcon: BrainCircuit, metaIcon: Target, tone: 'pink' },
  analysis: { topIcon: Box, metaIcon: BarChart3, tone: 'violet' },
  reports: { topIcon: Monitor, metaIcon: Bell, tone: 'indigo' },
};

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
function HeroSceneChart({ className, color = '#b06cff' }) {
  return (
    <div className={className} aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 240 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${className}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <g opacity="0.16" stroke={color} strokeWidth="0.5">
          <path d="M0 24H240" />
          <path d="M0 54H240" />
          <path d="M0 84H240" />
          <path d="M0 114H240" />
          <path d="M40 0V120" />
          <path d="M80 0V120" />
          <path d="M120 0V120" />
          <path d="M160 0V120" />
          <path d="M200 0V120" />
        </g>
        <motion.path
          d="M0,103 C16,103 18,103 30,90 C42,77 56,74 72,86 C85,96 97,98 110,82 C127,62 138,56 154,79 C168,98 180,102 196,84 C214,63 223,44 240,16 L240,120 L0,120 Z"
          fill={`url(#grad-${className})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,103 C16,103 18,103 30,90 C42,77 56,74 72,86 C85,96 97,98 110,82 C127,62 138,56 154,79 C168,98 180,102 196,84 C214,63 223,44 240,16"
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
        <circle cx="240" cy="16" r="4.2" fill={color} />
      </svg>
    </div>
  );
}

/* ── Header ── */
function Header({ t, lang, setLang, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navTargets = t.nav.items.map((item) => item.href.split('#')[1]).filter(Boolean);
  const [activeSection, setActiveSection] = useState(() => window.location.hash?.slice(1) || navTargets[0] || 'home');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (!navTargets.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.35, 0.55, 0.75] }
    );

    navTargets.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [navTargets]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    }

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <SmartLink href="/" onNavigate={onNavigate} className="brand" aria-label="DuarLabs home">
          <span className="brand-mark">
            <img src={duarLabsMark} alt="" className="brand-mark-image" aria-hidden="true" />
          </span>
          <span className="brand-copy">
            <strong>DuarLabs</strong>
            <small>{lang === 'es' ? 'Inteligencia operativa' : 'Operational intelligence'}</small>
          </span>
        </SmartLink>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {t.nav.items.map((item) => {
            const sectionId = item.href.split('#')[1];
            const Icon = headerNavIcons[sectionId] || Sparkles;
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.label}
                href={item.href}
                className={isActive ? 'is-active' : ''}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setActiveSection(sectionId)}
                title={item.meta}
              >
                <span className="desktop-nav-icon" aria-hidden="true">
                  <Icon size={17} strokeWidth={1.75} />
                </span>
                <span className="desktop-nav-label">{item.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="header-controls">
          <LanguageToggle lang={lang} setLang={setLang} />
          <button
            type="button"
            className={`mobile-nav-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
            aria-label={mobileMenuOpen ? (lang === 'es' ? 'Cerrar menú' : 'Close menu') : (lang === 'es' ? 'Abrir menú' : 'Open menu')}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
          </button>
        </div>
      </header>

      <div
        className={`mobile-nav-backdrop ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />

      <nav
        id="mobile-nav-panel"
        className={`mobile-nav-panel ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-label={lang === 'es' ? 'Navegación móvil' : 'Mobile navigation'}
      >
        {t.nav.items.map((item) => {
          const sectionId = item.href.split('#')[1];
          const Icon = headerNavIcons[sectionId] || Sparkles;
          const isActive = activeSection === sectionId;

          return (
            <a
              key={item.label}
              href={item.href}
              className={isActive ? 'is-active' : ''}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => {
                setActiveSection(sectionId);
                setMobileMenuOpen(false);
              }}
            >
              <span className="mobile-nav-icon" aria-hidden="true">
                <Icon size={17} strokeWidth={1.75} />
              </span>
              <span className="mobile-nav-copy">
                <strong>{item.label}</strong>
                <small>{item.meta}</small>
              </span>
            </a>
          );
        })}
      </nav>
    </>
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
  const sections = ['home', 'about', 'presentation', 'technology', 'capabilities', 'projects', 'why', 'performance', 'methodology', 'contact'];
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
function SectionIntro({ label, title, titleNode, body, direction = 'up' }) {
  return (
    <Reveal className="section-intro" direction={direction}>
      <p className="eyebrow">{label}</p>
      <h2>{titleNode || title}</h2>
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

  const presentationNodes = ['source', 'process', 'analysis', 'reports']
    .map((key) => {
      const node = t.presentation.boardNodes.find((item) => item.key === key);
      const visual = presentationFlowVisuals[key];

      if (!node || !visual) return null;

      return { ...node, ...visual };
    })
    .filter(Boolean);

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
              <div className="arch-panel arch-panel-main">
                <div className="arch-card-icon">
                  <Layers3 size={34} strokeWidth={1.8} />
                </div>
                <div className="arch-card-copy">
                  <div className="arch-panel-header">
                    <span>{t.hero.panels[0].tag}</span>
                    <div className="arch-status-pill">
                      <div className="arch-status-dot" />
                      {t.hero.panels[0].status}
                    </div>
                  </div>
                  <strong>{t.hero.arch.systems}</strong>
                  <div className="arch-card-meter">
                    <i />
                  </div>
                </div>
              </div>

              <div className="arch-connector">
                <div className="arch-line arch-line-a" />
                <div className="arch-line arch-line-b" />
                <div className="arch-node arch-node-a" />
                <div className="arch-node arch-node-b" />
                <div className="arch-node arch-node-c" />
                <div className="arch-node arch-node-d" />
              </div>

              <div className="arch-panel arch-panel-sub">
                <div className="arch-card-icon">
                  <Database size={30} strokeWidth={1.9} />
                </div>
                <div className="arch-card-copy">
                  <div className="arch-panel-header">
                    <span>{t.hero.panels[1].tag}</span>
                    <div className="arch-status-pill">
                      <div className="arch-status-dot" />
                      {t.hero.panels[1].status}
                    </div>
                  </div>
                  <strong>{t.hero.arch.data}</strong>
                  <div className="arch-card-meter">
                    <i />
                  </div>
                </div>
              </div>

              <HeroSceneChart className="arch-chart-violet" color="#a855f7" />
            </motion.div>

        {/* Content */}
        <motion.div 
          className="hero-content"
          style={{ opacity: heroContentOpacity, y: heroContentY }}
        >
          <p className="eyebrow">
            {t.hero.eyebrow}
          </p>

          {/* LOGO PRINCIPAL — EFECTO LÁSER / GLITCH DIGITAL */}
          <DuarLabsLogoReveal text={t.hero.title} />

          <p className="hero-slogan">
            {t.hero.slogan}
          </p>

          <p className="hero-body">
            {t.hero.body}
          </p>

          <div className="hero-actions">
            <a href="#projects" className="button button-primary">
              <span>{t.hero.primary}</span>
              <ArrowRight size={18} strokeWidth={1.8} />
            </a>

            <a href="#contact" className="button button-secondary">
              {t.hero.secondary}
            </a>
          </div>
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
              {/* Panel principal: flujo de decisión */}
              <div className="reference-flow-panel">
                <div className="reference-flow-stage" aria-hidden="true">
                  <div className="reference-flow-dots reference-flow-dots-left">
                    <span /><span /><span /><span /><span /><span /><span /><span />
                  </div>

                  <div className="reference-flow-dots reference-flow-dots-right">
                    <span /><span /><span /><span /><span /><span /><span /><span />
                  </div>

                  <div className="reference-flow-track" />

                  {/* Flechas de unión */}
                  <div className="reference-flow-connector reference-flow-connector-source"><span /></div>
                  <div className="reference-flow-connector reference-flow-connector-process"><span /></div>
                  <div className="reference-flow-connector reference-flow-connector-analysis"><span /></div>

                  {/* Nodos principales */}
                  {presentationNodes.map((node) => {
                    const TopIcon = node.topIcon;
                    const MetaIcon = node.metaIcon;

                    return (
                      <div
                        key={node.key}
                        className={`reference-flow-node reference-flow-node-${node.key} reference-flow-tone-${node.tone}`}
                      >
                        <div className="reference-flow-diamond">
                          <div className="reference-flow-diamond-inner">
                            <TopIcon className="reference-flow-icon" size={40} strokeWidth={1.9} />
                            <strong>{node.label}</strong>
                          </div>
                        </div>

                        <div className="reference-flow-meta">
                          <span className="reference-flow-meta-line" />
                          <div className="reference-flow-meta-orb">
                            <MetaIcon size={24} strokeWidth={1.9} />
                          </div>
                          <div className="reference-flow-meta-copy">
                            <strong>{node.caption}</strong>
                            <small>{node.meta}</small>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <div className="presentation-support-grid">
              <Reveal direction="left">
                {/* Panel izquierdo: enfoque de implementación */}
                <InteractiveCard className="presentation-panel presentation-detail-card presentation-detail-card-left">
                  <div className="presentation-panel-head">
                    <div className="presentation-panel-icon presentation-panel-icon-cyan" aria-hidden="true">
                      <ScanSearch size={23} strokeWidth={1.9} />
                    </div>
                    <div className="presentation-panel-titleblock">
                      <p className="presentation-panel-label">{t.presentation.scriptLabel}</p>
                      <span className="presentation-panel-line presentation-panel-line-cyan" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="presentation-concept-list">
                    {t.presentation.concepts.map((concept, index) => {
                      const visual = presentationConceptVisuals[index] || presentationConceptVisuals[0];
                      const ConceptIcon = visual.icon;

                      return (
                        <article
                          className={`presentation-concept-row presentation-concept-row-${visual.tone}`}
                          key={concept.title}
                        >
                          <span className={`presentation-concept-index presentation-concept-index-${visual.tone}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          <div className={`presentation-concept-icon presentation-concept-icon-${visual.tone}`} aria-hidden="true">
                            <ConceptIcon size={22} strokeWidth={1.9} />
                          </div>

                          <div className="presentation-concept-copy">
                            <h3>{concept.title}</h3>
                            <p>{concept.body}</p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </InteractiveCard>
              </Reveal>

              <Reveal direction="right">
                {/* Panel derecho: áreas de capacidad */}
                <InteractiveCard className="presentation-panel presentation-detail-card presentation-detail-card-right">
                  <div className="presentation-panel-head">
                    <div className="presentation-panel-icon presentation-panel-icon-violet" aria-hidden="true">
                      <BrainCircuit size={23} strokeWidth={1.9} />
                    </div>
                    <div className="presentation-panel-titleblock">
                      <p className="presentation-panel-label">{t.presentation.keywordsLabel}</p>
                      <span className="presentation-panel-line presentation-panel-line-violet" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="presentation-chip-grid">
                    {t.presentation.keywords.map((keyword, index) => {
                      const visual = presentationKeywordVisuals[index] || presentationKeywordVisuals[0];
                      const KeywordIcon = visual.icon;

                      return (
                        <span key={keyword} className={`presentation-chip presentation-chip-${visual.tone}`}>
                          <span className="presentation-chip-icon" aria-hidden="true">
                            <KeywordIcon size={18} strokeWidth={1.9} />
                          </span>
                          <span>{keyword}</span>
                        </span>
                      );
                    })}
                  </div>
                </InteractiveCard>
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
                  <InteractiveCard className={`project-card project-card-${projectCardVisuals[index]?.tone || 'blue'}`}>
                    <div className="project-card-shell">
                      <div className="project-card-head">
                        <div className="project-card-icon" aria-hidden="true">
                          {React.createElement(projectCardVisuals[index]?.icon || Building2, { size: 30, strokeWidth: 1.8 })}
                        </div>
                        <span className="project-card-meta">{project.tone}</span>
                      </div>
                      <div className="project-body">
                        <h3 className="project-card-title">{project.title}</h3>
                        <p className="project-card-copy">{project.body}</p>
                      </div>
                      <div className="project-card-footer">
                        {project.href ? (
                          <SmartLink href={project.href} onNavigate={onNavigate} className="text-link project-card-link">
                            {t.projects.cta}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                          </SmartLink>
                        ) : (
                          <span className="text-link project-card-link text-link-muted">{t.projects.internalCta}</span>
                        )}
                        <span className="project-card-link-line" aria-hidden="true" />
                      </div>
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
  <div className="container method-stage">
    <SectionIntro
      label={t.methodology.label}
      title={t.methodology.title}
      direction="up"
    />

    <StaggerContainer className="method-grid" direction="up">
      {t.methodology.items.map((item, index) => (
        <StaggerItem key={item.step}>
          <InteractiveCard className={`method-card method-card-${methodCardVisuals[index]?.tone || 'blue'}`}>
            
            {/* Parte superior: número + icono */}
            <div className="method-card-top">
              <span className="method-index">{item.step}</span>

              <div className="method-card-icon" aria-hidden="true">
                {React.createElement(methodCardVisuals[index]?.icon || Sparkles, {
                  size: 22,
                  strokeWidth: 1.8,
                })}
              </div>
            </div>

            {/* Texto de la tarjeta */}
            <h3>{item.title}</h3>

            {/* Línea pequeña debajo del título */}
            <span className="method-card-accent" aria-hidden="true" />

            <p>{item.body}</p>

            {/* Línea inferior brillante */}
            <div className="method-card-meter" aria-hidden="true">
              <span style={{ width: methodCardVisuals[index]?.progress || '14%' }} />
            </div>
          </InteractiveCard>
        </StaggerItem>
      ))}
    </StaggerContainer>
  </div>
</section>

        {/* ── Contact ── */}
        <section className="content-band contact-band" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <SectionIntro
                label={t.contact.label}
                title={t.contact.title}
                titleNode={
                  lang === 'es' ? (
                    <>
                      Hablemos de
                      <br />
                      un sistema
                      <br />
                      que valga la
                      <br />
                      <span className="contact-title-accent">inversion.</span>
                    </>
                  ) : (
                    <>
                      Let us discuss
                      <br />
                      a system worth
                      <br />
                      the
                      <br />
                      <span className="contact-title-accent">investment.</span>
                    </>
                  )
                }
                body={t.contact.body}
                direction="left"
              />

              {/* Tarjetas informativas del contacto */}
              <div className="contact-benefits">
                <div className="contact-benefit contact-benefit-cyan">
                  <span aria-hidden="true">
                    <MonitorSmartphone />
                  </span>
                  <div>
                    <strong>Respuesta rápida</strong>
                    <p>Te respondemos en menos de 24 horas hábiles.</p>
                  </div>
                </div>

                <div className="contact-benefit contact-benefit-violet">
                  <span aria-hidden="true">
                    <ShieldCheck />
                  </span>
                  <div>
                    <strong>Confidencialidad</strong>
                    <p>Tu información está 100% protegida con nosotros.</p>
                  </div>
                </div>

                <div className="contact-benefit contact-benefit-gold">
                  <span aria-hidden="true">
                    <CalendarDays />
                  </span>
                  <div>
                    <strong>Reuniones estratégicas</strong>
                    <p>Agendamos una llamada para entender tu caso a fondo.</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
              <label>
                {t.contact.name}
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Tu nombre completo"
                />
              </label>

              <label>
                {t.contact.company}
                <input
                  type="text"
                  name="company"
                  autoComplete="organization"
                  placeholder="Nombre de tu empresa"
                />
              </label>

              <label>
                {t.contact.email}
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="tu@empresa.com"
                />
              </label>

              <label>
                {t.contact.needs}
                <textarea
                  name="needs"
                  rows="5"
                  placeholder="Cuéntanos brevemente tu necesidad o el reto que quieres resolver..."
                />
              </label>

              <button type="submit" className="button button-primary">
                {t.contact.submit}
                <span className="contact-submit-arrow">→</span>
              </button>

              {/* Nota de privacidad debajo del botón */}
              <p className="contact-privacy">
                <Lock aria-hidden="true" />
                Tu información está protegida y no será compartida.
              </p>
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
          <span className="brand-mark">
            <img src={duarLabsMark} alt="" className="brand-mark-image" aria-hidden="true" />
          </span>
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
