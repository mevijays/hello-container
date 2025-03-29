const request = require('supertest');
const path = require('path');
const fs = require('fs');

// Import server app
const app = require('../src/server');
const containerDetector = require('../src/utils/container-detector');

// Mock the container detector module
jest.mock('../src/utils/container-detector');

describe('Server Routes', () => {
  test('GET / should serve the index.html page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
  });

  test('GET /nonexistent-route should return 404', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.status).toBe(404);
  });
});

// Tests for the /api/deployment-info endpoint
describe('Deployment Info API', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });
    
    test('GET /api/deployment-info should return kubernetes deployment info', async () => {
        // Setup mock return value for kubernetes
        containerDetector.detectDeployment.mockReturnValue({
            environment: 'kubernetes',
            podName: 'test-pod',
            deploymentName: 'test-deployment',
            namespace: 'test-namespace'
        });
        
        const response = await request(app).get('/api/deployment-info');
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            environment: 'kubernetes',
            podName: 'test-pod',
            deploymentName: 'test-deployment',
            namespace: 'test-namespace'
        });
        expect(containerDetector.detectDeployment).toHaveBeenCalledTimes(1);
    });
    
    test('GET /api/deployment-info should return docker container info', async () => {
        // Setup mock return value for docker
        containerDetector.detectDeployment.mockReturnValue({
            environment: 'docker',
            containerName: 'test-container'
        });
        
        const response = await request(app).get('/api/deployment-info');
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            environment: 'docker',
            containerName: 'test-container'
        });
        expect(containerDetector.detectDeployment).toHaveBeenCalledTimes(1);
    });
    
    test('GET /api/deployment-info should handle errors gracefully', async () => {
        // Setup mock to throw an error
        containerDetector.detectDeployment.mockImplementation(() => {
            throw new Error('Detection failed');
        });
        
        const response = await request(app).get('/api/deployment-info');
        
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
        expect(containerDetector.detectDeployment).toHaveBeenCalledTimes(1);
    });
});

// Create a separate test file for the container detector
// filepath: /Users/vijay/hello-npm/nodejs-container-app/tests/container-detector.test.js