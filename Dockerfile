FROM node:6
EXPOSE 1337

RUN npm install sails -g
RUN npm install -g @angular/cli
RUN git clone https://github.com/ClioTolentino/todolist-server.git \
    && git clone https://github.com/ClioTolentino/todolist-webadmin.git \
    && cd /todolist-webadmin && npm i && npm run build \ 
    && cp -r dist/. ./../todolist-server/assets/ \
    && cp dist/index.html ./../todolist-server/views/homepage.ejs \
    && cd /todolist-server \
    && npm i
WORKDIR /todolist-server
CMD ["sails", "lift"]
