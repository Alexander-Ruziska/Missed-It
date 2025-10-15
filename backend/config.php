<?php
/* 
📋 PHP LEARNING NOTE - Configuration File:
This file stores all the settings and common functions that other PHP files will use.
Think of it as a "settings hub" for your entire backend.
*/

// Basic Configuration File
// Keep your database settings and other config here

/* 
🗄️ PHP LEARNING NOTE - Database Configuration:
define() creates global constants that can't be changed once set.
These are like "final" variables that store your database connection info.
DB_HOST = where your database server is running (usually 'localhost' for development)
DB_NAME = the name of your specific database 
DB_USER = username to connect to the database
DB_PASS = password for that username
*/
define('DB_HOST', 'localhost');
define('DB_NAME', 'missed_it_app');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');

/* 
🔧 PHP LEARNING NOTE - API Configuration:
These constants define settings for your API behavior.
API_VERSION helps you manage different versions of your API (v1, v2, etc.)
JWT_SECRET is used for creating secure authentication tokens
*/
define('API_VERSION', 'v1');
define('JWT_SECRET', 'your_jwt_secret_key_here'); // For authentication later

/* 
🐛 PHP LEARNING NOTE - Error Reporting:
error_reporting(E_ALL) = Show ALL types of errors (notices, warnings, fatal errors)
ini_set('display_errors', 1) = Actually display those errors on the webpage
In production, you'd turn this OFF for security, but for learning it's helpful!
*/
error_reporting(E_ALL);
ini_set('display_errors', 1);

/* 
🔌 PHP LEARNING NOTE - Database Connection Function:
PDO (PHP Data Objects) is the modern, secure way to connect to databases.
It works with MySQL, PostgreSQL, SQLite, and other databases.
This function returns a connection object that you can use to run SQL queries.
*/
function getDBConnection() {
    try {
        // Create a new PDO connection using the constants we defined above
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        
        // Set error mode to throw exceptions (this makes error handling easier)
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        return $pdo; // Return the connection object
    } catch(PDOException $e) {
        /* 
        🚨 PHP LEARNING NOTE - Exception Handling:
        If the database connection fails, we catch the error here.
        For now, we just return null, but in a real app you'd:
        - Log the error to a file
        - Show a user-friendly error message
        - Maybe try to reconnect
        */
        return null;
    }
}

/* 
📤 PHP LEARNING NOTE - Helper Function for API Responses:
This function makes it easy to send consistent JSON responses.
$data = the information you want to send back (array, object, etc.)
$status_code = HTTP status code (200 = success, 404 = not found, 500 = error, etc.)
*/
function sendResponse($data, $status_code = 200) {
    // Set the HTTP response code (tells the browser/client if request succeeded)
    http_response_code($status_code);
    
    // Convert PHP array/object to JSON and send it
    echo json_encode($data);
    
    // exit() stops the script here - important for API endpoints!
    exit();
}

/* 
🔍 PHP LEARNING NOTE - What happens next:
Other PHP files will use require_once 'config.php' to load:
- All these constants (DB_HOST, etc.)
- The helper functions (getDBConnection, sendResponse)
- The error reporting settings
This way you don't have to repeat this code in every file!
*/
?>