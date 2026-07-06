import { useEffect, useRef } from 'react';

export default function AIStudioGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const gridSize = 60; // Grid cell width & height in px

    // Active nodes at intersections that are glowing
    interface GlowingNode {
      col: number;
      row: number;
      intensity: number; // 0 to 1
      maxIntensity: number;
      decay: number;
      color: string;
    }

    // Light streaks that travel along grid lines
    interface LightStreak {
      type: 'h' | 'v'; // horizontal or vertical
      lineIndex: number; // Row index or col index
      pos: number; // Position along the line (0 to width or height)
      speed: number;
      length: number;
      color: string;
      alpha: number;
    }

    let streaks: LightStreak[] = [];
    const activeNodes: Map<string, GlowingNode> = new Map();

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      // Handle high-DPI screens for crisp lines
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    // Initialize resize
    resize();

    // Resize observer for fully responsive container resizing
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    // Spawn traveling streaks
    const spawnStreak = () => {
      if (streaks.length >= 15) return; // Limit total concurrent streaks

      const isHorizontal = Math.random() > 0.5;
      const color = Math.random() > 0.4 ? 'rgba(0, 210, 255, 0.4)' : 'rgba(139, 92, 246, 0.4)'; // Cyan or Purple
      
      if (isHorizontal) {
        const totalRows = Math.floor(height / gridSize);
        if (totalRows <= 0) return;
        const row = Math.floor(Math.random() * totalRows);
        const direction = Math.random() > 0.3 ? 1 : -1;
        streaks.push({
          type: 'h',
          lineIndex: row,
          pos: direction === 1 ? -100 : width + 100,
          speed: (1.5 + Math.random() * 2.5) * direction,
          length: 80 + Math.random() * 120,
          color,
          alpha: 0.15 + Math.random() * 0.25,
        });
      } else {
        const totalCols = Math.floor(width / gridSize);
        if (totalCols <= 0) return;
        const col = Math.floor(Math.random() * totalCols);
        const direction = Math.random() > 0.3 ? 1 : -1;
        streaks.push({
          type: 'v',
          lineIndex: col,
          pos: direction === 1 ? -100 : height + 100,
          speed: (1.5 + Math.random() * 2.5) * direction,
          length: 80 + Math.random() * 120,
          color,
          alpha: 0.15 + Math.random() * 0.25,
        });
      }
    };

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw absolute dark background
      ctx.fillStyle = '#07070a';
      ctx.fillRect(0, 0, width, height);

      // Smoothly interpolate mouse position for a premium, delayed dragging effect
      const mouse = mouseRef.current;
      if (mouse.active) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.12;
          mouse.y += (mouse.targetY - mouse.y) * 0.12;
        }
      } else {
        mouse.x += (-1000 - mouse.x) * 0.12;
        mouse.y += (-1000 - mouse.y) * 0.12;
      }

      // Draw faint background radial ambient lights (Google AI Studio aesthetic)
      const numGlows = 3;
      const glows = [
        { x: width * 0.2, y: height * 0.3, r: Math.min(width, height) * 0.5, c: 'rgba(0, 210, 255, 0.025)' },
        { x: width * 0.8, y: height * 0.7, r: Math.min(width, height) * 0.6, c: 'rgba(139, 92, 246, 0.02)' },
        { x: width * 0.5, y: height * 0.5, r: Math.min(width, height) * 0.4, c: 'rgba(16, 185, 129, 0.015)' },
      ];

      glows.forEach((g) => {
        const gradient = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
        gradient.addColorStop(0, g.c);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Highlight surrounding area under the mouse
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
        mouseGlow.addColorStop(0, 'rgba(0, 210, 255, 0.08)');
        mouseGlow.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)');
        mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw basic grid lines with varying alpha depending on mouse proximity
      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      // Draw Vertical Lines
      for (let c = 0; c <= cols; c++) {
        const x = c * gridSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        
        // Dynamic opacity: lines closer to mouse light up slightly more
        let opacity = 0.04;
        if (mouse.active && mouse.x > 0) {
          const dist = Math.abs(x - mouse.x);
          if (dist < 200) {
            opacity = 0.04 + (1 - dist / 200) * 0.08;
          }
        }
        ctx.strokeStyle = `rgba(0, 210, 255, ${opacity})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Draw Horizontal Lines
      for (let r = 0; r <= rows; r++) {
        const y = r * gridSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);

        // Dynamic opacity
        let opacity = 0.04;
        if (mouse.active && mouse.y > 0) {
          const dist = Math.abs(y - mouse.y);
          if (dist < 200) {
            opacity = 0.04 + (1 - dist / 200) * 0.08;
          }
        }
        ctx.strokeStyle = `rgba(0, 210, 255, ${opacity})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Periodic streak spawning
      if (Math.random() < 0.03) {
        spawnStreak();
      }

      // Update and draw streaks
      streaks = streaks.filter((s) => {
        s.pos += s.speed;

        // Check if out of bounds
        if (s.type === 'h') {
          if (s.speed > 0 && s.pos - s.length > width) return false;
          if (s.speed < 0 && s.pos + s.length < 0) return false;
        } else {
          if (s.speed > 0 && s.pos - s.length > height) return false;
          if (s.speed < 0 && s.pos + s.length < 0) return false;
        }

        // Draw streak
        const grad = ctx.createLinearGradient(
          s.type === 'h' ? s.pos - s.length : s.type === 'v' ? s.lineIndex * gridSize : 0,
          s.type === 'v' ? s.pos - s.length : s.type === 'h' ? s.lineIndex * gridSize : 0,
          s.type === 'h' ? s.pos : s.type === 'v' ? s.lineIndex * gridSize : 0,
          s.type === 'v' ? s.pos : s.type === 'h' ? s.lineIndex * gridSize : 0
        );

        grad.addColorStop(s.speed > 0 ? 0 : 1, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(s.speed > 0 ? 1 : 0, s.color.replace('0.4', s.alpha.toString()));

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        if (s.type === 'h') {
          ctx.moveTo(s.pos - s.length, s.lineIndex * gridSize);
          ctx.lineTo(s.pos, s.lineIndex * gridSize);
        } else {
          ctx.moveTo(s.lineIndex * gridSize, s.pos - s.length);
          ctx.lineTo(s.lineIndex * gridSize, s.pos);
        }
        ctx.stroke();

        // Illuminate nodes crossed by the streak
        const currentCell = Math.round(s.pos / gridSize);
        if (currentCell >= 0 && ((s.type === 'h' && currentCell < cols) || (s.type === 'v' && currentCell < rows))) {
          const col = s.type === 'h' ? currentCell : s.lineIndex;
          const row = s.type === 'h' ? s.lineIndex : currentCell;
          const key = `${col},${row}`;
          if (!activeNodes.has(key)) {
            activeNodes.set(key, {
              col,
              row,
              intensity: 0.1,
              maxIntensity: 0.5 + Math.random() * 0.4,
              decay: 0.015,
              color: s.color,
            });
          }
        }

        return true;
      });

      // Mouse close-by intersection lighting
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const mouseCol = Math.round(mouse.x / gridSize);
        const mouseRow = Math.round(mouse.y / gridSize);
        
        // Check grid nodes within a 2-cell radius
        for (let dc = -2; dc <= 2; dc++) {
          for (let dr = -2; dr <= 2; dr++) {
            const col = mouseCol + dc;
            const row = mouseRow + dr;
            if (col >= 0 && col <= cols && row >= 0 && row <= rows) {
              const nodeX = col * gridSize;
              const nodeY = row * gridSize;
              const dx = nodeX - mouse.x;
              const dy = nodeY - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              
              if (dist < 120) {
                const key = `${col},${row}`;
                const intensity = (1 - dist / 120) * 0.8;
                const existing = activeNodes.get(key);
                
                if (!existing || existing.intensity < intensity) {
                  activeNodes.set(key, {
                    col,
                    row,
                    intensity,
                    maxIntensity: intensity,
                    decay: 0.02,
                    color: 'rgba(0, 210, 255, 0.8)',
                  });
                }
              }
            }
          }
        }
      }

      // Draw and decay active glowing nodes (intersection points)
      activeNodes.forEach((node, key) => {
        const x = node.col * gridSize;
        const y = node.row * gridSize;

        // Draw micro-crosshair or subtle glowing dot
        ctx.fillStyle = node.color.replace('0.4', node.intensity.toString());
        ctx.beginPath();
        ctx.arc(x, y, 2 + node.intensity * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw outer ring
        ctx.strokeStyle = node.color.replace('0.4', (node.intensity * 0.4).toString());
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(x, y, 6 + node.intensity * 10, 0, Math.PI * 2);
        ctx.stroke();

        // Decay node
        if (!mouse.active || Math.sqrt(Math.pow(x - mouse.x, 2) + Math.pow(y - mouse.y, 2)) >= 120) {
          node.intensity -= node.decay;
          if (node.intensity <= 0) {
            activeNodes.delete(key);
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (canvas) {
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0"
      id="ai-studio-grid-container"
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-auto" />
    </div>
  );
}
