<?php
// Users API Endpoint
// Handle user-related operations

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get user info
        if (isset($_GET['id'])) {
            $user_id = $_GET['id'];
            $user = [
                'id' => $user_id,
                'username' => 'sample_user',
                'email' => 'user@example.com',
                'created_at' => '2025-01-01'
            ];
            sendResponse($user);
        } else {
            // Get all users (you might want to restrict this)
            $users = [
                [
                    'id' => 1,
                    'username' => 'john_doe',
                    'email' => 'john@example.com'
                ],
                [
                    'id' => 2,
                    'username' => 'jane_smith',
                    'email' => 'jane@example.com'
                ]
            ];
            sendResponse($users);
        }
        break;
    
    case 'POST':
        // Create new user / Register
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Basic validation
        if (!isset($input['username']) || !isset($input['email'])) {
            sendResponse(['error' => 'Username and email are required'], 400);
        }
        
        // For now, just return the created user
        $new_user = [
            'id' => rand(1000, 9999),
            'username' => $input['username'],
            'email' => $input['email'],
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        sendResponse($new_user, 201);
        break;
    
    case 'PUT':
        // Update user
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($_GET['id'])) {
            sendResponse(['error' => 'User ID is required'], 400);
        }
        
        $user_id = $_GET['id'];
        
        $updated_user = [
            'id' => $user_id,
            'username' => $input['username'] ?? 'updated_user',
            'email' => $input['email'] ?? 'updated@example.com',
            'updated_at' => date('Y-m-d H:i:s')
        ];
        
        sendResponse($updated_user);
        break;
    
    default:
        sendResponse(['error' => 'Method not allowed'], 405);
        break;
}
?>