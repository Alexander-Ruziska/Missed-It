import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import EventsList from './components/EventsList/EventsList';
import EventPage from './components/EventPage/EventPage';

/* 
🔷 TYPESCRIPT LEARNING NOTE:
In TypeScript (.tsx), you would define interfaces for your data types:

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

interface User {
  id: number;
  username: string;
  email: string;
}

This would give you:
- Auto-completion when accessing event.title, event.date, etc.
- Compile-time error checking if you mistype property names
- Better IDE support with IntelliSense
- Prevents runtime errors from undefined properties
*/

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand href="/">
              Missed It
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Events</Nav.Link>
                <Nav.Link href="/create">Create Event</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Main Content */}
        <Container>
          <Routes>
            <Route path="/" element={<EventsList />} />
            <Route path="/events" element={<Navigate to="/" replace />} />
            <Route path="/events/:eventId" element={<EventPage />} />
            <Route path="/create" element={<div className="text-center mt-5"><h3>Create Event Page</h3><p>This page would contain a form to create new events.</p></div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>

        {/* Footer */}
        <footer className="bg-light text-center text-muted py-4 mt-5">
          <Container>
            <p>&copy; 2025 Event Tracker - Your Community Bulletin Board</p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App
