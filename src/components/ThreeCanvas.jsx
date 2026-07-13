import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function ThreeCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // Elegant white fog to blend particles smoothly into the background
    scene.fog = new THREE.FogExp2(0xffffff, 0.012);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 32, 90);
    camera.lookAt(0, 0, 0);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false, // Solid background
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1); // Pure white background
    containerRef.current.appendChild(renderer.domElement);

    // --- Create Custom Grayscale Particle Texture ---
    // Creates a soft-edged circle canvas texture with charcoal cores
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(18, 18, 18, 0.95)');    // Obsidian/charcoal center
        gradient.addColorStop(0.2, 'rgba(80, 80, 80, 0.6)');    // Soft grey body
        gradient.addColorStop(0.6, 'rgba(180, 180, 180, 0.15)'); // Outer fade glow
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();

    // --- Elegant 3D Grid Wave ---
    const AMOUNTX = 70;
    const AMOUNTY = 70;
    const SEPARATION = 2.4;
    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    let index = 0;
    
    // Curated grayscale/luxury color palette (charcoal to silver)
    const colorCharcoal = new THREE.Color('#1a1a1a'); 
    const colorGraphite = new THREE.Color('#555555'); 
    const colorSilver = new THREE.Color('#9e9e9e');   

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
        const z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
        positions[index] = x;
        positions[index + 1] = 0; // Dynamic height
        positions[index + 2] = z;

        // Color variation based on location
        const mixRatio = (ix / AMOUNTX + iy / AMOUNTY) / 2;
        let pColor;
        if (mixRatio < 0.45) {
          pColor = colorCharcoal.clone().lerp(colorGraphite, mixRatio * 2.2);
        } else {
          pColor = colorGraphite.clone().lerp(colorSilver, (mixRatio - 0.45) * 1.8);
        }

        colors[index] = pColor.r;
        colors[index + 1] = pColor.g;
        colors[index + 2] = pColor.b;

        index += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Points Material using standard blending for white background (Multiply/Normal)
    const material = new THREE.PointsMaterial({
      size: 1.5,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.NormalBlending, // Crucial for dark particles on white screen
      depthWrite: false,
      opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- Interaction States ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    let scrollY = 0;
    let targetScrollY = 0;

    const onPointerMove = (event) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('scroll', onScroll);

    // --- Render Loop ---
    let count = 0;
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth interpolation for mouse and scroll
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      scrollY += (targetScrollY - scrollY) * 0.04;

      count += 0.008; // Slower, more elegant wave speed

      const positionAttr = geometry.attributes.position;
      const array = positionAttr.array;

      let idx = 0;
      const mouseXWorld = mouseX * 60;
      const mouseZWorld = -mouseY * 60;

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const x = array[idx];
          const z = array[idx + 2];

          // Compute ripple distance from mouse project
          const dx = x - mouseXWorld;
          const dz = z - mouseZWorld;
          const dist = Math.sqrt(dx * dx + dz * dz);
          
          const rippleStrength = Math.max(0, 30 - dist) * 0.25;
          const mouseRipple = Math.sin(dist * 0.25 - count * 4) * rippleStrength;

          // Compute y position
          array[idx + 1] = 
            (Math.sin((ix + count * 3) * 0.15) * 3) +
            (Math.cos((iy + count * 2) * 0.15) * 3) + 
            mouseRipple;

          idx += 3;
        }
      }

      positionAttr.needsUpdate = true;

      // Parallax camera adjustments
      camera.position.x = mouseX * 12;
      camera.position.y = 32 + (mouseY * 4) - (scrollY * 0.02);
      camera.position.z = 90 + (scrollY * 0.02);
      camera.lookAt(0, -scrollY * 0.015, 0);

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="three-canvas-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#ffffff'
      }}
    />
  );
}

export default ThreeCanvas;
