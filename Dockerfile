# Use Alpine Linux as our base image so that we minimize the overall size our final container, and minimize the surface area of packages that could be out of date.
FROM node:16.15.1-alpine as builder

# Build dependencies
RUN apk upgrade -U -a \
  && apk add --no-cache \
  autoconf \
  automake \
  build-base \
  libtool \
  nasm \
  pkgconfig \
  && rm -rf /var/cache/* \
  && mkdir /var/cache/apk

# Install npm dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available
WORKDIR /app
COPY package*.json /app/
RUN npm install

# Get a clean image with binaries and the pre-built node modules
FROM node:16.15.1-alpine
RUN npm install -g @11ty/eleventy serve
COPY --from=builder /app/node_modules /app/node_modules
