import React, { useEffect, useMemo, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { copy } from './content/translations.js';
import ordoLogo from './assets/ordo/logo.png';
import ordoDashboard from './assets/ordo/dashboard.png';
import ordoNormalization from './assets/ordo/normalizacion.png';
import ordoAi from './assets/ordo/ia-comparativa.png';

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

function SmartLink({ href, onNavigate, children, className, ...props }) {
  const isInternal = href?.startsWith('/');

  function handleClick(event) {
    if (href?.includes('/ordo-data/index.html')) return;
    if (!isInternal) return;
    event.preventDefault();
    onNavigate(href);
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}

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

function Header({ t, lang, setLang, onNavigate }) {
  return (
    <header className="site-header">
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

function SectionIntro({ label, title, body }) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

function HomePage({ t, lang, setLang, onNavigate }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.8,
    stiffness: 80,
    damping: 20
  });

  const archScale = useTransform(smoothProgress, [0, 0.4], [1, 1.3]);
  const archOpacity = useTransform(smoothProgress, [0, 0.35], [0.6, 0]);
  const archBlur = useTransform(smoothProgress, [0, 0.35], ["blur(0px)", "blur(20px)"]);
  const titleY = useTransform(smoothProgress, [0, 0.5], [0, -120]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} onNavigate={onNavigate} />
      <main>
        <section ref={heroRef} className="relative h-[180vh]" id="home">
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
            {/* Parallax Background Decoration */}
            <motion.div 
              style={{ scale: archScale, opacity: archOpacity, filter: archBlur }}
              className="absolute inset-0 z-0 flex items-center justify-center"
            >
              <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-br from-red-600/20 to-transparent blur-[100px] rounded-full" />
            </motion.div>

            <motion.div 
              style={{ opacity: titleOpacity, y: titleY }}
              className="hero-copy text-center z-10 max-w-4xl"
            >
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1 className="text-white text-6xl md:text-8xl font-black tracking-tighter mb-6">
                {t.hero.title}
              </h1>
              <p className="hero-slogan text-xl md:text-2xl text-zinc-400 font-light mb-8 italic">
                {t.hero.slogan}
              </p>
              <p className="hero-body text-zinc-500 max-w-2xl mx-auto mb-12">
                {t.hero.body}
              </p>
              <div className="hero-actions flex flex-wrap justify-center gap-4">
                <a className="button button-primary" href="#projects">
                  {t.hero.primary}
                </a>
                <div className="capability-status px-4 py-2 border border-white/10 rounded-full flex items-center gap-3 bg-white/5 backdrop-blur-sm">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{t.status.ready}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="content-band" id="about">
          <div className="container split">
            <SectionIntro label={t.about.label} title={t.about.title} body={t.about.body} />
            <div className="principles-list reveal">
              {t.about.principles.map((principle) => (
                <p key={principle}>{principle}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="content-band muted" id="technologies">
          <div className="container">
            <SectionIntro label={t.labels.technologies} title={t.techTitle} />
            <div className="tech-grid reveal">
              {t.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="content-band" id="capabilities">
          <div className="container">
            <SectionIntro label={t.labels.services} title={t.capabilitiesTitle} />
            <div className="card-grid reveal">
              {t.capabilities.map((capability) => (
                <article className="premium-card" key={capability.title}>
                  <p className="card-index">0{t.capabilities.indexOf(capability) + 1}</p>
                  <h3>{capability.title}</h3>
                  <p>{capability.body}</p>
                  <ul>
                    {capability.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-band muted" id="projects">
          <div className="container">
            <SectionIntro label={t.projects.label} title={t.projects.title} body={t.projects.body} />
            <div className="project-grid reveal">
              {t.projects.items.map((project, index) => (
                <article className="project-card" key={project.title}>
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
                      </SmartLink>
                    ) : (
                      <span className="text-link text-link-muted">{t.projects.internalCta}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-band" id="why">
          <div className="container split">
            <SectionIntro label={t.why.label} title={t.why.title} />
            <div className="why-grid reveal">
              {t.why.items.map((item) => (
                <div key={item}>
                  <span />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} setLang={setLang} onNavigate={onNavigate} />
    </>
  );
}

function OrdoPage({ t, lang, setLang, onNavigate }) {
  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} onNavigate={onNavigate} />
      <main className="ordo-page">
        <section className="ordo-hero">
          <div className="container ordo-hero-grid">
            <div className="reveal">
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
            </div>
            <div className="ordo-dashboard reveal">
              <img src={ordoDashboard} alt="Minerva dashboard preview" />
            </div>
          </div>
        </section>

        <section className="content-band muted">
          <div className="container">
            <div className="ordo-pillars reveal">
              {t.ordo.pillars.map(([title, body]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-band" id="ordo-architecture">
          <div className="container ordo-detail-grid">
            <div className="ordo-image-stack reveal">
              <img src={ordoNormalization} alt="Ordo normalization workflow" />
              <img src={ordoAi} alt="Ordo AI comparison workflow" />
            </div>
            <div className="ordo-sections reveal">
              {t.ordo.sections.map((section) => (
                <article key={section.title}>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} setLang={setLang} onNavigate={onNavigate} />
    </>
  );
}

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

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('duarlabs-lang') || 'es');
  const { path, navigate } = useRoute();
  const t = useMemo(() => copy[lang], [lang]);

  useEffect(() => {
    localStorage.setItem('duarlabs-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    document.body.classList.add('ready');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.14 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.body.classList.remove('ready');
    };
  }, [path, lang]);

  if (path === '/ordo-data') {
    window.location.replace('/ordo-data/index.html');
    return null;
  }

  return <HomePage t={t} lang={lang} setLang={setLang} onNavigate={navigate} />;
}
