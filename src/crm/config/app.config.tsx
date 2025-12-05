import {
  BriefcaseBusiness,
  Building2,
  CheckSquare,
  CircleEllipsis,
  GalleryVerticalEnd,
  Home,
  Users,
} from 'lucide-react';

import { NavConfig } from '../types';

export const MAIN_NAV: NavConfig = [
  {
    title: 'Dashboard',
    icon: Home,
    path: '/dashboard',
    id: 'dashboard',
  },
  {
    icon: CheckSquare,
    title: 'Tasks',
    path: '/tasks',
    pinnable: true,
    pinned: true,
    badge: '3',
    id: 'tasks',
    more: true,
    new: {
      tooltip: 'New Task',
      path: '/tasks/new',
    },
  },
  {
    icon: GalleryVerticalEnd,
    title: 'Notes',
    path: '/notes',
    pinnable: true,
    pinned: true,
    id: 'notes',
    new: {
      tooltip: 'New Notes',
      path: '/notes',
    },
  },
  {
    icon: Users,
    title: 'Contacts',
    path: '/contacts',
    pinnable: true,
    pinned: true,
    id: 'contacts',
    new: {
      tooltip: 'New Contact',
      path: '/contacts',
    },
  },
  {
    icon: Building2,
    title: 'Companies',
    path: '/companies',
    pinnable: true,
    pinned: true,
    id: 'companies',
    new: {
      tooltip: 'New Company',
      path: '/companies',
    },
  },

  {
    icon: BriefcaseBusiness,
    title: 'Company',
    path: '/company',
    pinnable: true,
    pinned: true,
    id: 'company',
  },

  {
    icon: CircleEllipsis,
    title: 'More',
    id: 'more',
    dropdown: true,
  },
];
