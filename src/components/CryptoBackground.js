import React, { useEffect, useRef } from 'react';

const CryptoBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced cryptography symbols and elements
    const cryptoSymbols = [
      // Security symbols
      '🔐', '🔑', '🛡️', '🔒', '🔓', '🔏', '🔐', '🗝️',
      // Crypto algorithms
      'SHA256', 'RSA', 'AES', 'MD5', 'SSL', 'TLS', 'ECDSA', 'DES',
      'HMAC', 'PBKDF2', 'BCrypt', 'Argon2', 'ChaCha20', 'Poly1305',
      // Binary and hex
      '0x41', '0xFF', '0x00', '101010', '110011', '001100', '111000',
      '0101', '1010', '1100', '0011', '1111', '0000', '1001', '0110',
      // Crypto terms
      'HASH', 'KEY', 'SALT', 'IV', 'NONCE', 'MAC', 'HMAC', 'PKI',
      'CA', 'CSR', 'X.509', 'PGP', 'GPG', 'ECDH', 'DH', 'DSA',
      // Programming symbols
      '{}', '[]', '<>', '()', '&&', '||', '!=', '==', '=>', '<=',
      '++', '--', '+=', '-=', '*=', '/=', '%=', '^=', '|=', '&=',
      // Mathematical symbols
      '∑', '∆', '∞', '≈', '≠', '≤', '≥', '∴', '∈', '∉', '⊕', '⊗',
      'π', 'φ', 'λ', 'α', 'β', 'γ', 'δ', 'ε', 'θ', 'μ', 'σ', 'ω',
      // Network security
      'VPN', 'TOR', 'DNS', 'IP', 'TCP', 'UDP', 'HTTP', 'HTTPS',
      'SSH', 'FTP', 'SFTP', 'SCP', 'LDAP', 'LDAPS', 'SAML', 'OAuth'
    ];

    const particles = [];
    const matrixColumns = [];
    const numParticles = 80;
    const numColumns = Math.floor(canvas.width / 20);
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    // Mouse interaction
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);

    // Matrix rain columns
    class MatrixColumn {
      constructor(x) {
        this.x = x;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 25 + 15; // ULTRA SPEED: 15-40
        this.symbols = [];
        this.length = Math.random() * 20 + 10;
        this.opacity = Math.random() * 0.8 + 0.2;
        
        for (let i = 0; i < this.length; i++) {
          this.symbols.push({
            char: cryptoSymbols[Math.floor(Math.random() * cryptoSymbols.length)],
            changeTime: Math.random() * 5 // ULTRA FAST symbol changes
          });
        }
      }

      update() {
        this.y += this.speed;
        
        if (this.y > canvas.height + this.length * 20) {
          this.y = -this.length * 20;
          this.speed = Math.random() * 25 + 15; // ULTRA SPEED on reset
          this.opacity = Math.random() * 0.8 + 0.2;
        }

        // Randomly change symbols
        this.symbols.forEach(symbol => {
          symbol.changeTime--;
          if (symbol.changeTime <= 0) {
            symbol.char = cryptoSymbols[Math.floor(Math.random() * cryptoSymbols.length)];
            symbol.changeTime = Math.random() * 5 + 2; // ULTRA FAST symbol changes
          }
        });
      }

      draw() {
        this.symbols.forEach((symbol, i) => {
          const y = this.y + i * 20;
          if (y > 0 && y < canvas.height) {
            const alpha = this.opacity * (1 - i / this.length);
            ctx.fillStyle = i === 0 ? '#ffffff' : `rgba(74, 222, 128, ${alpha})`;
            ctx.font = '14px "Courier New", monospace';
            ctx.fillText(symbol.char, this.x, y);
          }
        });
      }
    }

    // Enhanced chaotic particle class
    class CryptoParticle {
      constructor() {
        this.reset();
        this.symbol = cryptoSymbols[Math.floor(Math.random() * cryptoSymbols.length)];
        this.fontSize = Math.random() * 25 + 12;
        this.opacity = Math.random() * 0.9 + 0.1;
        this.rotationSpeed = (Math.random() - 0.5) * 1.0; // ULTRA FAST rotation
        this.rotation = 0;
        this.pulseSpeed = Math.random() * 0.5 + 0.3; // ULTRA FAST pulsing
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.depth = Math.random() * 100 + 50;
        this.symbolChangeTimer = Math.random() * 5 + 2; // ULTRA FAST symbol changes
        this.chaosLevel = Math.random() * 2 + 1;
        this.glitchTimer = 0;
        this.isGlitching = false;
        this.originalX = this.x;
        this.originalY = this.y;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 10; // ULTRA FAST horizontal movement
        this.vy = (Math.random() - 0.5) * 10; // ULTRA FAST vertical movement
        this.vz = (Math.random() - 0.5) * 5; // ULTRA FAST depth movement
      }

      update() {
        // Chaotic movement with time-based noise
        const noiseX = Math.sin(time * 0.15 + this.x * 0.1) * this.chaosLevel; // ULTRA FAST noise
        const noiseY = Math.cos(time * 0.15 + this.y * 0.1) * this.chaosLevel; // ULTRA FAST noise
        
        // Mouse repulsion/attraction (chaotic)
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          const chaosForce = Math.sin(time * 1.0) > 0 ? 1 : -1; // ULTRA FAST chaos switching
          this.vx += (dx / distance) * force * 0.05 * chaosForce; // ULTRA STRONG force
          this.vy += (dy / distance) * force * 0.05 * chaosForce; // ULTRA STRONG force
        }
        
        // Add chaos to movement
        this.vx += noiseX * 0.3; // ULTRA STRONG chaos
        this.vy += noiseY * 0.3; // ULTRA STRONG chaos
        
        // Random velocity spikes (ULTRA frequent)
        if (Math.random() < 0.2) {
          this.vx += (Math.random() - 0.5) * 15; // ULTRA STRONG spikes
          this.vy += (Math.random() - 0.5) * 15; // ULTRA STRONG spikes
        }
        
        this.x += this.vx;
        this.y += this.vy;
        this.depth += this.vz;
        this.rotation += this.rotationSpeed;
        this.pulsePhase += this.pulseSpeed;

        // Glitch effect
        this.glitchTimer--;
        if (this.glitchTimer <= 0) {
          this.isGlitching = Math.random() < 0.1;
          this.glitchTimer = Math.random() * 100 + 20;
        }

        // Dynamic symbol changing (faster)
        this.symbolChangeTimer--;
        if (this.symbolChangeTimer <= 0) {
          this.symbol = cryptoSymbols[Math.floor(Math.random() * cryptoSymbols.length)];
          this.symbolChangeTimer = Math.random() * 3 + 1; // ULTRA FAST changes
          this.fontSize = Math.random() * 25 + 12;
        }

        // Apply friction with chaos (less friction for more speed)
        const friction = 0.98 + Math.sin(time * 0.5) * 0.02; // Less friction, faster chaos
        this.vx *= friction;
        this.vy *= friction;

        // Chaotic wrapping
        if (this.x < -100) this.x = canvas.width + 100;
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.y < -100) this.y = canvas.height + 100;
        if (this.y > canvas.height + 100) this.y = -100;
        
        // Dynamic depth changes
        this.vz += (Math.random() - 0.5) * 0.5;
        if (this.depth < 0) this.depth = 150;
        if (this.depth > 150) this.depth = 0;
      }

      draw() {
        ctx.save();
        
        // 3D perspective effect
        const scale = 150 / (150 + this.depth);
        let alpha = this.opacity * scale;
        
        // Glitch effects
        let offsetX = 0, offsetY = 0;
        if (this.isGlitching) {
          offsetX = (Math.random() - 0.5) * 10;
          offsetY = (Math.random() - 0.5) * 10;
          alpha *= Math.random() * 0.5 + 0.5;
        }
        
        ctx.globalAlpha = alpha;
        ctx.translate(this.x + offsetX, this.y + offsetY);
        ctx.rotate(this.rotation);
        ctx.scale(scale, scale);
        
        // Chaotic pulsing effect
        const pulse = Math.sin(this.pulsePhase) * 0.4 + 1;
        const chaosPulse = Math.sin(time * 0.05 + this.x * 0.01) * 0.2 + 1;
        ctx.scale(pulse * chaosPulse, pulse * chaosPulse);
        
        // Dynamic green colors with chaos
        const greenShades = [
          '#4ade80', '#22c55e', '#16a34a', '#15803d', 
          '#166534', '#14532d', '#34d399', '#10b981',
          '#00ff00', '#00cc00', '#00aa00', '#ffffff'
        ];
        
        const colorIndex = Math.floor((time + this.x + this.y) * 0.1) % greenShades.length;
        ctx.fillStyle = greenShades[colorIndex];
        
        // Dynamic font with chaos
        const chaosFont = this.fontSize + Math.sin(time * 0.1 + this.x * 0.01) * 5;
        ctx.font = `${chaosFont}px 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Enhanced glow effect
        const glowIntensity = 5 + Math.sin(time * 0.1) * 10;
        ctx.shadowColor = this.isGlitching ? '#ff0000' : '#4ade80';
        ctx.shadowBlur = glowIntensity;
        
        // Multiple render for glitch effect
        if (this.isGlitching) {
          ctx.fillStyle = '#ff0040';
          ctx.fillText(this.symbol, -2, -2);
          ctx.fillStyle = '#00ffff';
          ctx.fillText(this.symbol, 2, 2);
        }
        
        ctx.fillText(this.symbol, 0, 0);
        
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push(new CryptoParticle());
    }

    // Initialize matrix columns
    for (let i = 0; i < numColumns; i++) {
      matrixColumns.push(new MatrixColumn(i * 20));
    }

    // Draw connections between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.3;
            ctx.strokeStyle = `rgba(74, 222, 128, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      time += 10; // ULTRA FAST time progression
      
      // Dynamic trail effect (ULTRA fast pulsing)
      const trailOpacity = 0.05 + Math.sin(time * 0.2) * 0.1; // Faster trails
      ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw matrix columns (background layer)
      matrixColumns.forEach(column => {
        column.update();
        column.draw();
      });
      
      // Draw chaotic connections (ULTRA frequent)
      if (Math.sin(time * 0.3) > 0.1) {
        drawConnections();
      }
      
      // Sort particles by depth for proper 3D rendering
      particles.sort((a, b) => b.depth - a.depth);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Removed green screen flash effects
      
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="crypto-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none',
        opacity: 0.6
      }}
    />
  );
};

export default CryptoBackground;
