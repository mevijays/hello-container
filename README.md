# Node.js Container App

This project is a simple Node.js application that provides a single-page GUI using Bootstrap 4. It is designed to run in a containerized environment, either Docker or Kubernetes, and displays relevant information based on the deployment context.

## Features

- Detects whether the application is running in Docker or Kubernetes.
- Displays a greeting message with the appropriate logo.
- Shows the pod name, deployment name, and namespace when deployed on Kubernetes.
- Displays the container name when deployed on Docker.
- A footer message that welcomes users to mevijay.dev.

## Project Structure

```
nodejs-container-app
├── src
│   ├── public
│   │   ├── css
│   │   │   └── styles.css
│   │   ├── js
│   │   │   └── main.js
│   │   └── index.html
│   ├── server.js
│   └── utils
│       └── container-detector.js
├── Dockerfile
├── .dockerignore
├── package.json
├── package-lock.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/nodejs-container-app.git
   cd nodejs-container-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application locally:**
   ```
   npm start
   ```

4. **Containerize the application:**
   - To build the Docker image:
     ```
     docker build -t nodejs-container-app .
     ```
   - To run the Docker container:
     ```
     docker run -p 3000:3000 nodejs-container-app
     ```

5. **Deploy on Kubernetes:**
   - Create a deployment and service YAML file to deploy the application on Kubernetes.

## Usage

- Access the application in your web browser at `http://localhost:3000`.
- The application will display the appropriate greeting and container information based on the environment it is running in.

## License

This project is licensed under the MIT License. See the LICENSE file for details.