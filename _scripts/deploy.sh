#!/bin/bash

source .env
LATEST_LOCATION="./_dist/latest"
PREVIOUS_LOCATION="./_dist/previous"

# make latest folder
echo "checking deployment folders"
if [ -d "$LATEST_LOCATION" ]; then
    if [ ! -d "$PREVIOUS_LOCATION" ]; then
        mkdir -p "$PREVIOUS_LOCATION"
        echo "Directory $PREVIOUS_LOCATION created."
    fi
    mv "$LATEST_LOCATION/"* "$PREVIOUS_LOCATION"
else
    mkdir -p "$LATEST_LOCATION"
    echo "Directory $LATEST_LOCATION created."
fi

#save as tar
echo "saving tar file"
docker save -o $LATEST_LOCATION/website.tar website

#transfer to ec2
echo "uploading to ec2"
scp -i $PEM_FILE $LATEST_LOCATION/website.tar $EC2_USER@$EC2_PUBLIC_IP:~/.
scp -i $PEM_FILE .env $EC2_USER@$EC2_PUBLIC_IP:~/.
scp -i $PEM_FILE _scripts/setup_server.sh $EC2_USER@$EC2_PUBLIC_IP:~/.

# SSH into the EC2 instance and load the Docker image, then run the container
echo "sshing into ec2"
ssh -i $PEM_FILE $EC2_USER@$EC2_PUBLIC_IP << 'EOF'
# Check if the website.service exists
if ! systemctl list-unit-files | grep -q "^website.service"; then
    echo "website.service does not exist. Running setup_server.sh..."
    ./setup_server.sh
fi
sudo docker load -i website.tar
sudo systemctl start website.service
EOF