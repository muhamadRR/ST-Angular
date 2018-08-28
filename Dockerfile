FROM node:6-alpine

ENV NODE_ENV=production

COPY ./package.json src/

RUN cd /src && npm install 
RUN npm install -g @angular/cli@1.4.2
RUN  npm rebuild node-sass

COPY . /src

WORKDIR /src

RUN chmod +x ./www

EXPOSE 4200
ENTRYPOINT ["ng", "serve", "-H", "0.0.0.0"]
RUN npm rebuild node-sass --force

CMD ["./www"]
