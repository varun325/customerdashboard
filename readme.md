# Full Stack Customer Dashboard application Setup Guide

This repository contains a full-stack application setup using Docker, Node.js, PostgreSQL, and React.

## Prerequisites

- Docker
- Node.js
- npm

## Setup Instructions

1. Clone the repository to your local machine.

```bash
#clone the repo
git clone <repository-url>
cd <repository-folder>

#Run the project
docker compose up
```

- Access the application in your web browser at http://localhost:8080.

## Folder Structure
- api: Contains the code for the Node.js API server.
- web/customerdashboard: Contains the code for the React web application.
- PostgreSQL Database Configuration
> Database Name: mydatabase
> Username: myuser
> Password: mypassword
> Host: localhost
> Port: 5432

- API Server Configuration
> The API server is configured to run on port 3000.

## React Web Application
The React web application provides a dashboard to manage customer data. It offers features such as sorting, pagination, and searching.

> Ensure that ports 5432, 8080, and 3000 are not occupied by other services on your system.



