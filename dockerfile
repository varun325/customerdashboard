# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest

# Environment variables
ENV POSTGRES_DB=mydatabase
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword

# Copy the SQL script that creates the table and inserts dummy data
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432