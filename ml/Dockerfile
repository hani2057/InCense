# Base Image
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install the dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && pip install --no-cache-dir -r requirements.txt \
    && apt-get remove -y gcc \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the content of the local src directory to the working directory
COPY . .

# Expose the port
EXPOSE 5000

# Run the command to start the application
CMD ["python", "app.py"]
