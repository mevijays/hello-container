const fs = require('fs');
const os = require('os');

/**
 * A utility module to detect the container environment (Docker or Kubernetes)
 * and retrieve deployment information
 */
const containerDetector = {
    /**
     * Detects whether the application is running in Docker or Kubernetes
     * and returns relevant information about the deployment
     * 
     * @returns {Object} Deployment information
     */
    detectDeployment: function() {
        // Default response
        const deploymentInfo = {
            environment: 'unknown',
            containerName: os.hostname(),
            podName: null,
            deploymentName: null,
            namespace: null,
            logoPath: '/img/logo.svg' // Default logo
        };

        // Check if running in Kubernetes by checking for Kubernetes environment variables
        if (process.env.KUBERNETES_SERVICE_HOST) {
            deploymentInfo.environment = 'kubernetes';
            deploymentInfo.logoPath = '/img/kubernetes-logo.png';
            
            // Get pod name from hostname
            deploymentInfo.podName = os.hostname();
            
            // Try to get namespace using Kubernetes downward API
            if (process.env.POD_NAMESPACE) {
                deploymentInfo.namespace = process.env.POD_NAMESPACE;
            } else {
                try {
                    // If running in a Kubernetes pod, this file should exist
                    const namespace = fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/namespace', 'utf8');
                    deploymentInfo.namespace = namespace.trim();
                } catch (error) {
                    // If we can't read the file, we'll leave namespace as null
                }
            }

            // Try to extract deployment name from pod name (typical format: deployment-name-random-id)
            if (deploymentInfo.podName) {
                const parts = deploymentInfo.podName.split('-');
                if (parts.length > 2) {
                    // Remove the last parts (usually random characters) to get deployment name
                    deploymentInfo.deploymentName = parts.slice(0, -2).join('-');
                }
            }
        } 
        // Check if running in Docker
        else if (this.isRunningInDocker()) {
            deploymentInfo.environment = 'docker';
            deploymentInfo.logoPath = '/img/docker-logo.png';
            // In Docker, the hostname is usually the container ID (shortened)
            deploymentInfo.containerName = os.hostname();
        } else {
            // If not in Kubernetes or Docker, assume local development
            deploymentInfo.environment = 'local';
            deploymentInfo.logoPath = '/img/logo.svg';
            deploymentInfo.hostname = os.hostname();
        }

        return deploymentInfo;
    },

    /**
     * Helper method to check if running in Docker
     * 
     * @returns {boolean} True if running in Docker
     */
    isRunningInDocker: function() {
        try {
            // Check for .dockerenv file
            if (fs.existsSync('/.dockerenv')) {
                return true;
            }
            
            // Check cgroup file for Docker references
            try {
                const cgroupContent = fs.readFileSync('/proc/1/cgroup', 'utf8');
                return cgroupContent.includes('docker');
            } catch (e) {
                // Ignore errors reading cgroup file
            }
            
            return false;
        } catch (error) {
            return false;
        }
    }
};

module.exports = containerDetector;