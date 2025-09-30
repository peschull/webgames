#!/bin/bash

# Suendenbock Backend Quick Start Script

echo "🎯 Starting Suendenbock Backend..."
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17 or higher."
    exit 1
fi

# Check Java version
JAVA_VERSION=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | sed '/^1\./s///' | cut -d'.' -f1)
if [ "$JAVA_VERSION" -lt 17 ]; then
    echo "❌ Java 17 or higher is required. Current version: $JAVA_VERSION"
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven 3.6 or higher."
    exit 1
fi

echo "✅ Java version: $(java -version 2>&1 | head -1 | cut -d'"' -f2)"
echo "✅ Maven version: $(mvn -version 2>&1 | head -1 | cut -d' ' -f3)"
echo ""

# Navigate to backend directory
cd "$(dirname "$0")"

# Build and run
echo "📦 Building and starting the backend..."
echo ""

mvn spring-boot:run

# The script will keep running until the user stops it with Ctrl+C
