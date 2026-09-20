import React from "react";
import Image from "next/image";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-sky-800" />
      ),
      href: "#",
    },

    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-sky-800" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-sky-800" />
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <Image
          src="https://assets.aceternity.com/logo-dark.png" 
          width={20} 
          height={20} 
          alt="Aceternity Logo"
          unoptimized
          referrerPolicy="no-referrer"
        /> 
      ), 
      href: "#", 
    }, 
    { 
      title: "Changelog", 
      icon: ( 
        <IconExchange className="h-full w-full text-sky-800" /> 
      ), 
      href: "#", 
    }, 
 
    { 
      title: "Twitter", 
      icon: ( 
        <IconBrandX className="h-full w-full text-sky-800" /> 
      ), 
      href: "#", 
    }, 
    { 
      title: "GitHub", 
      icon: ( 
        <IconBrandGithub className="h-full w-full text-sky-800" /> 
      ), 
      href: "#", 
    }, 
  ]; 
  return ( 
    <div className="flex items-start justify-center pt-8 h-[35rem] w-full"> 
      <FloatingDock 
        mobileClassName="translate-y-0" 
        items={links} 
      /> 
    </div> 
  ); 
}
