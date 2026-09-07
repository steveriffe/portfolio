#!/bin/bash
# Local development launch script for Steve Riffe Portfolio
# Matches Career Agent & Music Roast dual-runtime support

set -e

PORT=${PORT:-8080}

echo "=================================================="
echo "🚀 Starting Steve Riffe Portfolio Local Dev"
echo "Target: http://localhost:$PORT"
echo "=================================================="

if command -v node &> /dev/null && [ -d "node_modules" ]; then
  echo "🚀 Launching Node.js Express server on http://localhost:$PORT..."
  node server.js
elif command -v python3 &> /dev/null; then
  echo "🌐 Node dependencies not installed locally. Serving via Python3 on http://localhost:$PORT..."
  python3 -m http.server "$PORT" --directory public
else
  echo "❌ Neither Node.js nor Python3 found."
  exit 1
fi
