'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Company {
  id: string;
  name: string;
  logo: React.ReactNode;
}

// 8 recognized business & technology ecosystem companies with crisp vector logos (24-30px)
const COMPANIES: Company[] = [
  {
    id: 'amazon',
    name: 'Amazon',
    logo: (
      <svg viewBox="0 0 48 48" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" fill="none">
        <rect width="48" height="48" rx="8" fill="#131921" />
        <path
          d="M23.5 14c-4.6 0-7.8 2.2-7.8 6.4 0 3.2 2 4.9 4.9 5.8 1.6.5 3.3.6 4.9.4v.8c0 1.4-.8 2.8-2.6 2.8-1.5 0-2.8-.8-3.1-2.2h-3.4c.4 3.2 3.1 5 6.5 5 4.3 0 6.2-2.4 6.2-6.2V20.5c0-.8.1-1.6.4-2.2h-3.4c-.2.5-.3 1.1-.3 1.6-1.1-1.3-2.8-1.9-5.3-1.9zm1.9 8.2c-1.3.2-2.7.2-3.8-.1-1.4-.4-2.2-1.3-2.2-2.6 0-1.5 1.1-2.6 3.1-2.6 1.7 0 2.9.8 2.9 2.4v2.9z"
          fill="#FFFFFF"
        />
        <path
          d="M13 35c8.5 4.8 20 4.2 24.5-.6.4-.4 0-.9-.5-.6-4.5 2.8-15.5 3.4-23.5-.8-.5-.3-.9.4-.5 1z"
          fill="#FF9900"
        />
        <path
          d="M38.8 33.2c-.8-.9-2.5-1.5-4.1-1.2-.4.1-.3.5 0 .7 1.6 1 2.7 2.3 3.3 3.4.2.4.6.3.7 0 .5-1.1.9-2.1.1-2.9z"
          fill="#FF9900"
        />
      </svg>
    ),
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    logo: (
      <svg viewBox="0 0 48 48" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" fill="none">
        <rect width="48" height="48" rx="8" fill="#2874F0" />
        <path
          d="M13 16h22l-3 20H16L13 16z"
          fill="#2874F0"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M19.5 16v-3a4.5 4.5 0 0 1 9 0v3"
          stroke="#FFE500"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M19 23h9M19 27.5h6"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: (
      <div className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 grid grid-cols-2 gap-0.5 p-1 bg-slate-50 rounded-lg border border-slate-200/60 shadow-inner">
        <div className="bg-[#F25022] rounded-[1px]" />
        <div className="bg-[#7FBA00] rounded-[1px]" />
        <div className="bg-[#00A4EF] rounded-[1px]" />
        <div className="bg-[#FFB900] rounded-[1px]" />
      </div>
    ),
  },
  {
    id: 'google',
    name: 'Google',
    logo: (
      <svg viewBox="0 0 48 48" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0">
        <rect width="48" height="48" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <g transform="translate(10, 10)">
          <path
            d="M26.3 14.3c0-.9-.1-1.8-.2-2.6H14v5h6.9c-.3 1.6-1.2 3-2.6 3.9v3.2h4.2c2.4-2.2 3.8-5.5 3.8-9.5z"
            fill="#4285F4"
          />
          <path
            d="M14 27c3.5 0 6.4-1.2 8.5-3.1l-4.2-3.2c-1.2.8-2.6 1.3-4.3 1.3-3.3 0-6.2-2.3-7.2-5.3H2.5v3.3C4.6 24.2 9 27 14 27z"
            fill="#34A853"
          />
          <path
            d="M6.8 16.7c-.3-.8-.4-1.7-.4-2.7s.1-1.9.4-2.7V8H2.5C1.6 9.8 1.1 11.8 1.1 14s.5 4.2 1.4 6l4.3-3.3z"
            fill="#FBBC05"
          />
          <path
            d="M14 6.3c1.9 0 3.6.7 4.9 1.9l3.7-3.7C20.4 2.4 17.5 1.2 14 1.2 9 1.2 4.6 4 2.5 8l4.3 3.3c1-3 3.9-5 7.2-5z"
            fill="#EA4335"
          />
        </g>
      </svg>
    ),
  },
  {
    id: 'apple',
    name: 'Apple',
    logo: (
      <div className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 flex items-center justify-center bg-slate-900 rounded-lg shadow-sm">
        <svg viewBox="0 0 170 170" className="w-3.5 h-3.5 text-white" fill="currentColor">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.3-9.67-11.22-20.9-14.77-33.68-3.55-12.78-5.33-24.61-5.33-35.48 0-14.46 3.69-26.4 11.07-35.83 7.38-9.43 16.71-14.28 27.99-14.54 4.8 0 10.11 1.25 15.93 3.75 5.82 2.5 9.73 3.8 11.73 3.9 1.48 0 5.46-1.35 11.94-4.05 6.48-2.7 12.18-3.9 17.1-3.6 12.63.63 22.84 5.38 30.63 14.25-10.99 6.63-16.36 15.82-16.12 27.56.24 9.17 3.82 16.94 10.74 23.3 6.92 6.36 15.08 9.94 24.48 10.74-2.12 6.53-4.75 13.08-7.89 19.64zM119.22 33.02c0-7.39 2.66-14.44 7.99-21.14 5.33-6.7 11.89-11.07 19.69-13.11-.25 1.48-.49 2.87-.74 4.18-.5 2.62-1.37 5.31-2.62 8.08-1.5 3.28-3.63 6.46-6.4 9.54-2.77 3.08-5.99 5.56-9.66 7.44-3.67 1.88-7.42 3.02-11.26 3.42.25-2.86.67-5.32 1-8.41z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'meta',
    name: 'Meta',
    logo: (
      <div className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 flex items-center justify-center bg-[#0668E1] rounded-lg shadow-sm">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="currentColor">
          <path d="M12 8.35c-1.84-2.61-4.14-4.1-6.68-4.1C2.39 4.25 0 6.64 0 10.4c0 4.2 3.08 8.1 7.23 8.1 2.37 0 4.41-1.28 5.77-3.15 1.36 1.87 3.4 3.15 5.77 3.15 4.15 0 7.23-3.9 7.23-8.1 0-3.76-2.39-6.15-5.32-6.15-2.54 0-4.84 1.49-6.68 4.1zm-4.77 8.05c-2.9 0-5.13-2.86-5.13-6 0-2.67 1.63-4.25 3.73-4.25 1.94 0 3.73 1.35 5.09 3.55-1.12 3.86-2.49 6.7-3.69 6.7zm9.54 0c-1.2 0-2.57-2.84-3.69-6.7 1.36-2.2 3.15-3.55 5.09-3.55 2.1 0 3.73 1.58 3.73 4.25 0 3.14-2.23 6-5.13 6z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'ibm',
    name: 'IBM',
    logo: (
      <div className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 flex items-center justify-center bg-[#0F62FE] rounded-lg shadow-sm p-0.5">
        <svg viewBox="0 0 28 16" className="w-5 h-3" fill="#FFFFFF">
          <path d="M0 0h28v1.8H0zm0 2.9h28v1.8H0zm0 2.9h28v1.8H0zm0 2.9h28v1.8H0zm0 2.9h28v1.8H0zm0 2.9h28v1.8H0z" />
          <rect x="2" y="0" width="4.5" height="16" fill="#FFFFFF" />
          <rect x="8.5" y="0" width="8" height="16" fill="#FFFFFF" rx="0.5" />
          <rect x="18.5" y="0" width="8" height="16" fill="#FFFFFF" />
        </svg>
      </div>
    ),
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logo: (
      <div className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 flex items-center justify-center bg-[#007CC3] rounded-lg shadow-sm">
        <span className="text-white font-black tracking-tighter text-[10px]">
          infy
        </span>
      </div>
    ),
  },
];

// Slow, elegant cinematic timing constants
const STEP_DWELL_MS = 1100; // ~1.1s calm dwell pause at front position
const STEP_TRANS_MS = 2400; // 2.4s slow, smooth rotation to next slot
const STEP_TOTAL_MS = STEP_DWELL_MS + STEP_TRANS_MS; // 3.5s per logo (28.0s for full 8-logo cycle)

// Easing function: smooth cubic in-out for silky cinematic acceleration and deceleration
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function CompanyOrbit3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveredRef = useRef(false);
  const hoverPauseTimeRef = useRef(0);
  const totalPausedTimeRef = useRef(0);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Subtle mouse parallax state
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let startTime = performance.now();
    const N = COMPANIES.length; // 8 logos
    const anglePerStep = (Math.PI * 2) / N;

    const updateLoop = (currentTime: number) => {
      // Gentle mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      // Handle pause on hover smoothly without jumps
      if (isHoveredRef.current) {
        if (hoverPauseTimeRef.current === 0) {
          hoverPauseTimeRef.current = currentTime;
        }
      } else {
        if (hoverPauseTimeRef.current > 0) {
          totalPausedTimeRef.current += currentTime - hoverPauseTimeRef.current;
          hoverPauseTimeRef.current = 0;
        }
      }

      const effectiveCurrentTime = isHoveredRef.current && hoverPauseTimeRef.current > 0
        ? hoverPauseTimeRef.current - totalPausedTimeRef.current
        : currentTime - totalPausedTimeRef.current;

      const elapsed = Math.max(0, effectiveCurrentTime - startTime);

      let currentAngle = 0;

      if (!prefersReducedMotion) {
        const stepIndex = Math.floor(elapsed / STEP_TOTAL_MS);
        const localTime = elapsed % STEP_TOTAL_MS;

        let stepProgress = 0;
        if (localTime > STEP_DWELL_MS) {
          const transTime = localTime - STEP_DWELL_MS;
          const normalizedTrans = Math.min(1, transTime / STEP_TRANS_MS);
          stepProgress = easeInOutCubic(normalizedTrans);
        }

        // Stepped progression around the 3D orbit
        currentAngle = (stepIndex + stepProgress) * anglePerStep;
      }

      // Parallax angles (gentle and natural)
      const pitch = mouseRef.current.y * 0.12; // up/down tilt
      const yaw = mouseRef.current.x * 0.16;   // left/right yaw

      // Compact, balanced orbit radius (leaves plenty of whitespace)
      const containerWidth = containerRef.current?.clientWidth || 440;
      const Rx = Math.min(168, Math.max(120, containerWidth * 0.36));
      const Ry = Rx * 0.35; // elliptical foreshortening
      const Rz = Rx * 0.85; // Z-depth

      COMPANIES.forEach((company, index) => {
        const el = cardsRef.current[index];
        if (!el) return;

        // When theta = PI/2, sin(theta) = 1 (front viewing position)
        const theta = currentAngle + index * anglePerStep + Math.PI / 2;

        // 3D coordinates along elliptical orbit
        const rawX = Math.cos(theta) * Rx;
        const rawY = -Math.sin(theta) * Ry;
        const rawZ = Math.sin(theta) * Rz;

        // Apply 3D parallax
        const cosYaw = Math.cos(yaw);
        const sinYaw = Math.sin(yaw);
        const cosPitch = Math.cos(pitch);
        const sinPitch = Math.sin(pitch);

        const x = rawX * cosYaw - rawZ * sinYaw;
        const z = rawX * sinYaw + rawZ * cosYaw;
        const y = rawY * cosPitch - z * sinPitch;

        // Normalized Z-depth: -1 (back) to +1 (front)
        const zNorm = z / Rz;
        const depth01 = Math.max(0, Math.min(1, (zNorm + 1) / 2)); // 0 (back) to 1 (front)

        // Readability constraints: front is 1.15x scale, back is 0.82x scale, always sharp and readable
        const scale = 0.82 + depth01 * 0.33; // 0.82 at back, 1.15 at front
        const opacity = 0.70 + depth01 * 0.30; // 0.70 at back, 1.00 at front
        const zIndex = Math.round(15 + depth01 * 50); // 15 at back, 65 at front

        // Apply hardware accelerated styles directly (zero React re-renders)
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(2);
        el.style.zIndex = zIndex.toString();
      });

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[370px] md:h-[410px] flex items-center justify-center select-none"
      aria-label="3D rotating company logo ecosystem orbit"
    >
      {/* Subtle Atmospheric Glow (Center remains completely empty) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Soft background radial wash */}
        <div className="w-[260px] h-[140px] sm:w-[320px] sm:h-[180px] rounded-full bg-gradient-to-tr from-indigo-200/20 via-purple-200/25 to-sky-200/15 blur-3xl" />
        
        {/* Very subtle elliptical orbital track */}
        <div
          className="w-[280px] h-[105px] sm:w-[340px] sm:h-[125px] rounded-[100%] border border-indigo-200/20 shadow-[0_0_30px_rgba(167,139,250,0.05)] opacity-40 pointer-events-none"
        />
      </div>

      {/* Floating 3D Orbital Company Logo Cards */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {COMPANIES.map((company, index) => (
          <div
            key={company.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
            }}
            className="absolute pointer-events-auto cursor-pointer will-change-transform"
            style={{
              transform: 'translate3d(0, 0, 0)',
            }}
            role="img"
            aria-label={`${company.name}`}
          >
            {/* Compact, clean, premium floating card (115-138px width, 46-52px height) */}
            <div
              className="group relative flex items-center gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/95 border border-white/90 shadow-[0_6px_20px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:border-indigo-200/70 hover:shadow-[0_12px_28px_rgba(99,102,241,0.18)] w-[115px] sm:w-[128px] md:w-[136px] h-[46px] sm:h-[50px] md:h-[52px]"
            >
              {/* Compact Logo */}
              <div className="flex items-center justify-center shrink-0">
                {company.logo}
              </div>

              {/* Clear, readable Company Name (11.5-13px) */}
              <div className="flex flex-col items-start justify-center overflow-hidden">
                <span className="text-[11.5px] sm:text-[12.5px] font-semibold text-[#0f172a] tracking-tight truncate leading-tight">
                  {company.name}
                </span>
              </div>

              {/* Subtle glass edge highlight */}
              <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
