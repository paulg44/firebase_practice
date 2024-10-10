# Firebase & Stripe Practice Project

# Overview

A basic e-commerce project using Stripe for payments and Firebase for user authentication. This project first started as just getting a basic knowledge of the Firebase framework, I then added Stripe in at a later date. The project currently allows a user to sign up, sign in, buy a product or a mutliple of a single product, for example 3 apples, and then log out should they wish. It is an ongoing project designed so that as I grow and learn as a developer I can add things to this project to expand my knowledge and test out certain scenario's.

It is not currently deployed so should you wish to run it locally you may do so here
- git clone https://github.com/paulg44/firebase_practice.git
For the frontend
- cd firebase
- npm install
- npm start (should be running locally on port 3000)

For the server
- cd server
- npm install
- node server.js
However a Stripe account would be needed, I can provide the .env details on request

# Tech Stack

Frontend: React
Backend: Node.js & Express
Auth: Firebase
Payments: Stripe
Testing: React Testing Library, Cypress

# Learnings

The main objective of this project is to learn how the Stripe and Firebase API's work and what I can do with them. They are both well documented out of the box frameworks that have been easy to use. On Firebase specifically I am thinking about creating my own authentication from scratch, not because I think it will be better, but because I wouold like to know exactly what's going on under the hood.

# Continued Development

- Adding a basket so that a user can buy more than one product at once, example 3 apples AND 2 banana's
- Adding favourites to localStorage
- Adding a subscription service to learn about that side of Stripe
- Looking into saving data on the Firebase side instead of using a Postgres for example
- Complete testing, including mocks
- More integration between Firebase and Stripe, if that's possible
