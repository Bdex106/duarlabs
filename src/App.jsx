import React, { useEffect, useMemo, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { copy } from './content/translations.js';
import ordoLogo from './assets/ordo/logo.png';
import ordoDashboard from './assets/ordo/dashboard.png';
import ordoNormalization from './assets/ordo/normalizacion.png';
import ordoAi from './assets/ordo/ia-comparativa.png';

/* ── Routing ── */
function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  function navigate(href) {
    if (href.startsWith('http') || href.startsWith('#')) return;
    window.history.pushState({}, '', href);
    setPath(window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return { path, navigate };
}

/* ── Scroll-linked reveal with lateral convergence ── */
function Reveal({ children, className = '', direction = 'up' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.6'],
  });
  const smooth = useSpring(scrollYProgress, { mass: 0.6, stiffness: 100, damping: 24 });
  
  // Transform values based on direction
  const xOffset = direction === 'left' ? -80 : direction === 'right' ? 80 : 0;
  const yOffset = direction === 'up' ? 50 : 0;
  
  const x = useTransform(smooth, [0, 1], [xOffset, 0]);
  const y = useTransform(smooth, [0, 1], [yOffset, 0]);
  const opacity = useTransform(smooth, [0, 1], [0, 1]);
  const scale = useTransform(smooth, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, x, y, scale, hide: { opacity: 0 }, willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger container with spatial integration ── */
function StaggerContainer({ children, className = '', direction = 'right' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.5'],
  });
  const smooth = useSpring(scrollYProgress, { mass: 0.8, stiffness: 80, damping: 22 });
  
  const xOffset = direction === 'left' ? -100 : direction === 'right' ? 100 : 0;
  const x = useTransform(smooth, [0, 1], [xOffset, 0]);
  const opacity = useTransform(smooth, [0, 1], [0, 1]);
  const scale = useTransform(smooth, [0, 1], [0.9, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, x, scale, willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger items (static, parent handles scroll) ── */
function StaggerItem({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

/* ── SmartLink ── */
function SmartLink({ href, onNavigate, children, className, ...props }) {
  const isExternal = href?.startsWith('http');
  const isStaticFile = href?.includes('/ordo-data/');

  function handleClick(event) {
    if (isExternal || isStaticFile) return; // let the browser handle it
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

/* ── Language Toggle ── */
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

/* ── Header ── */
function Header({ t, lang, setLang, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
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
        <a href="/#projects">{t.nav.work}</a>
        <a href="/#capabilities">{t.nav.capabilities}</a>
        <a href="/#why">{t.nav.why}</a>
      </nav>
      <LanguageToggle lang={lang} setLang={setLang} />
    </header>
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

/* ── Scroll indicator ── */
function ScrollIndicator() {
  return (
    <motion.div
      className="scroll-indicator"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <motion.div
        className="scroll-dot"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

/* ── HomePage ── */
function HomePage({ t, lang, setLang, onNavigate }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.8,
    stiffness: 80,
    damping: 20,
  });

  const orbScale = useTransform(smoothProgress, [0, 0.4], [1, 1.4]);
  const orbOpacity = useTransform(smoothProgress, [0, 0.35], [0.5, 0]);
  const orbBlur = useTransform(smoothProgress, [0, 0.35], ['blur(0px)', 'blur(30px)']);
  const titleY = useTransform(smoothProgress, [0, 0.5], [0, -140]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const gridOpacity = useTransform(smoothProgress, [0, 0.3], [0.4, 0]);

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} onNavigate={onNavigate} />
      <main>
        {/* ── Hero with Parallax Dissolve ── */}
        <section ref={heroRef} className="hero-parallax" id="home">
          <div className="hero-sticky">
            {/* Animated grid background */}
            <motion.div className="hero-grid-bg" style={{ opacity: gridOpacity }} />

            {/* Parallax orbs */}
            <motion.div
              className="hero-orb hero-orb-1"
              style={{ scale: orbScale, opacity: orbOpacity, filter: orbBlur }}
            />
            <motion.div
              className="hero-orb hero-orb-2"
              style={{ scale: orbScale, opacity: orbOpacity, filter: orbBlur }}
            />

            {/* Content */}
            <motion.div
              className="hero-content"
              style={{ opacity: titleOpacity, y: titleY }}
            >
              <motion.p
                className="eyebrow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {t.hero.eyebrow}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {t.hero.title}
              </motion.h1>

              <motion.p
                className="hero-slogan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
              >
                {t.hero.slogan}
              </motion.p>

              <motion.p
                className="hero-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                {t.hero.body}
              </motion.p>

              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6 }}
              >
                <a className="button button-primary" href="#projects">
                  {t.hero.primary}
                </a>
                <div className="status-pill">
                  <span className="status-dot" />
                  <span>{t.status.ready}</span>
                </div>
              </motion.div>
            </motion.div>

            <ScrollIndicator />
          </div>
        </section>

        {/* ── Metrics Console ── */}
        <section className="content-band" id="about">
          <div className="container">
            <div className="metrics-row">
              <SectionIntro label={t.about.label} title={t.about.title} body={t.about.body} direction="left" />
              <StaggerContainer className="console-strip" direction="right">
                {t.metrics.map(([title, body]) => (
                  <StaggerItem key={title} className="metric-card">
                    <span className="metric-label">{title}</span>
                    <p>{body}</p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <Reveal delay={0.2}>
              <div className="principles-list">
                {t.about.principles.map((principle) => (
                  <p key={principle}>{principle}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Technologies ── */}
        <section className="content-band muted" id="technologies">
          <div className="container">
            <SectionIntro label={t.labels.technologies} title={t.techTitle} direction="left" />
            <StaggerContainer className="tech-grid" direction="right">
              {t.technologies.map((tech) => (
                <StaggerItem key={tech}>
                  <span className="tech-chip">{tech}</span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── Capabilities ── */}
        <section className="content-band" id="capabilities">
          <div className="container">
            <SectionIntro label={t.labels.services} title={t.capabilitiesTitle} direction="left" />
            <StaggerContainer className="card-grid" direction="right">
              {t.capabilities.map((capability, i) => (
                <StaggerItem key={capability.title}>
                  <article className="premium-card">
                    <div className="card-header">
                      <p className="card-index">0{i + 1}</p>
                      <div className="card-glow" />
                    </div>
                    <h3>{capability.title}</h3>
                    <p>{capability.body}</p>
                    <ul>
                      {capability.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── Projects ── */}
        <section className="content-band muted" id="projects">
          <div className="container">
            <SectionIntro label={t.projects.label} title={t.projects.title} body={t.projects.body} direction="left" />
            <StaggerContainer className="project-grid" direction="right">
              {t.projects.items.map((project, index) => (
                <StaggerItem key={project.title}>
                  <article className="project-card">
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
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                        </SmartLink>
                      ) : (
                        <span className="text-link text-link-muted">{t.projects.internalCta}</span>
                      )}
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── Why ── */}
        <section className="content-band" id="why">
          <div className="container split">
            <SectionIntro label={t.why.label} title={t.why.title} direction="left" />
            <StaggerContainer className="why-grid" direction="right">
              {t.why.items.map((item, i) => (
                <StaggerItem key={item}>
                  <div className="why-item">
                    <span className="why-index">0{i + 1}</span>
                    <span className="why-text">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} setLang={setLang} onNavigate={onNavigate} />
    </>
  );
}

/* ── OrdoPage ── */
function OrdoPage({ t, lang, setLang, onNavigate }) {
  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} onNavigate={onNavigate} />
      <main className="ordo-page">
        <section className="ordo-hero">
          <div className="container ordo-hero-grid">
            <Reveal>
              <SmartLink href="/" onNavigate={onNavigate} className="back-link">
                ← {t.ordo.back}
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
            <Reveal delay={0.2} className="ordo-dashboard">
              <img src={ordoDashboard} alt="Minerva dashboard preview" />
            </Reveal>
          </div>
        </section>

        <section className="content-band muted">
          <div className="container">
            <StaggerContainer className="ordo-pillars">
              {t.ordo.pillars.map(([title, body]) => (
                <StaggerItem key={title}>
                  <article>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </article>
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
              {t.ordo.sections.map((section, i) => (
                <Reveal key={section.title} delay={i * 0.1}>
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

/* ── Footer ── */
function Footer({ t, lang, setLang, onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <SmartLink href="/" onNavigate={onNavigate} className="brand">
          <span className="brand-mark">D</span>
          <span>DuarLabs</span>
        </SmartLink>
        <p>© {new Date().getFullYear()} DuarLabs. {t.footer.rights}</p>
        <LanguageToggle lang={lang} setLang={setLang} />
      </div>
    </footer>
  );
}

/* ── App Root ── */
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

  return <HomePage t={t} lang={lang} setLang={setLang} onNavigate={navigate} />;
}
