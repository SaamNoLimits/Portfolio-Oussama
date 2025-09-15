#!/bin/bash

echo "📊 Opening Portfolio Admin Panel..."

# Check if backend is running
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo "✅ Backend is running"
    echo "🌐 Opening admin panel in browser..."
    
    # Try to open in default browser
    if command -v xdg-open > /dev/null; then
        xdg-open "file://$(pwd)/admin.html"
    elif command -v open > /dev/null; then
        open "file://$(pwd)/admin.html"
    else
        echo "📁 Please open this file in your browser:"
        echo "file://$(pwd)/admin.html"
    fi
else
    echo "❌ Backend is not running!"
    echo "🚀 Please start the backend first:"
    echo "   ./start-backend.sh"
    echo ""
    echo "📁 Or open the admin panel directly:"
    echo "file://$(pwd)/admin.html"
fi
