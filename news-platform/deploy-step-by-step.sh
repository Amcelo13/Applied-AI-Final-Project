#!/bin/bash

# Step-by-step Vercel Deployment
echo "🚀 AI News Bias Analyzer - Vercel Deployment"
echo "============================================="

# Step 1: Check if logged in
echo "1️⃣ Checking Vercel authentication..."
if npx vercel whoami &> /dev/null; then
    echo "✅ Logged in to Vercel"
else
    echo "❌ Not logged in. Run: npx vercel login"
    exit 1
fi

# Step 2: Install dependencies
echo ""
echo "2️⃣ Installing dependencies..."
npm install

echo ""
echo "3️⃣ Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo ""
echo "4️⃣ Installing backend dependencies..."  
cd backend && npm install && cd ..

# Step 3: Build frontend
echo ""
echo "5️⃣ Building frontend..."
cd frontend && npm run build && cd ..

# Step 4: Deploy
echo ""
echo "6️⃣ Deploying to Vercel..."
echo "ℹ️  When prompted:"
echo "   - Project name: ai-news-bias-analyzer (or your choice)"
echo "   - Framework: Other (for the serverless setup)"
echo "   - Root directory: ./ (current directory)"
echo ""

npx vercel --prod

echo ""
echo "🎉 Deployment process complete!"
echo ""
echo "📋 Next steps:"
echo "1. 🔑 Add environment variables in Vercel dashboard:"
echo "   • ANTHROPIC_API_KEY = your_anthropic_key"
echo "   • EXA_API_KEY = your_exa_key"
echo "2. 🌐 Test your deployed app"
echo "3. 📱 Share the URL!"
