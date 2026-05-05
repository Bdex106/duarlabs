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
  
  const xOffset = direction === 'left' ? -80 : direction === 'right' ? 80 : 0;
  const yOffset = direction === 'up' ? 80 : 0;
  
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

function StaggerItem({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

/* ── Interactive Card ── */
function InteractiveCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} className={className}>
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
        <a href="/#contact">{t.nav.contact}</a>
      </nav>
      <LanguageToggle lang={lang} setLang={setLang} />
    </header>
  );
}

/* ── Progress Bar ── */
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="progress-bar" style={{ scaleX }} />;
}

/* ── Side Nav ── */
function SideNav() {
  const sections = ['home', 'about', 'technologies', 'capabilities', 'projects', 'why'];
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

/* ── Scroll indicator ── */
function ScrollIndicator() {
  return (
    <div className="scroll-indicator">
      <div className="scroll-dot" />
    </div>
  );
}

/* ── HomePage ── */
function HomePage({ t, lang, setLang, onNavigate }) {
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      containerRef.current.style.setProperty('--x', `${e.clientX}px`);
      containerRef.current.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const update = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const total = heroRef.current.offsetHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      heroRef.current.style.setProperty('--hero-progress', String(progress));
      heroRef.current.style.setProperty('--hero-content-opacity', String(1 - Math.min(progress * 2.5, 1)));
      heroRef.current.style.setProperty('--hero-arch-opacity', String(1 - Math.min(progress * 2.8, 1)));
      heroRef.current.style.setProperty('--hero-grid-opacity', String(0.22 * (1 - Math.min(progress * 3.3, 1))));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} onNavigate={onNavigate} />
      <ProgressBar />
      <main>
        {/* ── Hero with Parallax Dissolve ── */}
        <section ref={heroRef} className="hero-parallax" id="home">
          <div className="hero-sticky">
            {/* Animated grid background */}
            <div className="hero-grid-bg" />

            {/* Corporate architecture panel */}
            <div
              className="hero-architecture"
              aria-hidden="true"
            >
              <div className="arch-panel arch-panel-main">
                <span>{t.hero.arch.discovery}</span>
                <strong>{t.hero.arch.systems}</strong>
              </div>
              <div className="arch-panel arch-panel-sub">
                <span>{t.hero.arch.automation}</span>
                <strong>{t.hero.arch.data}</strong>
              </div>
              <div className="arch-line arch-line-a" />
              <div className="arch-line arch-line-b" />
              <div className="arch-node arch-node-a" />
              <div className="arch-node arch-node-b" />
              <div className="arch-node arch-node-c" />
            </div>

            {/* Content */}
            <div className="hero-content">
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
                <a href="#contact" className="button">
                  {t.hero.secondary}
                </a>
              </div>

              <ScrollIndicator />
            </div>
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
                  <InteractiveCard className="premium-card">
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
                  </InteractiveCard>
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
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
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

        {/* ── Contact ── */}
        <section className="content-band contact-band" id="contact">
          <div className="container contact-grid">
            <SectionIntro label={t.contact.label} title={t.contact.title} body={t.contact.body} direction="left" />
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
