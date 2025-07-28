#!/bin/bash

export SKIP_PREFLIGHT_CHECK=true
export GENERATE_SOURCEMAP=false
export TSC_COMPILE_ON_ERROR=true
export ESLINT_NO_DEV_ERRORS=true

echo "🔧 Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps --silent

echo "🏗️ Building React app..."
npm run build 