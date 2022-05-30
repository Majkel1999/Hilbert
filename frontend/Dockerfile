FROM node:17-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json package-lock.json ./
RUN npm install -g npm@latest
RUN npm ci --silent && npm install react-scripts@3.4.1 -g --silent
COPY . ./
ENV REACT_APP_SERVER_URL=http://localhost:8000/api/v1/
ENV REACT_APP_WS=ws://localhost:8000/api/v1
RUN npm run build

FROM nginx:1.21.6-alpine as host
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]

