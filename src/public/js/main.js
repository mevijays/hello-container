// src/public/js/main.js

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const logoElement = document.getElementById('environment-logo');
    const titleElement = document.getElementById('environment-title');
    const infoContainer = document.getElementById('deployment-info');
    
    // Function to detect the deployment environment
    function detectEnvironment() {
        return fetch('/api/deployment-info')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Deployment info:', data);
                
                // Update UI based on environment
                if (data.environment === 'kubernetes') {
                    // Kubernetes environment
                    logoElement.src = 'img/k8s.png';
                    titleElement.textContent = 'Hello Kubernetes!';
                    
                    infoContainer.innerHTML = `
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card mb-3">
                                    <div class="card-header">Pod Name</div>
                                    <div class="card-body">
                                        <p class="card-text">${data.podName || 'Not available'}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card mb-3">
                                    <div class="card-header">Deployment Name</div>
                                    <div class="card-body">
                                        <p class="card-text">${data.deploymentName || 'Not available'}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card mb-3">
                                    <div class="card-header">Namespace</div>
                                    <div class="card-body">
                                        <p class="card-text">${data.namespace || 'Not available'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                } else if (data.environment === 'docker') {
                    // Docker environment
                    logoElement.src = 'img/horizontal-logo-monochromatic-white.png';
                    titleElement.textContent = 'Hello Docker!';
                    
                    infoContainer.innerHTML = `
                        <div class="row justify-content-center">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">Container Name</div>
                                    <div class="card-body">
                                        <p class="card-text">${data.containerName || 'Not available'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    // Local environment or unknown
                    logoElement.src = 'img/logo.svg';
                    titleElement.textContent = 'Hello Node.js!';
                    
                    infoContainer.innerHTML = `
                        <div class="row justify-content-center">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">Hostname</div>
                                    <div class="card-body">
                                        <p class="card-text">${data.hostname || 'Not available'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                return data;
            })
            .catch(error => {
                console.error('Error detecting environment:', error);
                // Display error message
                if (infoContainer) {
                    infoContainer.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            Failed to fetch deployment information. Error: ${error.message}
                        </div>
                    `;
                }
            });
    }
    
    // Call the function to detect environment and update UI
    detectEnvironment();
});