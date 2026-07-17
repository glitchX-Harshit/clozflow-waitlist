import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Database, Sparkles, Cpu, Zap, Bell, ListTodo } from 'lucide-react';

function SaaSPreview() {
  const previewRef = useRef(null);
  const bodyRef = useRef(null);
  const [activeTab, setActiveTab] = useState('canvas');
  const [scale, setScale] = useState(1);
  
  // Animation simulation states
  const [activeNode, setActiveNode] = useState(null); 
  const [packetFlowing, setPacketFlowing] = useState(false);
  const [agentCursor, setAgentCursor] = useState({ x: 120, y: 150, opacity: 1, label: 'Clozflow Agent' });
  const [terminalLogs, setTerminalLogs] = useState([
    { time: '03:22:10', type: 'info', text: 'Clozflow Sales OS initialized. Listening for leads...' }
  ]);

  // --- Resize Observer Scaler for Mobile Viewports ---
  useEffect(() => {
    const el = bodyRef.current;
    if (!el || activeTab !== 'canvas') return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        const targetWidth = 500;
        const padding = 24; // Squeeze tighter for mobile focus
        if (width < targetWidth + padding) {
          // Keep nodes large and centered on phone screens
          setScale(Math.max(0.55, (width - 16) / targetWidth));
        } else {
          setScale(1);
        }
      }
    });

    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [activeTab]);

  // --- snappier Simulation Loop optimized for mobile views ---
  useEffect(() => {
    let timeoutId;

    const addLog = (type, text) => {
      const time = new Date().toTimeString().split(' ')[0];
      setTerminalLogs(prev => [
        ...prev.slice(-8), 
        { time, type, text }
      ]);
    };

    const runSimulationStep = () => {
      // Step 1: Drag cursor to Stripe
      setAgentCursor(prev => ({ ...prev, x: 80, y: 110, opacity: 1 }));
      
      timeoutId = setTimeout(() => {
        // Step 2: Lead node lights up
        setActiveNode('stripe');
        addLog('info', 'Inbound: New high-intent lead found (Founder at Clozflow)');
        
        timeoutId = setTimeout(() => {
          // Step 3: Trigger connector flow
          setPacketFlowing(true);
          setAgentCursor(prev => ({ ...prev, x: 230, y: 150 }));
          
          timeoutId = setTimeout(() => {
            setActiveNode('engine');
            addLog('ai', 'AI Agent: Researching prospect & writing personalized outreach...');
            
            timeoutId = setTimeout(() => {
              // Step 4: Dispatch data packets to output branches
              setPacketFlowing(false);
              setActiveNode('outputs');
              addLog('success', 'AI Outreach compiled and matched to custom CRM variables.');
              
              timeoutId = setTimeout(() => {
                // Move cursor to Email
                setAgentCursor(prev => ({ ...prev, x: 380, y: 80 }));
                addLog('success', 'Outreach email dispatched automatically (delivery latency 14ms)');
                
                timeoutId = setTimeout(() => {
                  // Move cursor to CRM
                  setAgentCursor(prev => ({ ...prev, x: 380, y: 160 }));
                  addLog('success', 'Clozflow CRM updated: Lead stage set to "Outreach Sent"');

                  timeoutId = setTimeout(() => {
                    // Reset positions
                    setActiveNode(null);
                    setAgentCursor(prev => ({ ...prev, x: 230, y: 220, opacity: 0.5 }));
                    
                    // Loop again - faster cycle to retain attention on mobile (2.5s rest)
                    timeoutId = setTimeout(runSimulationStep, 2500);
                  }, 1200);
                }, 1000);
              }, 1000);
            }, 1200);
          }, 800);
        }, 600);
      }, 1000);
    };

    const startDelay = setTimeout(runSimulationStep, 800);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeoutId);
    };
  }, []);

  // --- 60fps 3D Orbital Wobble Loop (Mobile/Idle-Centric Animation) ---
  useEffect(() => {
    let animFrameId;
    let lastMouseMoveTime = 0;
    
    // Rotations variables
    let currentRotX = 0;
    let currentRotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onPointerMove = (e) => {
      if (!previewRef.current) return;
      lastMouseMoveTime = Date.now();
      
      const rect = previewRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Target angles based on mouse offset (max 8.5deg)
      targetRotX = -(y / (rect.height / 2)) * 8.5;
      targetRotY = (x / (rect.width / 2)) * 8.5;
    };

    const onPointerLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    const element = previewRef.current;
    if (element) {
      element.addEventListener('pointermove', onPointerMove);
      element.addEventListener('pointerleave', onPointerLeave);
    }

    const tick = () => {
      const time = Date.now();
      const idleTime = time - lastMouseMoveTime;

      // If on mobile (touch start is active) or mouse is idle for >1.5s, execute auto-wobble
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      if (isTouch || idleTime > 1500) {
        // Continuous, complex dual-sine orbit
        const speedMultiplier = 0.0018;
        targetRotX = Math.sin(time * speedMultiplier) * 4.5;
        targetRotY = Math.cos(time * speedMultiplier * 0.75) * 4.5;
      }

      // Smooth interpolation (easing factor: 0.075)
      currentRotX += (targetRotX - currentRotX) * 0.075;
      currentRotY += (targetRotY - currentRotY) * 0.075;

      if (previewRef.current) {
        // Combine scaling hover scale (1.01) with rotations
        const scaleVal = (idleTime < 1500 && !isTouch) ? 1.02 : 1.01;
        previewRef.current.style.transform = `perspective(1500px) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg) scale3d(${scaleVal}, ${scaleVal}, ${scaleVal})`;
      }

      animFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animFrameId);
      if (element) {
        element.removeEventListener('pointermove', onPointerMove);
        element.removeEventListener('pointerleave', onPointerLeave);
      }
    };
  }, []);

  return (
    <section className="preview-section">
      <div className="preview-container">
        
        {/* Soft background reflection glow */}
        <div className="preview-glow-bg" />

        {/* 3D Tilt Wrapper */}
        <div 
          ref={previewRef}
          className="dashboard-wrapper preserve-3d"
        >
          {/* Dashboard Header Bar */}
          <div className="dashboard-header">
            <div className="window-dots">
              <span className="dot dot-close"></span>
              <span className="dot dot-minimize"></span>
              <span className="dot dot-expand"></span>
            </div>
            
            <div className="dashboard-tabs">
              <button 
                onClick={() => setActiveTab('canvas')}
                className={`tab-btn ${activeTab === 'canvas' ? 'active' : ''}`}
              >
                <Cpu size={13} /> Multiplayer Canvas
              </button>
              <button 
                onClick={() => setActiveTab('logs')}
                className={`tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
              >
                <Terminal size={13} /> Operations Terminal
              </button>
            </div>
            
            <div className="dashboard-status">
              <div className="pulse-green"></div>
              <span>Engine Streaming</span>
            </div>
          </div>

          {/* Dashboard Main Content */}
          <div ref={bodyRef} className="dashboard-body">
            {activeTab === 'canvas' ? (
              <div className="tab-content canvas-tab preserve-3d">
                
                {/* Dotted grid background */}
                <div className="dotted-grid-bg translate-z-0" />
                
                {/* Proportional Scaler Wrapper */}
                <div 
                  className="canvas-scaler preserve-3d"
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center'
                  }}
                >
                  
                  {/* Connection lines */}
                  <svg className="connector-svg translate-z-15" viewBox="0 0 500 300">
                    <g stroke="#e2e2e7" strokeWidth="1.5" fill="none">
                      <path d="M 120 110 L 250 150" />
                      <path d="M 120 190 L 250 150" />
                      <path d="M 250 150 L 380 90" />
                      <path d="M 250 150 L 380 150" />
                      <path d="M 250 150 L 380 210" />
                    </g>

                    {packetFlowing && (
                      <g fill="#1a1a1a">
                        <circle r="4" className="moving-packet">
                          <animateMotion 
                            dur="1s" 
                            repeatCount="indefinite" 
                            path="M 120 110 L 250 150" 
                          />
                        </circle>
                        <circle r="4" className="moving-packet">
                          <animateMotion 
                            dur="1s" 
                            repeatCount="indefinite" 
                            path="M 120 190 L 250 150" 
                          />
                        </circle>
                      </g>
                    )}

                    {activeNode === 'outputs' && (
                      <g fill="#1a1a1a">
                        <circle r="4" className="moving-packet">
                          <animateMotion 
                            dur="1.2s" 
                            repeatCount="indefinite" 
                            path="M 250 150 L 380 90" 
                          />
                        </circle>
                        <circle r="4" className="moving-packet">
                          <animateMotion 
                            dur="1.2s" 
                            repeatCount="indefinite" 
                            path="M 250 150 L 380 150" 
                          />
                        </circle>
                        <circle r="4" className="moving-packet">
                          <animateMotion 
                            dur="1.2s" 
                            repeatCount="indefinite" 
                            path="M 250 150 L 380 210" 
                          />
                        </circle>
                      </g>
                    )}
                  </svg>

                  {/* Column 1: Inputs */}
                  <div className="canvas-nodes-col col-left translate-z-35">
                    <div className={`canvas-node ${activeNode === 'stripe' ? 'active-stripe' : ''}`}>
                      <div className="node-icon"><Zap size={14} /></div>
                      <span className="node-label">New Lead Found</span>
                    </div>
                    <div className="canvas-node">
                      <div className="node-icon"><Database size={14} /></div>
                      <span className="node-label">Inbound Contact</span>
                    </div>
                  </div>

                  {/* Column 2: Central Core Engine */}
                  <div className="canvas-nodes-col col-center translate-z-45">
                    <div className={`canvas-node-core ${activeNode === 'engine' ? 'active-core' : ''}`}>
                      <div className="core-glow" />
                      <Cpu size={24} className="core-icon-spin" />
                      <span className="core-label">Clozflow</span>
                    </div>
                  </div>

                  {/* Column 3: Outputs */}
                  <div className="canvas-nodes-col col-right translate-z-35">
                    <div className={`canvas-node ${activeNode === 'outputs' ? 'active-out' : ''}`}>
                      <div className="node-icon"><Bell size={14} /></div>
                      <span className="node-label">Personalized Outreach</span>
                    </div>
                    <div className={`canvas-node ${activeNode === 'outputs' ? 'active-out' : ''}`}>
                      <div className="node-icon"><ListTodo size={14} /></div>
                      <span className="node-label">CRM Auto-Update</span>
                    </div>
                    <div className="canvas-node">
                      <div className="node-icon"><Sparkles size={14} /></div>
                      <span className="node-label">AI Conversation Reply</span>
                    </div>
                  </div>

                  {/* Simulated Multiplayer Agent Cursor */}
                  <div 
                    className="agent-cursor translate-z-60"
                    style={{
                      position: 'absolute',
                      left: `${agentCursor.x}px`,
                      top: `${agentCursor.y}px`,
                      opacity: agentCursor.opacity,
                      transition: 'left 1.2s cubic-bezier(0.16, 1, 0.3, 1), top 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
                      pointerEvents: 'none'
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.15))' }}>
                      <path d="M4.5 3V19L9.5 14L15.5 20L19.5 16L13.5 10L19.5 4L4.5 3Z" fill="#121212" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                    <span className="cursor-label">{agentCursor.label}</span>
                  </div>

                </div>

              </div>
            ) : (
              // Light IDE Operations Terminal Drawer
              <div className="tab-content terminal-content">
                {terminalLogs.map((log, index) => (
                  <div className="terminal-line" key={index}>
                    <span className="term-time">[{log.time}]</span>{' '}
                    {log.type === 'info' && <span className="term-info">INFO</span>}
                    {log.type === 'ai' && <span className="term-ai">AI-COMPILER</span>}
                    {log.type === 'success' && <span className="term-success">SUCCESS</span>}
                    {' '}{log.text}
                  </div>
                ))}
                <div className="terminal-line live-cursor-log">
                  <span className="term-time">[{new Date().toTimeString().split(' ')[0]}]</span>{' '}
                  <span className="term-info">INFO</span> Listening for operational cycles...
                  <span className="term-block-cursor"></span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default SaaSPreview;
