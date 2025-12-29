#!/usr/bin/env node

/**
 * Script to close all open Pull Requests in the repository
 * with a specific comment explaining why they are being closed.
 * 
 * This repository is a template repo maintained by the Codespaces team.
 * 
 * Usage:
 *   GITHUB_TOKEN=your_token node close-prs.js
 * 
 * Note: Requires a GitHub token with repo permissions
 */

const https = require('https');

const OWNER = 'github';
const REPO = 'haikus-for-codespaces';
const COMMENT_MESSAGE = 'This is a template repo, with changes owned by the Codespaces team.';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error('Error: GITHUB_TOKEN environment variable is required');
  console.error('Usage: GITHUB_TOKEN=your_token node close-prs.js');
  process.exit(1);
}

/**
 * Make an HTTPS request to GitHub API
 */
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body || '{}'));
          } catch (e) {
            resolve(body);
          }
        } else {
          reject(new Error(`Request failed with status ${res.statusCode}: ${body}`));
        }
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

/**
 * Get all open pull requests (handles pagination)
 */
async function getOpenPRs() {
  let allPRs = [];
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${OWNER}/${REPO}/pulls?state=open&per_page=100&page=${page}`,
      method: 'GET',
      headers: {
        'User-Agent': 'close-prs-script',
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    };
    
    const prs = await makeRequest(options);
    allPRs = allPRs.concat(prs);
    
    // If we got less than 100 PRs, we've reached the end
    if (prs.length < 100) {
      hasMore = false;
    } else {
      page++;
    }
  }
  
  return allPRs;
}

/**
 * Add a comment to a pull request
 */
async function addComment(prNumber, message) {
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${OWNER}/${REPO}/issues/${prNumber}/comments`,
    method: 'POST',
    headers: {
      'User-Agent': 'close-prs-script',
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    }
  };
  
  return makeRequest(options, { body: message });
}

/**
 * Close a pull request
 */
async function closePR(prNumber) {
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${OWNER}/${REPO}/pulls/${prNumber}`,
    method: 'PATCH',
    headers: {
      'User-Agent': 'close-prs-script',
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    }
  };
  
  return makeRequest(options, { state: 'closed' });
}

/**
 * Main function
 */
async function main() {
  try {
    console.log(`Fetching open PRs for ${OWNER}/${REPO}...`);
    const prs = await getOpenPRs();
    
    if (prs.length === 0) {
      console.log('No open pull requests found.');
      return;
    }
    
    console.log(`Found ${prs.length} open pull request(s).`);
    
    for (const pr of prs) {
      console.log(`\nProcessing PR #${pr.number}: ${pr.title}`);
      
      try {
        // Add comment
        console.log(`  Adding comment...`);
        await addComment(pr.number, COMMENT_MESSAGE);
        
        // Close the PR
        console.log(`  Closing PR...`);
        await closePR(pr.number);
        
        console.log(`  ✓ Successfully closed PR #${pr.number}`);
      } catch (error) {
        console.error(`  ✗ Failed to close PR #${pr.number}:`, error.message);
      }
    }
    
    console.log('\nDone!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
