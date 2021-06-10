FROM node:14
COPY src /opt/app

RUN npm install --prefix /opt/app
CMD ["npm", "start", "--prefix",  "/opt/app/"]