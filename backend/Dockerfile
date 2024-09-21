# Use the official Python image from the Docker Hub
FROM python:3.10-slim

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Create a directory in the container for the app
RUN mkdir /code
WORKDIR /code

# Install dependencies
COPY requirements.txt /code/
RUN pip install -r requirements.txt

# Copy the project code
COPY . /code/ 

# Run the server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
