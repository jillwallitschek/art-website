#!/bin/bash

source .env

# Update the package repository
echo "running app update"
sudo apt update

# Cert bot - obtain ssl certificate
echo "doing certbot at $DOMAIN_NAME and $DOMAIN_ALIAS"
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d $DOMAIN_NAME -d $DOMAIN_ALIAS
sudo systemctl reload nginx

# Install Docker
echo "installing docker"
sudo apt install docker.io -y

# Start and enable Docker service
echo "starting docker"
sudo systemctl start docker
sudo systemctl enable docker

# load the image
echo "loading image"
sudo docker load -i website.tar

# Create the systemd service file for the website
echo "creating service"
echo "[Unit]
Description=Website Server
After=network.target

[Service]
ExecStart=sudo docker run -d -p 8080:80 --name website website 
ExecStop=sudo docker stop website
Restart=always

[Install]
WantedBy=multi-user.target" | sudo tee /etc/systemd/system/website.service > /dev/null


# Enable and start the website service
echo "enabling service"
sudo systemctl enable website.service
echo "starting service"
sudo systemctl start website.service