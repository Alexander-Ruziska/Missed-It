# Event Tracker - Bulletin Board App

A modern React-based event tracking and bulletin board application that helps communities discover, organize, and manage local events.

## 🚀 Features

- **Event Bulletin Board**: Browse and discover community events
- **Detailed Event Pages**: View comprehensive event information including photos, attendee lists, and social media links
- **Event Management**: Create and edit events (for organizers)
- **RSVP System**: Track event attendance
- **Photo Galleries**: Share event photos with modal viewing
- **Social Integration**: Connect events with Facebook, Instagram, LinkedIn
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **State Management**: Zustand
- **UI Framework**: Bootstrap 5 with React Bootstrap
- **Styling**: CSS3 with custom themes
- **Development**: VS Code with hot module replacement

## 📁 Project Structure

```
src/
├── components/
│   ├── EventPage/          # Individual event detail component
│   │   ├── EventPage.jsx
│   │   └── EventPage.css
│   └── EventsList/         # Events listing component
│       ├── EventsList.jsx
│       └── EventsList.css
├── zustand/
│   └── store.js           # Application state management
├── App.jsx                # Main application with routing
├── App.css               # Global styles
└── main.jsx              # Application entry point
```

## 🎯 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies** (already completed)
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5174` (currently running)

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Key Components

### EventsList Component
- Displays a grid of available events
- Includes event cards with cover images, dates, and locations
- Provides navigation to individual event pages
- Features responsive design for mobile and desktop

### EventPage Component
- Shows detailed event information
- Includes photo galleries with modal viewing
- Displays attendee information and RSVP functionality
- Provides editing capabilities for event organizers
- Integrates social media links

### Zustand Store
- Manages application state
- Handles event data and user information
- Provides mock data for development
- Ready for backend API integration

## 🔧 Current Status

✅ **Completed Setup:**
- React + Vite project structure
- React Router for navigation
- Zustand state management
- Bootstrap UI components
- Event listing and detail pages
- Mock data integration
- Responsive design
- Development server running on http://localhost:5174

🚀 **Ready to Use:**
The application is now fully functional with sample events and can be viewed in your browser!

## 📝 Development Notes

- The app is designed to be easily extensible with backend integration
- Mock data in the Zustand store can be replaced with actual API calls
- Components are modular and reusable
- CSS is organized by component for maintainability

Built with ❤️ for community event management
