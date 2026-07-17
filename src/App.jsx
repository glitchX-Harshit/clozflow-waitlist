import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import ThreeCanvas from './components/ThreeCanvas';
import BentoGrid from './components/BentoGrid';
import SaaSPreview from './components/SaaSPreview';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [waitlistCount, setWaitlistCount] = useState(14282);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Organic waitlist count simulation ticks
  useEffect(() => {
    const timer = setInterval(() => {
      setWaitlistCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);
    setErrorMsg('');

    const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    
    if (!scriptUrl) {
      setErrorMsg("Google Sheets URL not configured in .env. Please configure VITE_GOOGLE_SHEETS_URL.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Using 'no-cors' mode with URL-encoded parameters is the most bulletproof way to submit to Google Sheets
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email: email, name: name }).toString(),
      });

      setSubmitted(true);
      setEmail('');
      setName('');
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setErrorMsg('Connection failed. Please check your network or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const faqs = [
    {
      q: "What is Clozflow?",
      a: "Clozflow is an AI platform that helps businesses and freelancers get more clients. It finds potential customers, researches them, writes personalized outreach messages, helps you reply during sales conversations with a real-time AI assistant, and reminds you what to do next so you can close more deals."
    },
    {
      q: "When will I receive access?",
      a: "We are onboarding businesses and freelancers in weekly cohorts. Early invite requests are prioritized to join our private beta starting this quarter."
    },
    {
      q: "Do I still need other tools for outreach or CRM?",
      a: "No. Instead of using multiple tools for lead generation, outreach, CRM, and sales assistance, Clozflow brings everything together in one platform."
    },
    {
      q: "Will it work autonomously?",
      a: "Yes. In the future, you'll also be able to deploy an AI Sales Agent that works on your behalf—finding qualified leads, starting conversations, following up, and delivering a daily summary of interested prospects directly to you."
    }
  ];

  return (
    <div className="app-root">
      {/* Luxury Film Grain Texture Overlay */}
      <div className="grain-overlay" />

      {/* 3D Particle Backdrop */}
      <ThreeCanvas />

      {/* Page Content Shell */}
      <div className="app-wrapper">
        
        {/* Navigation Bar */}
        <nav className="navbar">
          <a href="#" className="logo">
            <Sparkles size={20} strokeWidth={1.8} />
            <span>Clozflow</span>
          </a>
          <div className="nav-links">
            <a href="mailto:clozflow.ai@gmail.com" className="nav-link contact-btn">Contact</a>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="hero-section">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } }
            }}
            className="hero-content"
          >
            {/* Minimal Badge */}
            <motion.div variants={fadeUpVariant} className="badge">
              <span>Clozflow Early Access</span>
            </motion.div>
            
            {/* Luxury Editorial Title */}
            <motion.h1 variants={fadeUpVariant} className="hero-title">
              Ditch the cold calls. <br />
              <span>Let AI sign your clients.</span>
            </motion.h1>
            
            {/* Descriptive Subtitle */}
            <motion.p variants={fadeUpVariant} className="hero-subtitle">
              Deploy custom AI agents that find your ideal clients, write pitches they actually reply to, and close deals for you—even while you're sleeping, traveling, or binge-watching. Plus, get instant, ultra-low latency objection-handling guidance during live meetings and cold calls. Welcome to the era of sales on absolute autopilot.
            </motion.p>
            
            {/* Elegant Form Form */}
            <motion.div variants={fadeUpVariant} className="waitlist-form-container">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="luxury-success-card"
                >
                  <div className="success-icon-wrapper">
                    <Check size={28} strokeWidth={2} />
                  </div>
                  <h3 className="success-title">You're on the list.</h3>
                  <p className="success-desc">
                    Your invitation request has been logged. We release access slots weekly to ensure quality onboarding. Keep an eye on your inbox.
                  </p>
                  <div className="success-footer-badge">
                    <span>Priority Beta Tier</span>
                  </div>
                </motion.div>
              ) : (
                <>
                  <form className="waitlist-form" onSubmit={handleSubmit}>
                    <input 
                      type="text" 
                      placeholder="Your name" 
                      className="waitlist-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                    <div className="waitlist-separator"></div>
                    <input 
                      type="email" 
                      placeholder="Work email" 
                      className="waitlist-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                    <button type="submit" className="waitlist-btn" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span>Registering...</span>
                      ) : (
                        <>Request Invite <ArrowRight size={16} /></>
                      )}
                    </button>
                  </form>
                  {errorMsg && (
                    <div className="waitlist-error">
                      <span>{errorMsg}</span>
                    </div>
                  )}
                </>
              )}

              {/* Simulated Live Ticker */}
              <div className="waitlist-ticker">
                <span>Join {waitlistCount.toLocaleString()} founders. 12 spots left in Beta Group A.</span>
              </div>
            </motion.div>

            {/* Social Proof */}
            <motion.div variants={fadeUpVariant} className="social-proof">
              <div className="avatars">
                <div className="avatar" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60)' }}></div>
                <div className="avatar" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60)' }}></div>
                <div className="avatar" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60)' }}></div>
                <div className="avatar" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60)' }}></div>
              </div>
              <span className="social-proof-text">Backed by early builders from <span>Y Combinator</span>, <span>Stripe</span>, and <span>Vercel</span>.</span>
            </motion.div>
          </motion.div>
        </main>

        {/* High-Fidelity Light Mode Dashboard Mockup */}
        <SaaSPreview />

        {/* Bento-Style Capabilities Showcase */}
        <BentoGrid />

        {/* FAQ Accordion Section (Awwwards Two-Column Redesign) */}
        <section className="faq-section" id="faq">
          <div className="faq-container">
            {/* Left side: Editorial Heading */}
            <div className="faq-heading-col">
              <div className="section-badge"><span>Inquiries</span></div>
              <h2 className="faq-main-title cormorant-header">Frequently <br /><i>asked questions</i>.</h2>
              <p className="faq-side-desc">
                Can't find what you are looking for? Reach out to our founding team directly for partnership or beta questions.
              </p>
              <a href="mailto:clozflow.ai@gmail.com" className="faq-contact-link">
                Ask a custom question <ArrowRight size={14} />
              </a>
            </div>
            
            {/* Right side: Accordion list with numbers */}
            <div className="faq-list-col">
              {faqs.map((faq, i) => (
                <div className={`faq-item-premium ${activeFaq === i ? 'active' : ''}`} key={i}>
                  <button className="faq-question-premium" onClick={() => toggleFaq(i)}>
                    <div className="faq-question-content">
                      <span className="faq-number">0{i + 1}</span>
                      <span className="faq-q-text">{faq.q}</span>
                    </div>
                    <span className="faq-toggle-icon">
                      <span className="faq-icon-line horizontal"></span>
                      <span className="faq-icon-line vertical"></span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="faq-answer-premium"
                      >
                        <div className="faq-answer-inner-premium">
                          <p>{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awwwards Winning Style Footer */}
        <footer className="luxury-footer">
          <div className="footer-container">
            {/* Top Row: Call to Action */}
            <div className="footer-cta">
              <h2 className="cormorant-header">Let's <i>automate</i> your growth.</h2>
              <a href="#" className="footer-cta-btn" onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>
                Secure Early Access <ArrowRight size={16} />
              </a>
            </div>

            <hr className="footer-divider" />

            {/* Mid Row: Info Grid */}
            <div className="footer-grid">
              <div className="footer-col brand-col">
                <a href="#" className="footer-logo">
                  <Sparkles size={18} strokeWidth={1.8} />
                  <span>Clozflow</span>
                </a>
                <p className="brand-desc">
                  The AI Sales Operating System that automates lead generation, writes warm outreach, and closes prospects.
                </p>
                <div className="system-status">
                  <span className="status-dot"></span>
                  <span>All Systems Operational</span>
                </div>
              </div>

              <div className="footer-col">
                <h4>Product</h4>
                <ul>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('.bento-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Capabilities</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('.preview-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Sales OS</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('.faq-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Inquiries</a></li>
                  <li><a href="#" className="glow-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Join Waitlist</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Legal</h4>
                <ul>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                  <li><a href="#">Security Protocols</a></li>
                </ul>
              </div>

              <div className="footer-col contact-col">
                <h4>Contact</h4>
                <ul>
                  <li><a href="mailto:clozflow.ai@gmail.com">clozflow.ai@gmail.com</a></li>
                  <li><span className="local-time-label">Global Office</span></li>
                  <li><span className="time-display">UTC/GMT +5:30</span></li>
                </ul>
              </div>
            </div>

            <hr className="footer-divider" />

            {/* Bottom Row: Copyright & Big Branding */}
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} Clozflow Technologies Inc. Designed for premium velocity.</p>
              <div className="footer-socials">
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">GitHub</a>
              </div>
            </div>
            
            {/* Giant Branding Display Text (SVG for 100% responsiveness without cutoffs) */}
            <div className="footer-giant-wrapper">
              <svg className="footer-giant-svg" viewBox="0 0 580 90">
                <text
                  x="50%"
                  y="75"
                  textAnchor="middle"
                  fill="#121212"
                  fontWeight="900"
                  letterSpacing="-0.04em"
                  fontSize="82"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  CLOZFLOW<tspan fill="#8E74E2" fontSize="64" dy="-2">●</tspan>
                </text>
              </svg>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;
