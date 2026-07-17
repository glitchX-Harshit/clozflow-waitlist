import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Users2, 
  Command, 
  Zap, 
  Radio, 
  Shield, 
  ArrowUpRight,
  CheckCircle2,
  Send,
  UserCheck
} from 'lucide-react';

// --- High-Fidelity Interactive Visual Previews for Right Column ---

const AgentPreview = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }} 
    animate={{ opacity: 1, scale: 1 }} 
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4 }}
    className="luxury-preview-card"
  >
    <div className="preview-card-header">
      <div className="preview-indicator">
        <span className="live-dot"></span>
        <span>Agent Active</span>
      </div>
      <span className="preview-tag">Autonomous</span>
    </div>
    <div className="agent-activity-box">
      <div className="activity-row done">
        <CheckCircle2 size={14} className="icon-green" />
        <span>Scanned LinkedIn for 'Founder' profiles in Boston</span>
      </div>
      <div className="activity-row active">
        <div className="spinner-s"></div>
        <span>Researching product fit for Harshit C. (glitchX)</span>
      </div>
      <div className="activity-row pending">
        <span className="circle-s"></span>
        <span>Drafting customized intro email</span>
      </div>
    </div>
  </motion.div>
);

const PlatformPreview = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }} 
    animate={{ opacity: 1, scale: 1 }} 
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4 }}
    className="luxury-preview-card unified-preview"
  >
    <div className="unified-grid">
      <div className="tool-box disabled">LinkedIn Sourcing</div>
      <div className="tool-box disabled">Cold Emailer</div>
      <div className="tool-box disabled">Legacy CRM</div>
      <div className="tool-box active-clozflow">Clozflow Sales OS</div>
    </div>
    <p className="preview-caption">Four separate subscription costs collapsed into one seamless operational workspace.</p>
  </motion.div>
);

const CopilotPreview = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }} 
    animate={{ opacity: 1, scale: 1 }} 
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4 }}
    className="luxury-preview-card"
  >
    <div className="chat-preview-container">
      <div className="bubble bubble-prospect">"We are not ready to switch systems right now."</div>
      <div className="bubble bubble-copilot">
        <div className="copilot-header">
          <Sparkles size={12} />
          <span>Real-time Live Recommendation</span>
        </div>
        <p>"No problem. Reassure them that Clozflow acts as a sidecar that syncs with their current databases instantly, requiring zero migration."</p>
      </div>
    </div>
  </motion.div>
);

const SourcingPreview = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }} 
    animate={{ opacity: 1, scale: 1 }} 
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4 }}
    className="luxury-preview-card"
  >
    <div className="sourcing-preview-box">
      <div className="profile-badge-card">
        <div className="p-img">H</div>
        <div className="p-details">
          <h4>Harshit C.</h4>
          <p>Founder & CEO, glitchX</p>
        </div>
        <span className="p-match">98% Match</span>
      </div>
      <div className="profile-enrichment">
        <div className="enrich-item">
          <span className="label">Tech Stack:</span>
          <span className="val">React, Node.js, Vercel</span>
        </div>
        <div className="enrich-item">
          <span className="label">Recent Post:</span>
          <span className="val">"Building our new product waitlist..."</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const OutreachPreview = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }} 
    animate={{ opacity: 1, scale: 1 }} 
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4 }}
    className="luxury-preview-card"
  >
    <div className="outreach-editor">
      <div className="editor-top">
        <span>To: hc5764802@gmail.com</span>
      </div>
      <div className="editor-body">
        <span className="subject">Subject: Simplifying glitchX's waitlist flow</span>
        <p className="body-text">
          Hi Harshit, noticed you were looking for database integrations on your waitlist. I drafted a serverless Apps Script connecting directly to Google Sheets...
        </p>
        <div className="editor-status">
          <Send size={12} />
          <span>Outreach personalized based on recent posts.</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const FollowupPreview = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }} 
    animate={{ opacity: 1, scale: 1 }} 
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4 }}
    className="luxury-preview-card"
  >
    <div className="crm-tasks-list">
      <div className="crm-task">
        <UserCheck size={14} className="icon-gold" />
        <div className="task-details">
          <h5>Follow up with Harshit C.</h5>
          <p>Lead opened email 3 times. Clicked waitlist link.</p>
        </div>
      </div>
      <div className="crm-task done">
        <CheckCircle2 size={14} className="icon-muted" />
        <div className="task-details">
          <h5>Outreach sent to 12 new prospects</h5>
          <p>Completed 10:30 AM</p>
        </div>
      </div>
    </div>
  </motion.div>
);

function BentoGrid() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Deploy an AI Sales Agent",
      subtitle: "Autonomous Sourcing",
      description: "Deploy an autonomous AI Sales Agent that works on your behalf—finding qualified leads, starting warm conversations, following up, and delivering daily reports of interested prospects.",
      icon: Users2,
      preview: AgentPreview
    },
    {
      title: "Unified Sales Platform",
      subtitle: "Consolidated Operations",
      description: "Instead of paying for multiple tools for lead generation, cold outreach, CRM trackers, and assistants, Clozflow brings everything together.",
      icon: Command,
      preview: PlatformPreview
    },
    {
      title: "Real-Time Meeting Copilot",
      subtitle: "Live Call Closer Assist",
      description: "Just like a viral interview assistant, it listens to your live cold calls and Zoom meetings in real-time, feeding you instant objection-handling suggestions with ultra-low latency.",
      icon: Sparkles,
      preview: CopilotPreview
    },
    {
      title: "Smart Prospect Sourcing",
      subtitle: "Data enrichment",
      description: "Automatically find high-intent prospects and clients across platforms. No manual web scraping or contact hunting required.",
      icon: Zap,
      preview: SourcingPreview
    },
    {
      title: "Personalized Warm Outreach",
      subtitle: "Custom copywriting",
      description: "Write targeted messages customized to each lead's background. No generic templates or mass spamming.",
      icon: Radio,
      preview: OutreachPreview
    },
    {
      index: 6,
      title: "Intelligent Follow-ups",
      subtitle: "Pipeline management",
      description: "Smart CRM system tracks your pipeline, organizes data, and reminds you when and what to write next to turn leads into clients.",
      icon: Shield,
      preview: FollowupPreview
    }
  ];

  const ActiveWidget = features[activeFeature].preview;

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
          Engineered to <i>win clients</i>.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-subtitle"
        >
          Clozflow replaces your fragmented sales stack with a single AI Sales Operating System that automates prospecting, outreach, and closing tasks.
        </motion.p>
      </div>

      {/* Awwwards Split-screen hover list layout */}
      <div className="agency-split-layout">
        {/* Left column: feature list */}
        <div className="agency-list-col">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className={`agency-list-item ${activeFeature === i ? 'active' : ''}`}
              onMouseEnter={() => setActiveFeature(i)}
            >
              <div className="item-meta">
                <span className="item-number">0{i + 1}</span>
                <span className="item-subtitle">{feature.subtitle}</span>
              </div>
              <div className="item-main">
                <h3 className="item-title cormorant-title">{feature.title}</h3>
                <p className="item-desc">{feature.description}</p>
              </div>
              <ArrowUpRight className="item-arrow" size={16} />
            </div>
          ))}
        </div>

        {/* Right column: sticky visual preview card container */}
        <div className="agency-preview-col">
          <div className="sticky-preview-wrapper">
            <div className="preview-background-glow" />
            <div className="preview-card-viewport">
              <AnimatePresence mode="wait">
                <ActiveWidget key={activeFeature} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BentoGrid;
