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

ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"

RUN npx prisma db push

RUN npx prisma generate

RUN ls -la /app


EXPOSE 8080

ENV NODE_ENV=development
ENV PORT=8080

CMD [ "npm", "run", "start"]
# CMD ["ts-node-dev", "--respawn", "--transpile-only", "index.ts"]