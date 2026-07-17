import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Check, ChevronDown } from 'lucide-react';
import ThreeCanvas from './components/ThreeCanvas';
import BentoGrid from './components/BentoGrid';
import SaaSPreview from './components/SaaSPreview';

function App() {
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
    if (!email) return;

    setIsSubmitting(true);
    setErrorMsg('');

    const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    
    if (!scriptUrl) {
      setErrorMsg("Google Sheets URL not configured in .env. Please configure VITE_GOOGLE_SHEETS_URL.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 'success') {
        setSubmitted(true);
        setEmail('');
      } else {
        throw new Error(result.message || 'Failed to submit email. Please try again.');
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setErrorMsg(error.message || 'Connection failed. Please check your network or try again.');
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
      a: "Clozflow is an ultra-low-latency operations engine designed to unify system databases, sync APIs, and execute secure AI workflows in real-time."
    },
    {
      q: "When will I receive access?",
      a: "We are onboarding startups in weekly cohorts. Early invite requests are prioritized to join our private beta starting this quarter."
    },
    {
      q: "Does it integrate with our existing stack?",
      a: "Yes. Clozflow connects bi-directionally with Slack, Stripe, GitHub, Linear, and database backends with instantaneous synchronizations."
    },
    {
      q: "How is database isolation handled?",
      a: "Clozflow is built on a zero-trust sandbox architecture. Your databases are isolated at the virtualization layer with end-to-end encryption."
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
            <a href="mailto:hello@clozflow.com" className="nav-link contact-btn">Contact</a>
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
            {/* Pulsing Badge */}
            <motion.div variants={fadeUpVariant} className="badge">
              <div className="badge-pulse"></div>
              <span>Clozflow 2.0 Early Access</span>
            </motion.div>
            
            {/* Luxury Editorial Title */}
            <motion.h1 variants={fadeUpVariant} className="hero-title">
              Workflows that think, build, <br />
              and <span>repair themselves.</span>
            </motion.h1>
            
            {/* Descriptive Subtitle */}
            <motion.p variants={fadeUpVariant} className="hero-subtitle">
              Clozflow translates natural language into ultra-low latency operational pipelines. No API maintenance. No servers. Just pure velocity.
            </motion.p>
            
            {/* Elegant Form Form */}
            <motion.div variants={fadeUpVariant} className="waitlist-form-container">
              {submitted ? (
                <div className="waitlist-success">
                  <Check size={18} strokeWidth={2.5} />
                  <span>Request received. Keep an eye on your inbox.</span>
                </div>
              ) : (
                <>
                  <form className="waitlist-form" onSubmit={handleSubmit}>
                    <input 
                      type="email" 
                      placeholder="Enter your work email" 
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
                <span className="ticker-pulse"></span>
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

        {/* FAQ Accordion Section */}
        <section className="faq-section">
          <div className="section-header">
            <div className="section-badge"><span>Inquiries</span></div>
            <h2 className="section-title cormorant-header">Frequently <i>asked questions</i>.</h2>
          </div>
          
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i}>
                <button className="faq-question" onClick={() => toggleFaq(i)}>
                  <span className="cormorant-title">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="faq-answer"
                    >
                      <div className="faq-answer-inner">
                        <p>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Minimal Footer */}
        <footer>
          <p>&copy; {new Date().getFullYear()} Clozflow Technologies Inc. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Security</a>
            <a href="#" className="footer-link">Terms</a>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;
