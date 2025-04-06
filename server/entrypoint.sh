#!/bin/sh

# Check if seeding was already done
if [ ! -f .seeded ]; then
  node seed.js    # Run seeding
  touch .seeded   # Create a flag file
fi

# Start the server (always)
node server.js