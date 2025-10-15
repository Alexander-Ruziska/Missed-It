<?php
/* 
🎪 PHP LEARNING NOTE - Events API Endpoint:
This file handles all event-related operations (CRUD = Create, Read, Update, Delete).
It's loaded by index.php when someone visits /api/events
*/

// Events API Endpoint
// Handle CRUD operations for events

/* 
📥 PHP LEARNING NOTE - Getting the HTTP Method:
$_SERVER['REQUEST_METHOD'] tells us what type of request this is:
- GET = retrieve data (like reading)
- POST = create new data  
- PUT = update existing data
- DELETE = remove data
This determines what operation we'll perform!
*/
$method = $_SERVER['REQUEST_METHOD'];

/* 
🔀 PHP LEARNING NOTE - Method-Based Routing:
Another switch statement! This one decides what to do based on the HTTP method.
Same URL (/api/events) but different method = different action.
This is REST API design - very common pattern!
*/
switch ($method) {
    case 'GET':
        /* 
        👀 PHP LEARNING NOTE - GET Requests (Reading Data):
        GET requests can have query parameters: /api/events?id=123
        $_GET is a global array containing these parameters.
        isset() checks if a variable exists and isn't null.
        */
        if (isset($_GET['id'])) {
            // Get specific event by ID
            $event_id = $_GET['id'];
            
            /* 
            📦 PHP LEARNING NOTE - Dummy Data:
            For learning, we're using fake data instead of a real database.
            In a real app, you'd query the database here:
            $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
            $stmt->execute([$event_id]);
            $event = $stmt->fetch();
            */
            $event = [
                'id' => $event_id,
                'title' => 'Sample Event',
                'description' => 'This is a sample event',
                'date' => '2025-10-20',
                'location' => 'Sample Location'
            ];
            
            // Use our helper function from config.php to send JSON response
            sendResponse($event);
        } else {
            // Get all events (no ID specified)
            $events = [
                [
                    'id' => 1,
                    'title' => 'Concert',
                    'description' => 'Amazing concert downtown',
                    'date' => '2025-10-20',
                    'location' => 'Music Hall'
                ],
                [
                    'id' => 2,
                    'title' => 'Art Exhibition',
                    'description' => 'Modern art showcase',
                    'date' => '2025-10-25',
                    'location' => 'Art Gallery'
                ]
            ];
            sendResponse($events);
        }
        break;
    
    case 'POST':
        /* 
        ✏️ PHP LEARNING NOTE - POST Requests (Creating Data):
        POST requests usually send data in the request body, not the URL.
        file_get_contents('php://input') reads the raw request body.
        json_decode() converts JSON string to PHP array.
        */
        $input = json_decode(file_get_contents('php://input'), true);
        
        /* 
        ✅ PHP LEARNING NOTE - Input Validation:
        Always validate user input! Check that required fields exist.
        isset() checks if the array key exists.
        In a real app, you'd also validate data types, lengths, etc.
        */
        if (!isset($input['title']) || !isset($input['date'])) {
            sendResponse(['error' => 'Title and date are required'], 400);
        }
        
        /* 
        🆕 PHP LEARNING NOTE - Creating New Records:
        For learning, we just create a fake new event with the submitted data.
        In a real app, you'd insert into database:
        $stmt = $pdo->prepare("INSERT INTO events (title, description, date, location) VALUES (?, ?, ?, ?)");
        $stmt->execute([$input['title'], $input['description'], $input['date'], $input['location']]);
        */
        $new_event = [
            'id' => rand(1000, 9999), // Random ID for demonstration
            'title' => $input['title'],
            'description' => $input['description'] ?? '', // ?? means "if not set, use empty string"
            'date' => $input['date'],
            'location' => $input['location'] ?? '',
            'created_at' => date('Y-m-d H:i:s') // Current timestamp
        ];
        
        // Send back the created event with 201 status (created successfully)
        sendResponse($new_event, 201);
        break;
    
    case 'PUT':
        /* 
        🔄 PHP LEARNING NOTE - PUT Requests (Updating Data):
        PUT is used to update existing records.
        We need both the ID (from URL) and the new data (from request body).
        */
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Event ID is required'], 400);
        }
        
        $event_id = $_GET['id'];
        
        /* 
        🔧 PHP LEARNING NOTE - Update Logic:
        In a real app, you'd update the database record:
        $stmt = $pdo->prepare("UPDATE events SET title = ?, description = ? WHERE id = ?");
        $stmt->execute([$input['title'], $input['description'], $event_id]);
        */
        $updated_event = [
            'id' => $event_id,
            'title' => $input['title'] ?? 'Updated Event',
            'description' => $input['description'] ?? '',
            'date' => $input['date'] ?? date('Y-m-d'),
            'location' => $input['location'] ?? '',
            'updated_at' => date('Y-m-d H:i:s')
        ];
        
        sendResponse($updated_event);
        break;
    
    case 'DELETE':
        /* 
        🗑️ PHP LEARNING NOTE - DELETE Requests:
        DELETE removes records. Usually just needs an ID.
        In a real app: DELETE FROM events WHERE id = ?
        */
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'Event ID is required'], 400);
        }
        
        $event_id = $_GET['id'];
        
        // For demonstration, just return success message
        sendResponse(['message' => "Event {$event_id} deleted successfully"]);
        break;
    
    default:
        /* 
        ❌ PHP LEARNING NOTE - Method Not Allowed:
        If someone sends a method we don't support (like PATCH),
        return 405 status code (Method Not Allowed).
        */
        sendResponse(['error' => 'Method not allowed'], 405);
        break;
}

/* 
🎓 PHP LEARNING NOTE - What You Learned Here:
1. REST API patterns (GET/POST/PUT/DELETE)
2. Reading URL parameters ($_GET)
3. Reading request body (file_get_contents + json_decode)
4. Input validation (isset, checking required fields)
5. JSON responses (using our helper function)
6. HTTP status codes (200, 201, 400, 404, 405)
7. Dummy data vs. real database operations

Next steps: Replace dummy data with real database queries!
*/
?>