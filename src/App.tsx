import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Palette,
  Send,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const skills = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'CSS / Sass'] },
  { category: 'Backend', items: ['Node.js', 'REST APIs', 'PostgreSQL', 'Python'] },
  { category: 'Product & tools', items: ['Figma', 'Git', 'Docker', 'AWS'] },
]

const projects = [
  {
    number: '01',
    title: 'Northstar',
    type: 'PRODUCTIVITY · CONCEPT PROJECT',
    description:
      'A calm workspace for teams to collect ideas, organize work, and keep moving in the same direction.',
    stack: ['React', 'TypeScript', 'Node.js'],
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'A warm, minimal desk setup with a laptop',
    theme: 'project-image--northstar',
    github: 'https://github.com/',
    demo: 'https://example.com/',
  },
  {
    number: '02',
    title: 'Fieldnotes',
    type: 'CREATOR TOOLS · CONCEPT PROJECT',
    description:
      'A simple publishing space designed to help independent makers turn rough notes into clear stories.',
    stack: ['Next.js', 'Prisma', 'PostgreSQL'],
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'An open notebook and pen on a wooden desk',
    theme: 'project-image--fieldnotes',
    github: 'https://github.com/',
    demo: 'https://example.com/',
  },
  {
    number: '03',
    title: 'Goodwell',
    type: 'HEALTH & WELLNESS · CONCEPT PROJECT',
    description:
      'A friendly habit-tracking experience that makes small everyday routines feel achievable and rewarding.',
    stack: ['React', 'Supabase', 'Tailwind'],
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Colorful art materials arranged on a studio table',
    theme: 'project-image--goodwell',
    github: 'https://github.com/',
    demo: 'https://example.com/',
  },
]

const timeline = [
  {
    kind: 'EXPERIENCE',
    date: '2022 — PRESENT',
    title: 'Software Engineer',
    place: 'Example Studio · Remote',
    description:
      'Building thoughtful web experiences and helping a small team turn early product ideas into reliable software.',
    current: true,
  },
  {
    kind: 'EDUCATION',
    date: '2018 — 2022',
    title: 'B.S. Computer Science',
    place: 'Example University',
    description:
      'Coursework in software engineering, human-computer interaction, and systems design.',
    current: false,
  },
]

const services = [
  {
    icon: Code2,
    number: '01',
    title: 'Web development',
    description: 'Fast, accessible websites and web apps that feel great on every screen.',
  },
  {
    icon: Braces,
    number: '02',
    title: 'Software development',
    description: 'Practical, maintainable software shaped around real product needs.',
  },
  {
    icon: Palette,
    number: '03',
    title: 'UI / UX design',
    description: 'Clear, considered interfaces that make complex things feel simple.',
  },
]

