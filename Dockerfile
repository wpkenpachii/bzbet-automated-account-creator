FROM node:20

WORKDIR /app

COPY package.json package-lock.json /app/
COPY src /app/
COPY download_chrome_drivers.sh /app/

RUN apt update && apt upgrade -y

RUN chmod +x /app/download_chrome_drivers.sh && \
    ./download_chrome_drivers.sh && \
    unzip win-driver.zip -d drivers/ && \
    unzip linux-driver.zip -d drivers/
    
RUN npm install

CMD [ "tail", "-f", "/dev/null" ]