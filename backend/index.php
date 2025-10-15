<?php
/* 
🌐 PHP LEARNING NOTE - Main Entry Point:
This is like the "main.js" of your backend - every API request comes through here first.
It handles routing (deciding which code to run based on the URL) and sets up CORS.
*/

// Basic PHP Backend Entry Point
// This is where your API requests will be handled

/* 
🔗 PHP LEARNING NOTE - CORS Headers:
CORS = Cross-Origin Resource Sharing
These headers tell browsers it's OK for your React app (localhost:5173) 
to make requests to this PHP backend (localhost:8000).
Without these, browsers would block the requests for security!
*/
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json"); // Always return JSON

/* 
✈️ PHP LEARNING NOTE - Preflight Requests:
Browsers send an OPTIONS request before the actual request to check permissions.
This code handles those "preflight" requests and says "yes, this is allowed!"
*/
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Send "OK" status
    exit(); // Stop here - don't run the rest of the code
}

/* 
📁 PHP LEARNING NOTE - Including Files:
require_once loads another PHP file and runs its code.
'once' means it only loads it one time, even if called multiple times.
This gives us access to all the functions and constants from config.php
*/
require_once 'config.php';

/* 
🧭 PHP LEARNING NOTE - URL Routing:
$_SERVER is a global array with info about the current request.
REQUEST_URI = the full URL path (/api/events?id=123)
parse_url() breaks that into parts
REQUEST_METHOD = GET, POST, PUT, DELETE, etc.
*/
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH); // Gets just the path part
$method = $_SERVER['REQUEST_METHOD']; // Gets the HTTP method

/* 
🔄 PHP LEARNING NOTE - String Manipulation:
str_replace() finds text and replaces it.
This removes '/backend' from the path so our routing works correctly.
Example: '/backend/api/events' becomes '/api/events'
*/
$path = str_replace('/backend', '', $path);

/* 
🚦 PHP LEARNING NOTE - Switch Statement Routing:
This is like a big if/else chain that decides what code to run.
Each 'case' matches a different URL path and loads the appropriate file.
It's a simple but effective way to route API requests!
*/
switch ($path) {
    case '/':
    case '/index.php':
        // Root endpoint - just return a welcome message
        echo json_encode(['message' => 'Welcome to Missed It API', 'status' => 'running']);
        break;
    
    case '/api/events':
        /* 
        📂 PHP LEARNING NOTE - File Inclusion for Routing:
        When someone visits /api/events, we load the events.php file.
        That file contains all the code for handling event-related requests.
        This keeps our code organized - each endpoint in its own file!
        */
        require_once 'api/events.php';
        break;
    
    case '/api/users':
        // Same pattern for users - load the users.php file
        require_once 'api/users.php';
        break;
    
    default:
        /* 
        ❌ PHP LEARNING NOTE - 404 Handling:
        If none of the cases match, we got a request for a URL that doesn't exist.
        Send a 404 status code and an error message.
        */
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}

/* 
🎯 PHP LEARNING NOTE - How This All Works Together:
1. Request comes in (e.g., GET /api/events)
2. CORS headers are set (allows frontend to access)
3. Config file is loaded (database settings, helper functions)
4. URL is parsed to determine which endpoint was requested
5. Appropriate PHP file is loaded to handle the request
6. That file uses config functions to send back JSON response

This pattern scales well - you can add new endpoints just by adding new files!
*/
?>