FROM node
EXPOSE 3000/tcp
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run db:generate
RUN npm run db:migrate
RUN npm run db:seed
RUN npm run dev