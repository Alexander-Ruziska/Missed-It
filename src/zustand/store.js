import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Event state
  eventOBJ: null,
  events: [],
  user: {
    id: 1,
    name: 'Demo User',
    event_id: null,
    is_organizer: true
  },

  // Event actions
  fetchEvent: (eventId) => {
    // Mock event data for demonstration
    const mockEvent = {
      id: eventId,
      title: 'Sample Event',
      description: 'This is a sample event for demonstration purposes.',
      date: '2025-10-25',
      time: '18:00',
      location: 'Community Center',
      organizer: 'Event Organizer',
      phone: '(555) 123-4567',
      email: 'organizer@example.com',
      website: 'https://example.com',
      facebook: 'https://facebook.com/example',
      instagram: 'https://instagram.com/example',
      linkedin: 'https://linkedin.com/in/example',
      cover_photo: null,
      profile_pic: null,
      is_organizer: true,
      photos: [
        {
          id: 1,
          title: 'Event Photo 1',
          description: 'Sample event photo description',
          image_url: 'https://picsum.photos/400/300?random=1'
        },
        {
          id: 2,
          title: 'Event Photo 2',
          description: 'Another sample event photo',
          image_url: 'https://picsum.photos/400/300?random=2'
        }
      ],
      attendees: [
        { id: 1, name: 'John Doe', status: 'attending' },
        { id: 2, name: 'Jane Smith', status: 'maybe' },
        { id: 3, name: 'Bob Johnson', status: 'attending' }
      ]
    };
    
    set({ eventOBJ: mockEvent });
  },

  fetchEvents: () => {
    // Mock events list for demonstration
    const mockEvents = [
      {
        id: 1,
        title: 'Community Meetup',
        date: '2025-10-20',
        location: 'Park Community Center',
        cover_photo: 'https://picsum.photos/300/200?random=10'
      },
      {
        id: 2,
        title: 'Workshop: Web Development',
        date: '2025-10-25',
        location: 'Tech Hub',
        cover_photo: 'https://picsum.photos/300/200?random=11'
      },
      {
        id: 3,
        title: 'Art Exhibition Opening',
        date: '2025-11-01',
        location: 'City Gallery',
        cover_photo: 'https://picsum.photos/300/200?random=12'
      }
    ];
    
    set({ events: mockEvents });
  },

  updateEvent: (eventId, updatedEvent) => {
    // Mock update function
    console.log('Updating event:', eventId, updatedEvent);
    const currentEvent = get().eventOBJ;
    if (currentEvent && currentEvent.id === eventId) {
      set({ eventOBJ: { ...currentEvent, ...updatedEvent } });
    }
  },

  createEvent: (newEvent) => {
    // Mock create function
    const events = get().events;
    const eventWithId = { ...newEvent, id: Date.now() };
    set({ events: [...events, eventWithId] });
    return eventWithId;
  }
}));

export default useStore;