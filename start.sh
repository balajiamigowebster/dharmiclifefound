#!/usr/bin/env bash

# Resolve script directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

# Add local node to PATH if present
export PATH="$HOME/.local/node/bin:/usr/local/bin:$PATH"

echo "================================================="
echo "   🕉️ Dharmic Life Foundation Website             "
echo "   Frontend: React.js | Backend: Node.js/MariaDB "
echo "================================================="

# Check if node is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not found in PATH."
    exit 1
fi

echo "✔ Node.js $(node -v) detected"

# Open browser to Vite frontend
(sleep 2 && open "http://localhost:5173" 2>/dev/null || true) &

# Run concurrently dev (Node API + Vite Frontend)
npm run dev
