import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import './EventsList.css';

function EventsList() {
  const navigate = useNavigate();
  const events = useStore((state) => state.events);
  const fetchEvents = useStore((state) => state.fetchEvents);
  const user = useStore((state) => state.user);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleCreateEvent = () => {
    navigate('/events/create');
  };

  return (
    <div className="events-list-container">
      <div className="events-header mb-4">
        <h1>🎉 Event Bulletin Board</h1>
        <p className="lead">Discover and track upcoming events in your community</p>
        
        {user.is_organizer && (
          <Button 
            variant="success" 
            onClick={handleCreateEvent}
            className="mb-3"
            style={{ borderRadius: "3px" }}
          >
            ➕ Create New Event
          </Button>
        )}
      </div>

      {events.length === 0 ? (
        <div className="text-center mt-5">
          <div className="empty-state">
            <h3>📅 No Events Yet</h3>
            <p>Be the first to create an event!</p>
            {user.is_organizer && (
              <Button variant="primary" onClick={handleCreateEvent}>
                Create Your First Event
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Row>
          {events.map((event) => (
            <Col key={event.id} md={6} lg={4} className="mb-4">
              <Card 
                className="event-card h-100" 
                onClick={() => handleEventClick(event.id)}
                style={{ cursor: 'pointer' }}
              >
                {event.cover_photo && (
                  <Card.Img 
                    variant="top" 
                    src={event.cover_photo} 
                    className="event-card-image"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="event-title">
                    {event.title}
                    <Badge bg="primary" className="ms-2 event-badge">Event</Badge>
                  </Card.Title>
                  
                  <div className="event-details mb-3">
                    <p className="mb-1">
                      <strong>📅 Date:</strong> {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="mb-1">
                      <strong>📍 Location:</strong> {event.location}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event.id);
                      }}
                      style={{ borderRadius: "3px" }}
                    >
                      View Details →
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="events-footer mt-5 text-center">
        <p className="text-muted">
          Stay connected with your community events
        </p>
      </div>
    </div>
  );
}

export default EventsList;