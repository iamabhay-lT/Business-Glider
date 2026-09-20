'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X, User, Briefcase, Building2, Store, LogOut } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from 'motion/react';
import { useAuth } from '@/context/AuthContext';

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: 'Find Jobs', href: '/jobs' },
  { title: 'Hire Employees', href: '/hire' },
  { title: 'Find Vendors', href: '/vendors' },
  { title: 'Register as Vendor', href: '/register-vendor' },
  { title: 'Create Profile', href: '/create-profile' },
];

function NavLink({
  item,
  mouseX,
}: {
  item: NavItem;
  mouseX: MotionValue<number>;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const isActive = pathname ? (pathname === item.href || pathname.startsWith(item.href + '/')) : false;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - (bounds.x + bounds.width / 2);
  });

  const scaleTransform = useTransform(distance, [-100, 0, 100], [1, 1.05, 1]);
  const scale = useSpring(scaleTransform, { mass: 0.1, stiffness: 220, damping: 18 });

  return (
    <Link
      ref={ref}
      href={item.href}
      className="relative px-2 py-1 transition-colors group cursor-pointer"
    >
      <motion.span
        style={{ scale, display: 'inline-block' }}
        className={`text-[13px] tracking-normal transition-colors duration-200 whitespace-nowrap ${
          isActive
            ? 'text-[#0f172a] font-semibold'
            : 'text-[#0f172a]/70 group-hover:text-[#0f172a] font-medium'
        }`}
      >
        {item.title}
      </motion.span>
    </Link>
  );
}

export default function LightNav() {
  const mouseX = useMotionValue(Infinity);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, role, openLogin, openRoleSelect, logout } = useAuth();

  const dashboardHref = role === 'employer' 
    ? '/dashboard/employer' 
    : role === 'vendor' 
    ? '/vendors' 
    : '/dashboard/job-seeker';

  return (
    <header className="w-full relative z-50">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-4 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link 
          href="/" 
          className="flex flex-col text-left group hover:opacity-85 transition-opacity"
        >
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#0f172a] uppercase leading-none">
            BUSINESS
          </span>
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#0f172a] uppercase leading-none mt-1">
            GLIDER<span className="text-[9px] font-normal align-top ml-0.5">™</span>
          </span>
        </Link>

        {/* Center: Navigation Links with subtle magnification physics */}
        <motion.nav
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="hidden lg:flex items-center gap-6 xl:gap-8"
        >
          {navItems.map((item) => (
            <NavLink key={item.title} item={item} mouseX={mouseX} />
          ))}
        </motion.nav>

        {/* Right: Actions (Dashboard / Login / Role Switcher) */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <div className="flex items-center gap-2">
                <Link
                  href={dashboardHref}
                  className="flex items-center gap-1.5 bg-[#0f172a] text-white px-4 py-2.5 rounded-full text-xs font-medium hover:bg-[#1e293b] hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Dashboard</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" />
                </Link>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="p-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Account Options"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
                </button>
              </div>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-800">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.fullName || 'Active User'}</p>
                    <p className="text-[11px] text-slate-500 capitalize">Role: {role?.replace('_', ' ')}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/dashboard/job-seeker"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-xl"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-indigo-600" /> Candidate Portal
                    </Link>
                    <Link
                      href="/dashboard/employer"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-xl"
                    >
                      <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Employer Portal
                    </Link>
                    <Link
                      href="/vendors"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-xl"
                    >
                      <Store className="w-3.5 h-3.5 text-purple-600" /> Vendor Directory
                    </Link>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        openRoleSelect();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-xl"
                    >
                      Switch Mode...
                    </button>
                  </div>
                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openLogin()}
              className="flex items-center gap-1.5 bg-[#0f172a] text-white px-5 py-2.5 rounded-full text-xs font-medium hover:bg-[#1e293b] hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Login / Sign Up</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" strokeWidth={2} />
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#0f172a]/70 hover:text-[#0f172a] hover:bg-black/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-[#0f172a]/10 px-6 py-6 shadow-xl flex flex-col gap-3 z-50 text-slate-900"
          >
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-[#0f172a]/80 hover:text-[#0f172a] py-2 border-b border-slate-100 last:border-none"
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link
                href="/dashboard/job-seeker"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold py-2.5 px-4 rounded-xl bg-indigo-50 text-indigo-700 text-center"
              >
                Job Seeker Dashboard
              </Link>
              <Link
                href="/dashboard/employer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-700 text-center"
              >
                Employer Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

