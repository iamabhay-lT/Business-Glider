"use client";
import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName || ""} />
      <FloatingDockMobile items={items} className={mobileClassName || ""} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  
  return (
    <div className={cn("relative block md:hidden pointer-events-auto", className || "")}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 top-full mt-4 flex flex-col gap-3 items-center"
          >
            {items.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, transition: { delay: idx * 0.05 } }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-[20px] transition-colors shadow-[0_0_15px_rgba(14,165,233,0.1)]",
                      isActive 
                        ? "bg-white/70 border border-sky-400/60 shadow-[0_0_20px_rgba(14,165,233,0.3)] text-sky-900" 
                        : "bg-white/45 border border-sky-400/35 text-sky-700 hover:bg-white/60 hover:text-sky-900"
                    )}
                  >
                    <div className="h-5 w-5">{item.icon}</div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/45 backdrop-blur-[20px] backdrop-saturate-150 border border-sky-400/35 shadow-[0_0_20px_rgba(14,165,233,0.15)] text-sky-800"
      >
        <IconLayoutNavbarCollapse className="h-6 w-6" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-[60px] items-center gap-4 rounded-[24px] px-3 bg-white/45 backdrop-blur-[20px] backdrop-saturate-150 border border-sky-400/35 shadow-[0_0_20px_rgba(14,165,233,0.1)] pointer-events-auto",
        className || ""
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = pathname === href;

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  let width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  let heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-full transition-colors duration-300",
          isActive
            ? "bg-white/80 border border-sky-400/60 shadow-[0_0_15px_rgba(56,189,248,0.25)] text-[#0f172a]"
            : "bg-white/30 border border-sky-200/40 text-sky-800 hover:bg-white/60 hover:border-sky-300/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -2, x: "-50%" }}
              className="absolute top-full mt-3 left-1/2 w-fit rounded-md border border-sky-400/30 bg-white/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold tracking-wide whitespace-pre text-[#0f172a] shadow-sm pointer-events-none"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
