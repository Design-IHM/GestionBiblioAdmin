```
GestionBiblioAdmin/
├── public/
│   ├── locales/         # Internationalization files
│   │   ├── en/          # English translations
│   │   │   └── common.json
│   │   └── fr/          # French translations
│   │       └── common.json
│   ├── assets/          # Static assets like images
│   │   └── ...
│   └── index.html
├── src/
│   ├── components/      # Component-based architecture
│   │   ├── auth/        # Authentication related components
│   │   │   └── ...
│   │   ├── books/       # Book management components
│   │   │   ├── BookCard.tsx
│   │   │   ├── BookList.tsx
│   │   │   └── ...
│   │   ├── catalogue/   # Catalogue browsing components
│   │   │   └── ...
│   │   ├── common/      # Common UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   ├── layout/      # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── ...
│   │   └── admin/       # Admin-specific components
│   │       └── ...
│   ├── config/          # Configuration files
│   │   └── firebase.ts
│   ├── constants/       # Constants and defaults
│   │   └── ...
│   ├── context/         # React context providers
│   │   ├── UserContext.tsx
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   │   ├── useI18n.ts   # Internationalization hook
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── LandingPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── ...
│   ├── services/        # Service layer for API calls
│   │   ├── configService.ts
│   │   └── ...
│   ├── styles/          # Global styles
│   │   └── theme.css
│   ├── types/           # TypeScript type definitions
│   │   └── ...
│   ├── utils/           # Utility functions
│   │   ├── i18n.ts      # i18n utility functions
│   │   └── ...
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── tsconfig.json
``