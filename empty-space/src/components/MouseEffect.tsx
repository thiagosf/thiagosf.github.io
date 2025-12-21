import { useEffect, useRef } from 'react';

const sourceCodeLines = [
  'const [state, setState] = useState(null);',
  'function handleClick() { /* ... */ }',
  'return <div className="app">Hello</div>;',
  'useEffect(() => { /* ... */ }, []);',
  'const fetchData = async () => { /* ... */ };',
  'export default App;',
  'const theme = useTheme();',
  'if (!data) return <Spinner />;',
  'const result = arr.map(fn);',
  'const x = y => z;',
];

function isMobile() {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

export default function MouseEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, moved: false });
  const animationRef = useRef<number | null>(null);
  const grid = useRef<{ rows: string[]; cols: number; lineHeight: number; charWidth: number } | null>(null);

  useEffect(() => {
    if (isMobile()) return;
    const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
  const fontSize = 16;
  const lineHeight = 24;
  let charWidth = 10;
  let cols = Math.ceil(width / charWidth);
  let rows = Math.ceil(height / lineHeight);

    function resize() {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      if (!canvas) return;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.font = `${fontSize}px 'Space Grotesk', monospace`;
      ctx.textBaseline = 'top';
      charWidth = ctx.measureText('M').width;
      cols = Math.ceil(width / charWidth);
      rows = Math.ceil(height / lineHeight);
      grid.current = { rows: Array.from({ length: rows }, (_, i) => sourceCodeLines[i % sourceCodeLines.length]), cols, lineHeight, charWidth };
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx || !grid.current) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      if (!mouse.current.moved) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      const radius = 240;
      const glowRadius = 70;
      const { x, y } = mouse.current;
      const { rows: codeRows, cols, lineHeight, charWidth } = grid.current;
      for (let row = 0; row < codeRows.length; row++) {
        const line = codeRows[row];
        for (let col = 0; col < cols; col++) {
          const char = line[(col % line.length)];
          const cx = col * charWidth;
          const cy = row * lineHeight;
          const dx = cx - x;
          const dy = cy - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let alpha = 0;
          if (dist < radius) {
            alpha = Math.max(0, 1 - Math.pow(dist / radius, 2.5));
            if (dist < glowRadius) alpha = 0.8 + 0.2 * (1 - dist / glowRadius);
          }
          if (alpha > 0.01) {
            ctx.save();
            ctx.globalAlpha = alpha;
            if (dist < glowRadius) {
              ctx.shadowColor = 'hsl(var(--primary))';
              ctx.shadowBlur = 8;
            } else {
              ctx.shadowBlur = 0;
            }
            ctx.fillStyle = 'hsl(var(--muted-foreground))';
            ctx.fillText(char, cx, cy);
            ctx.restore();
          }
        }
      }
      animationRef.current = requestAnimationFrame(draw);
    }

    function onMove(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.moved = true;
    }
    window.addEventListener('mousemove', onMove);
    animationRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  if (isMobile()) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
      aria-hidden="true"
      tabIndex={-1}
      style={{ background: 'transparent' }}
    />
  );
}
