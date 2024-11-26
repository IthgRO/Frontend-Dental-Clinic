# Dental Booking System

A modern booking system for dental clinics built with React, providing both SaaS functionality and integration capabilities.

## Features

- 🦷 Dental appointment scheduling
- 👥 Multi-user support (Admins, Dentists, Patients)
- 🏥 Multi-clinic management
- 📅 Real-time availability
- 📱 SMS and Email notifications
- 🌐 Timezone support
- 💰 Service and pricing management

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Zustand
- **API Client**: TanStack Query
- **UI Components**: Ant Design
- **Styling**: TailwindCSS
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Routing**: React Router
- **Date Management**: date-fns
- **Calendar**: FullCalendar
- **Notifications**: react-hot-toast

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/dental-booking-system.git
cd dental-booking-system
```

2. Install dependencies

```bash
npm install
```

3. Create environment file

```bash
cp .env.example .env
```

4. Start development server

```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components
│   ├── features/    # Feature-specific components
│   └── layouts/     # Layout components
├── pages/           # Route pages
├── store/           # Zustand stores
├── services/        # API services
├── types/           # TypeScript definitions
├── utils/           # Utility functions
├── hooks/           # Custom hooks
├── constants/       # Constants and configurations
└── assets/         # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Core Features

### Authentication

- Login/Register system
- Role-based access control
- Password recovery

### Booking System

- Real-time availability checking
- Service selection
- Duration management
- Conflict prevention

### Clinic Management

- Multiple clinic support
- Staff management
- Service configuration
- Working hours setup

### User Types

#### Admin

- Manage clinics
- Configure system settings
- View analytics
- Manage users

#### Dentist

- Manage schedule
- View appointments
- Configure services
- Handle bookings

#### Patient

- Book appointments
- View history
- Manage notifications
- Update profile

## Environment Variables

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Dental Booking System
VITE_APP_VERSION=1.0.0
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow ESLint rules
- Write self-documenting code
- Use proper component organization

### State Management

- Use Zustand for global state
- Use React Query for server state
- Keep component state local when possible

### Component Structure

- Create reusable UI components
- Follow atomic design principles
- Maintain proper component hierarchy
- Use proper prop typing

### API Integration

- Use service layer pattern
- Implement proper error handling
- Use React Query for caching
- Handle loading states

## Deployment

1. Build the application

```bash
npm run build
```

2. Preview the build

```bash
npm run preview
```

3. Deploy the `dist` directory to your hosting service

## Integration Guide

The system can be integrated into existing applications in several ways:

1. **Widget Integration**

```html
<div id="dental-booking"></div>
<script src="https://your-domain.com/widget.js"></script>
```

2. **API Integration**

- Comprehensive REST API
- Documentation available
- Authentication required

## License

[MIT License](LICENSE)