const enterView = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="section-label">
      <span aria-hidden="true" />
      {children}
    </p>
  )
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`social-links${compact ? ' social-links--compact' : ''}`}>
      <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub profile">
        <Github size={18} aria-hidden="true" />
        {!compact && <span>GitHub</span>}
      </a>
      <a
        href="https://www.linkedin.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn profile"
      >
        <Linkedin size={18} aria-hidden="true" />
        {!compact && <span>LinkedIn</span>}
      </a>
    </div>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') === 'dark'
    } catch {
      return false
    }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const [copied, setCopied] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      darkMode ? '#171813' : '#f7f6f2',
    )
    try {
      localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light')
    } catch {
      // Theme still works for this visit if storage is unavailable.
    }
  }, [darkMode])

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => document.body.classList.remove('menu-is-open')
  }, [menuOpen])

  const reveal = reduceMotion ? {} : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.16 } }

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`)
    setFormStatus('Opening your email app with your message. Thanks for reaching out!')
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`
    event.currentTarget.reset()
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('hello@example.com')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = 'mailto:hello@example.com'
    }
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Alex Morgan home">
          <span className="brand-mark">A<span>.</span></span>
          <span className="brand-name">ALEX MORGAN</span>
        </a>

        <nav id="main-navigation" className={`main-nav${menuOpen ? ' main-nav--open' : ''}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>
            Let&apos;s talk <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setDarkMode((value) => !value)}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <motion.div
              className="availability"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="availability-dot" />
              AVAILABLE FOR SELECT PROJECTS
            </motion.div>
            <motion.h1
              id="hero-title"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
            >
              Building
              <br />
              <span className="hero-accent">useful things</span>
              <br />
              for the web<span className="hero-period">.</span>
            </motion.h1>
            <motion.p
              className="hero-intro"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
            >
              I&apos;m Alex — a software engineer and technology entrepreneur turning good ideas
              into thoughtful digital products.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <a className="button button--dark" href="#work">
                Explore my work <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a className="button button--quiet" href="#contact">
                Get in touch <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </motion.div>
            <motion.div
              className="hero-socials"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.62 }}
            >
              <SocialLinks />
            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <div className="hero-photo-wrap">
              <img
                className="hero-photo"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85"
                alt="Portrait representing Alex Morgan, portfolio sample content"
              />
              <div className="photo-stamp">
                <Sparkles size={15} aria-hidden="true" />
                <span>Curious by nature<br />Builder by choice</span>
              </div>
            </div>
            <div className="hero-note">
              <span>BASED IN</span>
              <strong>Somewhere on Earth <Globe2 size={14} aria-hidden="true" /></strong>
            </div>
            <div className="hero-index">PORTFOLIO · {new Date().getFullYear()}</div>
          </motion.div>

          <a className="scroll-cue" href="#about" aria-label="Scroll to About section">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </section>

        <section className="about-section section-wrap section-pad" id="about" aria-labelledby="about-title">
          <motion.div className="about-aside" {...reveal} variants={enterView}>
            <SectionLabel>01 / A LITTLE ABOUT ME</SectionLabel>
            <div className="about-aside-mark" aria-hidden="true">A<span>.</span></div>
            <p className="aside-caption">GOOD WORK STARTS<br />WITH GOOD QUESTIONS.</p>
          </motion.div>
          <motion.div className="about-content" {...reveal} variants={enterView}>
            <h2 className="section-heading" id="about-title">
              Engineer by trade.<br />
              <span>Builder at heart.</span>
            </h2>
            <p className="about-lead">
              I like making technology feel a little more human.
            </p>
            <p className="body-copy">
              I&apos;m a software engineer with a soft spot for the messy, exciting early stages of
              making something new. I work across the stack, enjoy collaborating with thoughtful
              people, and care about the details that make a product genuinely useful.
            </p>
            <p className="body-copy">
              Outside of code, you&apos;ll find me collecting ideas, learning how businesses grow,
              and making time for a good book or a long walk. My goal is to build useful products
              with kind people — and keep getting a little better at the craft along the way.
            </p>
            <a className="text-link" href="#experience">
              A bit more about my journey <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </section>

        <section className="skills-section section-wrap section-pad" aria-labelledby="skills-title">
          <motion.div className="section-topline" {...reveal} variants={enterView}>
            <SectionLabel>02 / WHAT I BRING</SectionLabel>
            <span className="topline-note">A TOOLBOX, ALWAYS IN PROGRESS</span>
          </motion.div>
          <div className="skills-heading-row">
            <motion.h2 className="section-heading" id="skills-title" {...reveal} variants={enterView}>
              Skills &amp; <span>toolkit.</span>
            </motion.h2>
            <motion.p className="skills-intro body-copy" {...reveal} variants={enterView}>
              The tools change. The curiosity stays. Here&apos;s what I&apos;m working with these days.
            </motion.p>
          </div>
          <div className="skills-grid">
            {skills.map((group, index) => (
              <motion.div
                className="skill-group"
                key={group.category}
                {...reveal}
                variants={enterView}
                transition={{ delay: index * 0.08 }}
              >
                <span className="skill-number">0{index + 1}</span>
                <h3>{group.category}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="work-section section-wrap section-pad" id="work" aria-labelledby="work-title">
          <motion.div className="section-topline" {...reveal} variants={enterView}>
            <SectionLabel>03 / SELECTED WORK</SectionLabel>
            <span className="topline-note">A FEW IDEAS BROUGHT TO LIFE</span>
          </motion.div>
          <motion.div className="work-heading-row" {...reveal} variants={enterView}>
            <h2 className="section-heading" id="work-title">
              Things I&apos;ve <span>made.</span>
            </h2>
            <p className="body-copy work-heading-note">
              A collection of sample concepts. Each one starts with a small question and a lot of
              curiosity.
            </p>
          </motion.div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <motion.article
                className={`project-card ${index === 0 ? 'project-card--featured' : ''}`}
                key={project.title}
                {...reveal}
                variants={enterView}
                transition={{ delay: index * 0.08 }}
              >
                <div className={`project-image ${project.theme}`}>
                  <img src={project.image} alt={project.imageAlt} loading="lazy" />
                  <span className="project-number">{project.number}</span>
                  <a
                    className="project-view"
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.title} live demo`}
                  >
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </a>
                </div>
                <div className="project-info">
                  <div className="project-meta">
                    <span>{project.type}</span>
                    <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub repository`}>
                      <Github size={17} aria-hidden="true" />
                    </a>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="tech-list" aria-label="Technologies used">
                    {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="placeholder-note">
            <Sparkles size={14} aria-hidden="true" />
            Sample projects and links — replace with your own work before publishing.
          </p>
        </section>

        <section className="experience-section section-wrap section-pad" id="experience" aria-labelledby="experience-title">
          <motion.div className="experience-intro" {...reveal} variants={enterView}>
            <SectionLabel>04 / THE JOURNEY SO FAR</SectionLabel>
            <h2 className="section-heading" id="experience-title">
              Learning by <span>doing.</span>
            </h2>
            <p className="body-copy">
              Every role, class, and side project is another chance to get a little better.
            </p>
            <a className="text-link" href="#contact">
              Let&apos;s add a chapter <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
          <div className="timeline">
            {timeline.map((item, index) => (
              <motion.article
                className="timeline-item"
                key={item.title}
                {...reveal}
                variants={enterView}
                transition={{ delay: index * 0.12 }}
              >
                <div className="timeline-marker" aria-hidden="true"><span /></div>
                <div className="timeline-content">
                  <div className="timeline-meta">
                    <span>{item.kind}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="timeline-place">{item.place}</p>
                  <p className="body-copy">{item.description}</p>
                  {item.current && <span className="current-badge"><span /> CURRENTLY</span>}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="services-section section-wrap section-pad" aria-labelledby="services-title">
          <motion.div className="section-topline" {...reveal} variants={enterView}>
            <SectionLabel>05 / HOW I CAN HELP</SectionLabel>
            <span className="topline-note">GOOD IDEAS, MEET GOOD EXECUTION</span>
          </motion.div>
          <motion.div className="services-heading" {...reveal} variants={enterView}>
            <h2 className="section-heading" id="services-title">
              Let&apos;s make <span>something matter.</span>
            </h2>
            <p className="body-copy">
              From first sketch to final polish, I help bring digital ideas into the world.
            </p>
          </motion.div>
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.article
                  className="service-card"
                  key={service.number}
                  {...reveal}
                  variants={enterView}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="service-card-top">
                    <span>{service.number}</span>
                    <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ArrowDownRight className="service-arrow" size={20} aria-hidden="true" />
                </motion.article>
              )
            })}
          </div>
        </section>

        <section className="contact-section section-wrap section-pad" id="contact" aria-labelledby="contact-title">
          <motion.div className="contact-intro" {...reveal} variants={enterView}>
            <SectionLabel>06 / YOUR TURN</SectionLabel>
            <h2 className="section-heading" id="contact-title">
              Have a good<br />one in <span>mind?</span>
            </h2>
            <p className="body-copy">
              I&apos;m always up for a thoughtful conversation, an interesting challenge, or a
              friendly hello.
            </p>
            <button className="email-copy" type="button" onClick={copyEmail}>
              {copied ? <Check size={17} /> : <Mail size={17} />}
              {copied ? 'Email copied!' : 'hello@example.com'}
              {!copied && <ArrowUpRight size={15} />}
            </button>
            <SocialLinks compact />
          </motion.div>
          <motion.form className="contact-form" onSubmit={handleContactSubmit} {...reveal} variants={enterView}>
            <div className="form-heading">
              <span>DROP ME A NOTE</span>
              <Layers3 size={19} aria-hidden="true" />
            </div>
            <label htmlFor="contact-name">Your name</label>
            <input id="contact-name" name="name" type="text" placeholder="Jane Smith" autoComplete="name" required />
            <label htmlFor="contact-email">Email address</label>
            <input id="contact-email" name="email" type="email" placeholder="jane@company.com" autoComplete="email" required />
            <label htmlFor="contact-message">What&apos;s on your mind?</label>
            <textarea id="contact-message" name="message" rows={4} placeholder="Tell me a little about it..." required />
            <button className="button button--lime form-submit" type="submit">
              Send a message <Send size={16} aria-hidden="true" />
            </button>
            <p className="form-note" aria-live="polite">
              {formStatus || 'This sample form opens your email app — no message is stored on a server.'}
            </p>
          </motion.form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <a className="brand" href="#home" aria-label="Back to top">
            <span className="brand-mark">A<span>.</span></span>
            <span className="brand-name">ALEX MORGAN</span>
          </a>
          <p>Built with care <span aria-label="love">♥</span> and a few too many browser tabs.</p>
          <a className="back-to-top" href="#home">BACK TO TOP <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Alex Morgan. Sample portfolio content.</span>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
          </nav>
          <SocialLinks compact />
        </div>
      </footer>
    </div>
  )
}

export default App
