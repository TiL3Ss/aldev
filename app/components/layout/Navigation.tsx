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
        fixed top-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-cream/80 backdrop-blur-xl border-b border-orange/20 shadow-lg' 
          : 'bg-transparent'
        }
        ${className}
      `}
      maxWidth="xl"
      position="sticky"
    >
      {/* Brand */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-navy"
        />
        <NavbarBrand>
          <Link
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="font-bold text-2xl text-navy hover:text-orange transition-colors"
          >
            Alvaro
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.key}>
            <Link
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className={`
                font-medium transition-all duration-300 relative
                ${activeSection === item.key 
                  ? 'text-orange' 
                  : 'text-navy hover:text-orange'
                }
              `}
            >
              {item.label}
              {activeSection === item.key && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange to-burgundy rounded-full" />
              )}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* CTA Button */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="
              bg-gradient-to-r from-orange to-burgundy text-white
              hover:shadow-lg hover:shadow-orange/25
              transition-all duration-300 hover:-translate-y-0.5
              font-semibold
            "
            radius="full"
            size="md"
          >
            Hablemos
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-cream/95 backdrop-blur-xl mt-4">
        {navItems.map((item) => (
          <NavbarMenuItem key={item.key}>
            <Link
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className={`
                w-full text-lg font-medium transition-colors
                ${activeSection === item.key 
                  ? 'text-orange' 
                  : 'text-navy hover:text-orange'
                }
              `}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        
        <NavbarMenuItem className="mt-4">
          <Button
            as={Link}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="
              w-full bg-gradient-to-r from-orange to-burgundy text-white
              hover:shadow-lg hover:shadow-orange/25
              transition-all duration-300
              font-semibold
            "
            radius="full"
            size="lg"
          >
            Conectar
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};