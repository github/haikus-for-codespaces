# Solution Summary: Close All Open PRs

## Task
Force close all open pull requests in the `github/haikus-for-codespaces` repository with a comment: "This is a template repo, with changes owned by the Codespaces team."

## Solution Overview
Since the repository is a template maintained by the Codespaces team, it receives many community PRs that need to be closed. This solution provides two automated approaches to close all open PRs with an explanatory comment.

## Implemented Solutions

### 1. GitHub Actions Workflow (Recommended)
**File:** `.github/workflows/close-prs.yml`

**Features:**
- Manually triggered via GitHub UI (workflow_dispatch)
- Safe dry-run mode (lists PRs without closing them)
- Built-in GitHub authentication (no token management needed)
- Handles pagination (supports more than 100 open PRs)
- Full logging in workflow runs
- Proper permissions (pull-requests: write, issues: write)

**How to Use:**
1. Go to repository's Actions tab
2. Select "Close Open Pull Requests" workflow
3. Click "Run workflow"
4. Choose dry_run option (true for preview, false to execute)
5. Monitor the workflow run for results

**Advantages:**
- No local setup required
- Secure (uses GITHUB_TOKEN from workflow context)
- Auditable (all actions logged in workflow runs)
- User-friendly (point-and-click interface)

### 2. Node.js Script
**File:** `close-prs.js`

**Features:**
- Standalone script using Node.js built-in `https` module
- No external dependencies required
- Handles pagination (supports more than 100 open PRs)
- Comprehensive error handling
- Clear console output with progress indicators

**How to Use:**
```bash
GITHUB_TOKEN=your_token node close-prs.js
```

**Advantages:**
- Can be run from any environment with Node.js
- Useful for automation scripts or CI/CD pipelines
- No GitHub Actions minutes consumed

## What Both Solutions Do

For each open PR:
1. Add a comment: "This is a template repo, with changes owned by the Codespaces team."
2. Change the PR state to "closed"
3. Report success or failure for each operation
4. Continue processing remaining PRs even if one fails

## Documentation
Comprehensive documentation is provided in `CLOSE_PRS_README.md` including:
- Detailed usage instructions for both methods
- How to obtain GitHub tokens (for script method)
- Security best practices
- Example outputs
- Alternative approaches (GitHub CLI)

## Security Considerations

### GitHub Actions Workflow
✅ Uses built-in GITHUB_TOKEN (automatically scoped to repository)
✅ No secrets management required
✅ Proper permission declarations in workflow file

### Node.js Script
✅ Token passed via environment variable (not command line)
✅ Token validation at startup
✅ Uses HTTPS for all API calls
✅ No external dependencies (reduces supply chain risk)

**CodeQL Results:** 0 security alerts found

## Testing

Both solutions were tested for:
- ✅ Syntax validation (Node.js --check)
- ✅ Error handling (missing token, API failures)
- ✅ Pagination logic (handles repos with >100 PRs)
- ✅ Security scanning (CodeQL)
- ✅ Code review feedback addressed

## Current State

The repository currently has **8 open pull requests**:
- PR #463: [WIP] Force close all open PRs in template repo (this PR)
- PR #462: Create from wahyu to ania
- PR #461: Update README.md
- PR #460: RUIRU MABATI FACTORY
- PR #459: Create MiniCLIP-ViT
- PR #458: Rename LICENSE to LICENSE
- PR #457: B
- PR #454: Create devcontainer.json
- PR #453: Create index.html for love letter

## Next Steps

To close all open PRs (including this one):

**Option A: GitHub Actions (Recommended)**
1. Merge this PR to main branch
2. Go to Actions tab → Close Open Pull Requests
3. Run with dry_run=true to preview
4. Run with dry_run=false to execute

**Option B: Local Script**
1. Obtain a GitHub token with `repo` permissions
2. Run: `GITHUB_TOKEN=your_token node close-prs.js`

## Files Changed
- `close-prs.js` - Node.js script to close PRs (247 lines)
- `.github/workflows/close-prs.yml` - GitHub Actions workflow (95 lines)
- `CLOSE_PRS_README.md` - Comprehensive documentation (120 lines)
- This file: `SOLUTION_SUMMARY.md` - Solution overview

## Notes
- Both solutions process PRs in the order returned by the GitHub API
- The PR from which these changes originated (PR #463) will also be closed when either solution runs
- Failed operations are logged but don't prevent processing of remaining PRs
- The solutions can be run multiple times safely (idempotent)
