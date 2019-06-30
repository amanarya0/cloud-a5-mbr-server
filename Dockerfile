FROM node
RUN npm install sails -g
ENV NODE_ENV development
WORKDIR app/
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 1337
CMD sails lift