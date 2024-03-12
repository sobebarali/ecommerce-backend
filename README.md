# E-commerce Backend System

This project is a microservices-based backend system for a simple e-commerce application. It is built using TypeScript, Express.js, and MongoDB. The system handles user authentication, product management, and order processing, with a focus on concurrency control and high availability through clustering.


## Microservices Repositories
- [User Authentication Service](https://github.com/sobebarali/user-auth-service)
- [Product Management Service](https://github.com/sobebarali/product-management-service)
- [Order Processing Service](https://github.com/sobebarali/order-service)

## Table of Contents

- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Setup and Deployment](#setup-and-deployment)
- [API Endpoints](#api-endpoints)
- [Concurrency Control](#concurrency-control)
- [Clustering and High Availability](#clustering-and-high-availability)
- [Database Integration](#database-integration)
- [Authentication and Authorization](#authentication-and-authorization)
- [Error Handling and Logging](#error-handling-and-logging)
- [Testing](#testing)
- [Bonus Features](#bonus-features)
- [Assumptions and Design Decisions](#assumptions-and-design-decisions)

## Architecture

The system follows a microservices architecture, with separate services for user authentication, product management, and order processing. Each microservice is built using TypeScript and Express.js, and communicates with other services through RESTful APIs.

## Technologies Used

- TypeScript: Used as the primary programming language for type safety and improved developer experience.
- Express.js: Used as the web framework for building the microservices.
- MongoDB: Used as the NoSQL database for storing user information, product data, and order history.
- Redis: Used for caching frequently accessed data.

## Setup and Deployment

1. Clone the repository.
2. Install the necessary dependencies for each microservice using `npm install`.
3. Set up the MongoDB database and update the database configuration in each microservice.
4. Build each microservice using `npm run build`.
5. Run each microservice using `npm start`.
6. Deploy the microservices on a Kubernetes cluster or a cloud platform like AWS, Azure, or Google Cloud.

For detailed instructions, please refer to the individual microservice READMEs.

## API Endpoints

Each microservice exposes RESTful APIs for specific functionalities:

- User Authentication Service:
  - User registration: `POST /auth/register`
  - User login: `POST /auth/login`
- Product Management Service:
  - Create a product: `POST /products`
  - List products: `GET /products`
  - Retrieve product details: `GET /products/:id`
  - Update a product: `PUT /products/:id`
  - Delete a product: `DELETE /products/:id`
- Order Processing Service:
  - Create an order: `POST /orders`
  - Retrieve order history: `GET /orders`
  - Update order status: `PUT /orders/:id/status`


## Concurrency Control

The product management service implements optimistic locking for concurrent access control. When multiple users attempt to update a product simultaneously, the system uses version numbers to detect and handle conflicts. This ensures that only one update succeeds while others fail gracefully, maintaining data integrity.

## Clustering and High Availability

- TODO: Add information about clustering and high availability.

## Database Integration

The system uses MongoDB as the NoSQL database for storing user information, product data, and order history. Each microservice has its own MongoDB collection and manages its own database connections and queries using the Mongoose library.

## Authentication and Authorization

User authentication is handled by the user authentication service. It uses JSON Web Tokens (JWTs) for authentication and authorization. Upon successful login, a JWT is issued and sent to the client. Protected endpoints in other microservices require a valid JWT to be accessed, and users can only access their own orders and authorized products.

## Error Handling and Logging

Comprehensive error handling is implemented in each microservice using Custom Error. Errors are caught, logged, and appropriate error responses are returned to the clients.

## Logging

- TODO: 

## Testing

Unit tests are written for critical components, including the concurrency control mechanisms, using the Jest testing framework. The tests ensure the correctness and reliability of the implemented functionalities.

## Bonus Features

The following bonus features have been implemented:

- API rate limiting: The system uses the `express-rate-limit` middleware to limit the number of requests a client can make within a specified time window, preventing abuse.
- Caching: Redis is used as a caching layer to improve system performance by caching frequently accessed data, such as product details and user information. (While service is added, fully not implemented)

## Assumptions and Design Decisions

- The system assumes that user authentication is handled separately and JWTs are used for authentication and authorization.
- The product management service uses optimistic locking with version numbers for concurrency control, assuming that conflicts are rare and can be handled gracefully.
- Redis can be used for caching to optimize read-heavy operations and reduce the load on the database.
- Asynchronous communication between microservices is not implemented in this version but can be added in future.