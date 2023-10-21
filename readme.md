# Kafka + Microservices

Basic application to study the functioning of Kafkajs for sending and receiving messages/events between applications with microservices architecture

## What is this application?

A simple monorepo application where an account is registered using the account microservice, after creating the account, a message is sent to the Kafka server where the email microservice listens for these messages and sends a welcome email.

## How to test?

- Configure your email account used by nodemailer
- Run all containers with this commands
  - `docker compose -up // Run all containers`
  - `docker exec -it app bash // Install dependencies and run account microservice`
    - `npm i`
    - `npm run account:dev`
  - `docker exec -it app bash // Execute email microservice`
    - `npm run email:dev`
- Send a post request with the fields _"email, password, name"_ to the `/api/accounts` endpoint
- Check the inbox of the created email 🚀
