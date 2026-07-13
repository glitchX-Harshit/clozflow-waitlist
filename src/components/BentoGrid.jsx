import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Sparkles, 
  Shield, 
  Users2, 
  Radio, 
  Command, 
  ArrowUpRight 
} from 'lucide-react';

function BentoCard({ title, description, icon: Icon, badge, span, delay }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay } 
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      className={`bento-card ${span ? `span-${span}` : ''}`}
    >
      {/* Subtle graphite/grey light spotlight glow */}
      <div className="bento-glow" />
      
      {/* Content wrapper */}
      <div className="bento-content">
        <div className="bento-header">
          <div className="bento-icon-wrapper">
            <Icon className="bento-icon" size={20} />
          </div>
          {badge && <span className="bento-badge">{badge}</span>}
        </div>
        
        <div className="bento-body">
          <h3 className="bento-title cormorant-title">
            {title}
            <ArrowUpRight className="bento-arrow" size={14} />
          </h3>
          <p className="bento-desc">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function BentoGrid() {
  const features = [
    {
      title: "Self-Healing Run Loop",
      description: "When external API schemas drift or webhooks change, Clozflow automatically rewires, tests, and deploys hot-fixes without manual commits.",
      icon: Zap,
      badge: "Resilient",
      span: "2",
      delay: 0.05
    },
    {
      title: "20ms Hyper-Pipeline",
      description: "Built on a sandboxed Rust executor, workflow runs execute in milliseconds. Faster than the network packets of traditional servers.",
      icon: Command,
      badge: "Speed",
      span: "1",
      delay: 0.1
    },
    {
      title: "Natural Language Compiler",
      description: "Describe operational flows in plain English. The compiler maps logic, drafts database webhooks, and drafts safety tests instantly.",
      icon: Sparkles,
      badge: "AI Engine",
      span: "1",
      delay: 0.15
    },
    {
      title: "Autonomous Streaming Sync",
      description: "Zero API polling. Real-time bi-directional streaming mirrors local database mutations directly to Stripe, Slack, or GitHub instantly.",
      icon: Radio,
      badge: "Streaming",
      span: "2",
      delay: 0.2
    },
    {
      title: "Zero-Trust Sandboxes",
      description: "Granular row-level isolated database sandboxing ensures complete enterprise compliance, data safety, and secure multi-tenant execution.",
      icon: Shield,
      badge: "Secured",
      span: "1",
      delay: 0.25
    },
    {
      title: "Multiplayer Ops Canvas",
      description: "Visual operational canvas designed for dev teams to live-trace latency, map node dependencies, and deploy workflows in lockstep.",
      icon: Users2,
      badge: "Visual Canvas",
      span: "1",
      delay: 0.3
    }
  ];

  return (
    <section className="bento-section">
      <div className="section-header">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-badge"
        >
          <span>Capabilities</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="section-title cormorant-header"
        >
          Engineered for <i>impeccable scale</i>.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-subtitle"
        >
          Discover a high-performance workflow automation layer crafted specifically for startups scaling past operational limits.
        </motion.p>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="bento-grid"
      >
        {features.map((feature, i) => (
          <BentoCard key={i} {...feature} />
        ))}
      </motion.div>
    </section>
  );
}

export default BentoGrid;
