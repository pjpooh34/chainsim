#!/usr/bin/env node

/**
 * ChainSim Platform Test Script
 * Tests the basic functionality of the application
 */

const http = require('http');
const https = require('https');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;
    
    const requestOptions = {
      timeout: 5000,
      ...options,
    };

    const req = client.request(url, requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => reject(new Error('Request timeout')));
    req.end();
  });
}

async function testEndpoint(name, url, expectedStatus = 200) {
  try {
    log(`Testing ${name}...`, 'cyan');
    const response = await makeRequest(url);
    
    if (response.statusCode === expectedStatus) {
      log(`✅ ${name}: OK (${response.statusCode})`, 'green');
      return true;
    } else {
      log(`❌ ${name}: Expected ${expectedStatus}, got ${response.statusCode}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ ${name}: ${error.message}`, 'red');
    return false;
  }
}

async function testAPIEndpoint(name, url, method = 'GET', data = null) {
  try {
    log(`Testing API ${name}...`, 'cyan');
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(data));
    }

    const response = await makeRequest(url, options);
    
    if (response.statusCode >= 200 && response.statusCode < 300) {
      log(`✅ API ${name}: OK (${response.statusCode})`, 'green');
      return true;
    } else {
      log(`❌ API ${name}: ${response.statusCode} - ${response.data}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ API ${name}: ${error.message}`, 'red');
    return false;
  }
}

async function runTests() {
  log('🧪 ChainSim Platform Test Suite', 'bright');
  log('================================', 'bright');
  
  const results = [];
  
  // Test frontend
  results.push(await testEndpoint('Frontend', 'http://localhost:3001'));
  
  // Test backend health
  results.push(await testEndpoint('Backend Health', 'http://localhost:5001/health'));
  
  // Test API endpoints
  results.push(await testAPIEndpoint('Auth Register', 'http://localhost:5001/api/auth/register', 'POST', {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  }));
  
  results.push(await testAPIEndpoint('Projects List', 'http://localhost:5001/api/sandbox/projects'));
  results.push(await testAPIEndpoint('Regulatory Updates', 'http://localhost:5001/api/regradar/updates'));
  results.push(await testAPIEndpoint('Portfolio Templates', 'http://localhost:5001/api/portfolio/templates'));
  results.push(await testAPIEndpoint('Analytics Platform', 'http://localhost:5001/api/analytics/platform'));
  
  // Summary
  log('\n📊 Test Results Summary', 'bright');
  log('========================', 'bright');
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  if (passed === total) {
    log(`🎉 All tests passed! (${passed}/${total})`, 'green');
  } else {
    log(`⚠️  ${passed}/${total} tests passed`, 'yellow');
  }
  
  log('\n💡 Tips:', 'bright');
  log('• Make sure all services are running: docker-compose up -d', 'blue');
  log('• Check logs: docker-compose logs -f', 'blue');
  log('• Verify environment configuration in backend/.env', 'blue');
  log('• Ensure MongoDB is accessible', 'blue');
}

// Run tests
runTests().catch(error => {
  log(`💥 Test suite failed: ${error.message}`, 'red');
  process.exit(1);
});
