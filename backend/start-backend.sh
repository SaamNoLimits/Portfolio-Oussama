#!/bin/bash

echo "🚀 Starting Portfolio Backend Server..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Navigate to backend directory
cd "$(dirname "$0")"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. You can configure email settings later."
fi

# Start the server
echo "🌟 Starting backend server on http://localhost:5000"
echo "📧 Contact form endpoint: http://localhost:5000/api/contact"
echo "📊 Admin panel: http://localhost:5000/api/contacts"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=================================="

npm start
