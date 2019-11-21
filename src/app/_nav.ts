interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    divider: true
  },
  {
    name: 'Clients',
    url: '/fidelite/clients',
    icon: 'icon-user',
    children: [
      {
        name: 'Creer un client',
        url: '/fidelite/clients/creer-clients',
        icon: 'icon-drop'
      },
      {
        name: 'Lister les clients',
        url: '/fidelite/clients/lister-clients',
        icon: 'icon-pencil',
      }
    ]
  },
  {
    name: 'Commerçants',
    url: '/fidelite/commercants',
    icon: 'icon-people',
    children: [
      {
        name: 'Creer un commercant',
        url: '/fidelite/commercants/creer-commercant',
        icon: 'icon-pencil'
      },
      {
        name: 'Lister commercants',
        url: '/fidelite/commercants/lister-commercants',
        icon: 'icon-people',
      },
      {
        name: 'Points de vente',
        url: '/fidelite/commercants/lister-points-de-vente',
        icon: 'icon-star',
      },
      {
        name: 'Terminaux',
        url: '/fidelite/commercants/lister-terminaux',
        icon: 'icon-people',
      }
    ]
  },
  {
    name: 'Cartes',
    url: '/fidelite/cartes',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Creer une carte',
        url: '/fidelite/cartes/creer-carte',
        icon: 'icon-pencil'
      },
      {
        name: 'Lister les cartes',
        url: '/fidelite/cartes/lister-cartes',
        icon: 'icon-people',
      },
      {
        name: 'Transactions',
        url: '/fidelite/cartes/lister-transactions',
        icon: 'icon-people',
      }
    ]
  },

  {
    name: 'Categories cartes',
    url: '/fidelite/categories',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Creer une catégorie C.',
        url: '/fidelite/categories/creer-categorie',
        icon: 'icon-user-follow'
      },
      {
        name: 'Lister les catégories C.',
        url: '/fidelite/categories/lister-categories',
        icon: 'icon-people',
      }
    ]
  },
  {
    divider: true
  },
  {
    name: 'Offres',
    url: '/fidelite/fidelisations/lister-offres',
    icon: 'icon-speedometer',
  },
  {
    name: 'Types offres',
    url: '/fidelite/fidelisations/lister-type-offres',
    icon: 'icon-speedometer',
  },
  {
    divider: true
  },
  {
    name: 'Regionalisation',
    url: '/fidelite/fidelisations',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Gestion des pays',
        url: '/fidelite/fidelisations/lister-pays',
        icon: 'icon-user-follow'
      },
      {
        name: 'Gestion des regions',
        url: '/fidelite/fidelisations/lister-regions',
        icon: 'icon-user-follow'
      },
      {
        name: 'Gestion des villes',
        url: '/fidelite/fidelisations/lister-villes',
        icon: 'icon-user-follow'
      },
    ]
  }
];

