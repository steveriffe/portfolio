#!/bin/bash
# 1-Command Deployment to Google Cloud Run Serverless
# Matches Steve Riffe's Career Agent & Music Roast Cloud Run deployment architecture
# Target Domain: https://portfolio.riffe.co.uk

set -e

SERVICE_NAME="portfolio"
REGION="us-west1" # Matches Career Agent and Music Roast region

echo "=================================================="
echo "🚀 Deploying Steve Riffe Portfolio to Cloud Run..."
echo "Target: https://portfolio.riffe.co.uk"
echo "=================================================="

# Deploy to Cloud Run from source (builds container automatically via Cloud Build)
gcloud run deploy "$SERVICE_NAME" \
  --source . \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 2 \
  --set-env-vars="NODE_ENV=production"

echo ""
echo "=================================================="
echo "✅ Deployed successfully to Cloud Run!"
echo "Map your custom domain portfolio.riffe.co.uk via:"
echo "gcloud beta run domain-mappings create --service $SERVICE_NAME --domain portfolio.riffe.co.uk --region $REGION"
echo "=================================================="
