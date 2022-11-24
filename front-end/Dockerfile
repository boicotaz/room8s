FROM node
COPY ./package.json /home/node/package.json
WORKDIR /home/node
RUN /usr/local/bin/npm install
WORKDIR /opt
ENTRYPOINT [ "/usr/local/bin/npm", "start"]
