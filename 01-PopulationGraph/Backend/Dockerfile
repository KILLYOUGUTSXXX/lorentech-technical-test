FROM node:20.18.2-bullseye as builder

WORKDIR /var/www/lorentech-aidil/population-province

COPY ./package.json ./


RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 180000
RUN npm install --legacy-peer-deps

# ---------------------------------------------- #
FROM node:20.18.2-bullseye

WORKDIR /var/www/lorentech-aidil/population-province

USER root

COPY --from=builder /var/www/lorentech-aidil/population-province/node_modules ./node_modules
COPY . .


RUN npm run build

RUN chmod 770 ./commands.sh
CMD ./commands.sh