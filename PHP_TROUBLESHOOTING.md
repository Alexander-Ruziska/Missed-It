# PHP in VS Code - Troubleshooting Guide

## 🚨 Common VS Code PHP Errors & Solutions

### 1. **"PHP executable not found" Error**
**Problem**: VS Code can't find PHP on your system.
**Solution**:
```bash
# Check if PHP is installed
php --version

# If not installed, install PHP:
# macOS (with Homebrew)
brew install php

# Ubuntu/Debian
sudo apt install php

# After installation, restart VS Code
```

### 2. **"Unknown Variable" or Red Squiggles**
**Problem**: VS Code doesn't understand PHP syntax without extensions.
**Solution**: ✅ **Already installed PHP Intelephense extension!**

### 3. **"Undefined Function" Warnings**
**Problem**: VS Code doesn't recognize built-in PHP functions.
**Solution**: PHP Intelephense should fix this. If not, check your workspace settings.

### 4. **CORS or Network Errors When Testing**
**Problem**: Frontend can't connect to PHP backend.
**Solution**:
- Make sure PHP server is running: `php -S localhost:8000`
- Check CORS headers in `index.php` (already configured!)
- Verify the port numbers match

## 🔧 VS Code PHP Extension Installed

```vscode-extensions
bmewburn.vscode-intelephense-client
```

This extension provides:
- ✅ **Syntax highlighting** for PHP
- ✅ **Error detection** and warnings  
- ✅ **Auto-completion** for PHP functions
- ✅ **Go to definition** for functions/variables
- ✅ **Real-time error checking**

## 🧪 Test Your PHP Setup

1. **Test PHP installation**:
   ```bash
   php --version
   ```

2. **Start the backend server**:
   ```bash
   cd backend
   php -S localhost:8000
   ```

3. **Test the API**:
   - Open browser: `http://localhost:8000`
   - Should see: `{"message":"Welcome to Missed It API","status":"running"}`

4. **Test events endpoint**:
   - Open browser: `http://localhost:8000/api/events`
   - Should see JSON array of events

## 🐛 Still Having Issues?

### Check VS Code Settings:
1. Open VS Code Settings (Cmd/Ctrl + ,)
2. Search for "php"
3. Make sure these are set:
   - `php.validate.enable`: true
   - `php.suggest.basic`: true

### Check PHP Error Log:
```bash
# View PHP errors in terminal
php -S localhost:8000 2>&1
```

### Common Error Messages Explained:

- **"Parse error: syntax error"** = Missing semicolon or bracket
- **"Fatal error: Call to undefined function"** = Typo in function name
- **"Notice: Undefined variable"** = Using a variable before setting it
- **"Warning: Cannot modify header"** = Trying to set headers after output

## 💡 Pro Tips for PHP Learning

1. **Always check the terminal** where you started `php -S` for errors
2. **Use `var_dump($variable)`** to see what's in a variable
3. **Enable error reporting** (already done in config.php!)
4. **Test each endpoint individually** before connecting to frontend

## 🔗 Next Steps

Your PHP backend is ready! The extension will now help you catch errors as you code. Try modifying the events.php file and see how VS Code highlights any syntax issues in real-time.