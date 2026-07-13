import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, CheckCircle2 } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // In a real app, you'd make an API call here.
      setTimeout(() => setSubmitted(false), 5000);
      setEmail('');
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="app-root">
      {/* Animated Background Orbs */}
      <div className="orb-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="app-wrapper">
        <nav className="navbar">
          <a href="#" className="logo">
            <Sparkles className="text-accent" size={24} color="#0071e3" />
            <span>Clozflow</span>
          </a>
          <div className="nav-links">
            <a href="mailto:hello@clozflow.com" className="nav-link">Contact</a>
          </div>
        </nav>

        <main className="hero-section">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="hero-content"
          >
            <motion.div variants={fadeUpVariant} className="badge">
              <div className="badge-pulse"></div>
              <span>Clozflow 2.0 is coming soon</span>
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="hero-title">
              The ultimate OS for <br />
              <span>your startup workflow.</span>
            </motion.h1>
            
            <motion.p variants={fadeUpVariant} className="hero-subtitle">
              Experience the next generation of productivity. Automate your operations, streamline communications, and scale faster than ever before.
            </motion.p>
            
            <motion.div variants={fadeUpVariant}>
              {submitted ? (
                <div className="waitlist-form" style={{ justifyContent: 'center', background: 'rgba(255,255,255,0.8)', padding: '1.2rem', borderRadius: '3rem', border: '1px solid #34c759', color: '#34c759', fontWeight: '500', gap: '0.5rem', alignItems: 'center' }}>
                  <CheckCircle2 size={20} />
                  <span>You're on the list! Keep an eye on your inbox.</span>
                </div>
              ) : (
                <form className="waitlist-form" onSubmit={handleSubmit}>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="waitlist-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="waitlist-btn">
                    Join Waitlist <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div variants={fadeUpVariant} className="social-proof">
              <div className="avatars">
                <div className="avatar" style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=1)' }}></div>
                <div className="avatar" style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=2)' }}></div>
                <div className="avatar" style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=3)' }}></div>
                <div className="avatar" style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=4)' }}></div>
              </div>
              <span className="social-proof-text">Join 2,500+ early adopters</span>
            </motion.div>
          </motion.div>
        </main>

        <section className="features-section">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="features-grid"
          >
            <motion.div variants={fadeUpVariant} className="feature-card">
              <div className="feature-icon">
                <Zap size={24} />
              </div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-desc">Built on modern architecture to ensure your workflows execute in milliseconds, not minutes.</p>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="feature-card">
              <div className="feature-icon">
                <Sparkles size={24} />
              </div>
              <h3 className="feature-title">AI Powered</h3>
              <p className="feature-desc">Leverage cutting-edge AI to draft responses, analyze data, and predict your next move.</p>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="feature-card">
              <div className="feature-icon">
                <Shield size={24} />
              </div>
              <h3 className="feature-title">Enterprise Security</h3>
              <p className="feature-desc">Bank-grade encryption and granular permissions keep your company data safe and compliant.</p>
            </motion.div>
          </motion.div>
        </section>

        <footer>
          <p>&copy; {new Date().getFullYear()} Clozflow. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
