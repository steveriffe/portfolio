# Production Container for Google Cloud Run (Serverless Free Tier: $0.00/mo)
FROM node:22-slim

WORKDIR /app

ENV NODE_ENV=production \
    PORT=8080 \
    HOSTNAME="0.0.0.0"

COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY server.js ./
COPY public ./public

EXPOSE 8080

CMD ["node", "server.js"]
