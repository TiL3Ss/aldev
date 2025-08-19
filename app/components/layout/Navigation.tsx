// app/components/layout/Navigation.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button
} from '@heroui/react';
import Image from 'next/image';

interface NavigationProps {
  className?: string;
}

const navItems = [
  { key: 'home', label: 'Inicio', href: '#home' },
  { key: 'tech', label: 'Tecnologías', href: '#tech' },
  { key: 'projects', label: 'Proyectos', href: '#projects' },
  { key: 'contact', label: 'Contacto', href: '#contact' },
];

export const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Detectar sección activa
      const sections = ['home', 'tech', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className={`
        fixed top-0 z-50 transition-all duration-500 ease-out
        ${isScrolled 
          ? 'bg-white/70 dark:bg-black/70 backdrop-blur-3xl border-b border-black/5 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-white/5' 
          : 'bg-transparent'
        }
        ${className}
      `}
      maxWidth="xl"
      position="sticky"
      height="84px"
    >
      {/* Brand */}
      <NavbarContent className="pl-6 pt-2">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-white/10 rounded-full p-2 transition-all duration-300"
        />
        <NavbarBrand>
          <Link
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="
              flex items-center gap-3 hover:scale-105 transition-all duration-300
              tracking-tight py-2
            "
          >
            {/* Logo */}
            <div className="relative">
              <div
              className="
                w-10 h-10 p-2 rounded-xl
                bg-gradient-to-br from-red-500 via-orange-500 to-red-500
                [mask:url('/images/logo_b.svg')] [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain]
                transition-all duration-300 hover:drop-shadow-lg
              "
            ></div>
            </div>
            
            {/* Name */}
            <span className="
              font-bold text-2xl bg-gradient-to-r from-red-600 via-orange 0 to-red-500 
              bg-clip-text text-transparent
            ">
              Alvaro
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex" justify="center">
        <div className="
          flex items-center gap-2 p-3 rounded-2xl 
          bg-white/60 dark:bg-black/40 backdrop-blur-2xl
          border border-black/5 dark:border-white/10
          shadow-lg shadow-black/5 dark:shadow-white/5
        ">
          {navItems.map((item) => (
            <NavbarItem key={item.key}>
              <Link
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`
                  px-5 py-3 rounded-xl font-medium transition-all duration-300 relative
                  text-sm tracking-wide
                  ${activeSection === item.key 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-white/10 hover:text-red-600 dark:hover:text-red-400'
                  }
                `}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      {/* CTA Button */}
      <NavbarContent justify="end" className="pr-6 pt-2">
        <NavbarItem>
          <Button
            as={Link}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="
              bg-gradient-to-r from-red-600 to-orange text-white
              hover:shadow-lg hover:shadow-red-500/30
              transition-all duration-300 hover:scale-105
              font-semibold border-0 backdrop-blur-xl
              px-6 py-2
            "
            radius="full"
            size="lg"
          >
            Hablemos
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="
        bg-white/80 dark:bg-black/80 backdrop-blur-3xl mt-4
        border border-black/5 dark:border-white/10 rounded-3xl mx-4
        shadow-2xl shadow-black/10 dark:shadow-white/10
      ">
        <div className="p-6">
          {/* Mobile Brand with Logo */}
          <div className="mb-8 pb-6 border-b border-gray-200/50 dark:border-gray-600/50">
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center gap-3 justify-center"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-orange-500 to-red-500 
                [mask:url('/images/logo_b.svg')] [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain]">
              </div>
              <span className="
                font-bold text-2xl bg-gradient-to-r from-red-600 via-orange to-red-500
                bg-clip-text text-transparent
              ">
                Alvaro
              </span>
            </Link>
          </div>

          {navItems.map((item, index) => (
            <NavbarMenuItem key={item.key} className="mb-3">
              <Link
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`
                  w-full p-4 rounded-2xl text-lg font-medium transition-all duration-300
                  flex items-center justify-between group
                  ${activeSection === item.key 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-white/10'
                  }
                `}
                size="lg"
              >
                <span>{item.label}</span>
                <div className="w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </NavbarMenuItem>
          ))}
          
          <NavbarMenuItem className="mt-8">
            <Button
              as={Link}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="
                w-full bg-gradient-to-r from-red-600 to-orange text-white
                hover:shadow-lg hover:shadow-red-500/30
                transition-all duration-300 hover:scale-[1.02]
                font-semibold h-14
              "
              radius="full"
              size="lg"
            >
              Conectar
            </Button>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};