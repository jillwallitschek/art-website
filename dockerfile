# Use an official nginx image as the base image
FROM nginx:latest

# Copy website files to the nginx html directory
COPY ./website /usr/share/nginx/html