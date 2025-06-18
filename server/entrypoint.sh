#!/bin/bash

FLAG_FILE="/tmp/.seeded"  # Use /tmp instead of the working dir

if [ ! -f "$FLAG_FILE" ]; then
  echo "🌱 Seeding database..."
  node seed.js
  touch "$FLAG_FILE"
else
  echo "✅ Seed already applied. Skipping..."
fi

# Start the server
node server.js
