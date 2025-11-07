import React, { useState, useEffect } from "react";
import useStore from "../../zustand/store";
import { useParams, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import "./EventPage.css";

// Mock upload components - you can replace these with actual upload widgets
const UploadEventCoverWidget = ({ setCoverPhoto }) => (
  <div>
    <input 
      type="file" 
      accept="image/*" 
      onChange={(e) => {
        if (e.target.files[0]) {
          const url = URL.createObjectURL(e.target.files[0]);
          setCoverPhoto(url);
        }
      }} 
    />
    <small className="text-muted">Upload event cover photo</small>
  </div>
);

const UploadEventPhotoWidget = ({ setEventPhoto }) => (
  <div>
    <input 
      type="file" 
      accept="image/*" 
      onChange={(e) => {
        if (e.target.files[0]) {
          const url = URL.createObjectURL(e.target.files[0]);
          setEventPhoto(url);
        }
      }} 
    />
    <small className="text-muted">Upload event photo</small>
  </div>
);

function EventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const eventOBJ = useStore((state) => state.eventOBJ);
  const fetchEvent = useStore((state) => state.fetchEvent);
  const updateEvent = useStore((state) => state.updateEvent);
  const user = useStore((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({});
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [eventPhoto, setEventPhoto] = useState(null);

  // Modal state for full-size image display
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchEvent(eventId);
    console.log('Event obj in useEffect:', eventOBJ);
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedEventData = { 
      ...editedEvent, 
      cover_photo: coverPhoto, 
      profile_pic: eventPhoto 
    };
    console.log('Updating event with:', updatedEventData);

    updateEvent(eventId, updatedEventData);
    setIsEditing(false);
  };

  const attendeesButton = () => {
    navigate(`/events/${eventOBJ.id}/attendees`);
  };

  // Image click handler for modal
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const addPhotosNav = () => {
    navigate(`/events/${eventOBJ.id}/photos`);
  };

  const isOrganizer = eventOBJ?.is_organizer || user.is_organizer;

  return eventOBJ ? (
    <div id="eventPage" className="mt-4">
      {isEditing ? (
        <Form>
          <Form.Group className="mb-3" style={{ borderRadius: '3px' }}>
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={editedEvent.title || ""}
              onChange={handleChange}
              placeholder="Event Title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={editedEvent.description || ""}
              onChange={handleChange}
              placeholder="Event Description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={editedEvent.date || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={editedEvent.time || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={editedEvent.location || ""}
              onChange={handleChange}
              placeholder="Event Location"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Organizer</Form.Label>
            <Form.Control
              type="text"
              name="organizer"
              value={editedEvent.organizer || ""}
              onChange={handleChange}
              placeholder="Event Organizer"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            {isEditing && (<UploadEventCoverWidget setCoverPhoto={setCoverPhoto}/>)}
            {editedEvent.cover_photo && (
              <img src={editedEvent.cover_photo} alt="Cover Preview" style={{ width: 200, height: "auto" }} />
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            {isEditing && (<UploadEventPhotoWidget setEventPhoto={setEventPhoto}/>)}
            {editedEvent.profile_pic && (
              <img src={editedEvent.profile_pic} alt="Event Preview" style={{ width: 200, height: "auto" }} />
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="url"
              name="website"
              value={editedEvent.website || ""}
              onChange={handleChange}
              placeholder="Event Website"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Facebook</Form.Label>
            <Form.Control
              type="url"
              name="facebook"
              value={editedEvent.facebook || ""}
              onChange={handleChange}
              placeholder="Facebook Event Page"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Instagram</Form.Label>
            <Form.Control
              type="url"
              name="instagram"
              value={editedEvent.instagram || ""}
              onChange={handleChange}
              placeholder="Instagram Profile"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>LinkedIn</Form.Label>
            <Form.Control
              type="url"
              name="linkedin"
              value={editedEvent.linkedin || ""}
              onChange={handleChange}
              placeholder="LinkedIn Profile"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editedEvent.email || ""}
              onChange={handleChange}
              placeholder="Contact Email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={editedEvent.phone || ""}
              onChange={handleChange}
              placeholder="Contact Phone"
            />
          </Form.Group>

          <div className="mt-3">
            <Button
              variant="light"
              onClick={handleSave}
              style={{ borderRadius: "3px", border: "1px solid black", backgroundColor: "#e0e0e0" }}
            >
              Save
            </Button>
            <Button
              variant="light"
              onClick={() => setIsEditing(false)}
              className="ms-2"
              style={{ borderRadius: "3px", border: "1px solid black", backgroundColor: "#e0e0e0" }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      ) : (
        <>
          <Nav variant="tabs" defaultActiveKey={`/events/${eventId}`}>
            <Nav.Item>
              <Nav.Link href={`/events/${eventId}`}>Event Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={attendeesButton}>Attendees</Nav.Link>
            </Nav.Item>
          </Nav>
          
          <Card className="mb-3">
            <Card.Header style={{ fontSize: '2rem' }}>
              {eventOBJ.title}
              <Badge bg="primary" className="ms-2">Event</Badge>
            </Card.Header>
            <Card.Body>
              <div className="row mb-3">
                <div className="col-md-6">
                  <p><strong>📅 Date:</strong> {new Date(eventOBJ.date).toLocaleDateString()}</p>
                  <p><strong>🕐 Time:</strong> {eventOBJ.time}</p>
                  <p><strong>📍 Location:</strong> {eventOBJ.location}</p>
                  <p><strong>👤 Organizer:</strong> {eventOBJ.organizer}</p>
                </div>
                <div className="col-md-6">
                  {eventOBJ.email && <p><strong>✉️ Email:</strong> <a href={`mailto:${eventOBJ.email}`}>{eventOBJ.email}</a></p>}
                  {eventOBJ.phone && <p><strong>📞 Phone:</strong> <a href={`tel:${eventOBJ.phone}`}>{eventOBJ.phone}</a></p>}
                </div>
              </div>

              <p className="mb-4">{eventOBJ.description}</p>

              {/* Attendees Summary */}
              {eventOBJ.attendees && eventOBJ.attendees.length > 0 && (
                <div className="mb-4">
                  <h5>👥 Attendees ({eventOBJ.attendees.length})</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {eventOBJ.attendees.slice(0, 5).map((attendee) => (
                      <Badge 
                        key={attendee.id} 
                        bg={attendee.status === 'attending' ? 'success' : 'warning'}
                      >
                        {attendee.name}
                      </Badge>
                    ))}
                    {eventOBJ.attendees.length > 5 && (
                      <Badge bg="secondary">+{eventOBJ.attendees.length - 5} more</Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Event Photos Portfolio */}
              {eventOBJ.photos && eventOBJ.photos.length > 0 && (
                <>
                  <h4>📸 Event Photos</h4>
                  {/* First image large and centered */}
                  <div className="event-feature mb-4">
                    <div className="event-feature-image">
                      <img 
                        src={eventOBJ.photos[0].image_url} 
                        alt={eventOBJ.photos[0].title} 
                        onClick={() => handleImageClick(eventOBJ.photos[0].image_url)}
                        style={{ width: '100%', maxWidth: '500px', cursor: 'pointer' }}
                        className="rounded"
                      />
                    </div>
                    <div className="event-feature-text mt-2">
                      <p><strong>{eventOBJ.photos[0].title}</strong></p>
                      <p>{eventOBJ.photos[0].description}</p>
                    </div>
                  </div>

                  {/* 2-column layout for remaining images */}
                  <div className="event-photo-grid row">
                    {eventOBJ.photos.slice(1).map((photo) => (
                      <div key={photo.id} className="col-md-6 mb-3">
                        <div className="photo-tile" onClick={() => handleImageClick(photo.image_url)}>
                          <img 
                            src={photo.image_url} 
                            alt={photo.title}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                            className="rounded"
                          />
                          <p className="mt-2"><strong>{photo.title}</strong></p>
                          <p>{photo.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Cover Photo */}
              {eventOBJ.cover_photo && (
                <div className="event-cover-container mb-4">
                  <h5>Event Cover</h5>
                  <img
                    src={eventOBJ.cover_photo}
                    alt="Event Cover"
                    className="rounded-3"
                    style={{ width: '100%', maxWidth: '600px', height: "auto" }}
                    onClick={() => handleImageClick(eventOBJ.cover_photo)}
                  />
                </div>
              )}

              {/* Social Media Links */}
              <div className="social-links mb-4">
                {eventOBJ.website && (
                  <div className="mb-2">
                    <strong>🌐 Website:</strong>{' '}
                    <a href={eventOBJ.website} target="_blank" rel="noopener noreferrer">
                      {eventOBJ.website}
                    </a>
                  </div>
                )}

                <div className="d-flex gap-3">
                  {eventOBJ.facebook && (
                    <a href={eventOBJ.facebook} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline-primary" size="sm">Facebook</Button>
                    </a>
                  )}

                  {eventOBJ.instagram && (
                    <a href={eventOBJ.instagram} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline-danger" size="sm">Instagram</Button>
                    </a>
                  )}

                  {eventOBJ.linkedin && (
                    <a href={eventOBJ.linkedin} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline-info" size="sm">LinkedIn</Button>
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                {isOrganizer && (
                  <Button
                    variant="light"
                    onClick={() => setIsEditing(true)}
                    style={{ 
                      borderRadius: "3px", 
                      border: "1px solid black", 
                      backgroundColor: "#e0e0e0", 
                      padding: "6px 12px", 
                      fontSize: "1rem", 
                      marginTop: "30px", 
                      marginBottom: "20px", 
                      marginRight: "20px" 
                    }}
                  >
                    Edit Event
                  </Button>
                )}

                {isOrganizer && (
                  <Button
                    variant="light"
                    onClick={addPhotosNav}
                    style={{ 
                      borderRadius: "3px", 
                      border: "1px solid black", 
                      backgroundColor: "#e0e0e0", 
                      padding: "6px 12px", 
                      fontSize: "1rem", 
                      marginBottom: "20px", 
                      marginTop: "30px" 
                    }}
                  >
                    Add Photos
                  </Button>
                )}

                <Button
                  variant="success"
                  className="ms-2"
                  style={{ 
                    borderRadius: "3px", 
                    padding: "6px 12px", 
                    fontSize: "1rem", 
                    marginBottom: "20px", 
                    marginTop: "30px" 
                  }}
                >
                  RSVP for Event
                </Button>
              </div>
            </Card.Body>
          </Card>
        </>
      )}

      {/* Modal for full-size image */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size="lg"
        className="custom-modal-size"
      >
        <Modal.Header closeButton={false} className="custom-modal-header">
          <button type="button" className="close-button" onClick={handleCloseModal}>
            ×
          </button>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedImage} alt="Full size" className="img-fluid modal-image" />
        </Modal.Body>
      </Modal>
    </div>
  ) : (
    <div className="text-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading event details...</p>
    </div>
  );
}

export default NewEvent;