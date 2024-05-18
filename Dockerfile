FROM node
EXPOSE 3000/tcp
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run db
RUN npm run build
CMD node .output/server/index.mjs