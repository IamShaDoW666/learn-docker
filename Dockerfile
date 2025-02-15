FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copy the Prisma schema
COPY prisma ./prisma

# Bundle app source
COPY . .

RUN npm run build

RUN npx prisma generate

RUN ls -la /app


EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080

CMD [ "npm", "run", "start"]
# CMD ["ts-node-dev", "--respawn", "--transpile-only", "index.ts"]