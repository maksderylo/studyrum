version: "3.8"
services:
  server:
    build: ./server
    container_name: server_cont
    ports:
      - '8081:8081'
    volumes: 
      - ./server:/app
  client:
    build: ./client
    container_name: client_cont
    ports:
      - '3000:3000'
    stdin_open: true
    tty: true
    
