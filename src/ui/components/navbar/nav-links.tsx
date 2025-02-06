import { Home, Plus, Sheet } from 'lucide-react';
import { JSX } from 'react';

export type NavLinkType = {
  href: string;
  label: string;
  icon: JSX.Element;
};

export const navLinks = [
  { href: '/dashboard', label: 'Inicio', icon: <Home /> },
  { href: '/transactions/new', label: 'Cargar', icon: <Plus /> },
  { href: '/transactions', label: 'Movimientos', icon: <Sheet /> },
];
