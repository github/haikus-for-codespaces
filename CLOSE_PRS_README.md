# Close Pull Requests

This repository provides two methods to close all open pull requests with a comment explaining that this is a template repository maintained by the Codespaces team:

1. **Node.js Script** - Run locally with a GitHub token
2. **GitHub Actions Workflow** - Trigger from the GitHub UI (recommended)

---

## Method 1: GitHub Actions Workflow (Recommended)

### Usage

1. Go to the repository on GitHub
2. Click on **Actions** tab
3. Select **Close Open Pull Requests** workflow from the left sidebar
4. Click **Run workflow** button
5. Choose whether to do a dry run first (recommended):
   - Select `true` for dry run (lists PRs without closing them)
   - Select `false` to actually close the PRs
6. Click **Run workflow** to start

### Advantages

- No need to install anything locally
- Uses built-in GitHub authentication
- Safe dry-run mode to preview what will happen
- All actions are logged in the workflow run
- Can be scheduled or triggered by events

---

## Method 2: Node.js Script

This script closes all open pull requests in the `github/haikus-for-codespaces` repository with a comment explaining that this is a template repository maintained by the Codespaces team.

### Prerequisites

- Node.js installed
- A GitHub Personal Access Token with `repo` permissions

### How to Get a GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" (classic)
3. Give it a descriptive name like "Close PRs Script"
4. Select the `repo` scope (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't be able to see it again)

### Usage

```bash
# Set your GitHub token as an environment variable
export GITHUB_TOKEN=your_github_token_here

# Run the script
node close-prs.js
```

Or in a single command:

```bash
GITHUB_TOKEN=your_github_token_here node close-prs.js
```

### What the Script Does

1. Fetches all open pull requests in the repository
2. For each open PR:
   - Adds a comment: "This is a template repo, with changes owned by the Codespaces team."
   - Closes the pull request
3. Reports the status of each operation

### Example Output

```
Fetching open PRs for github/haikus-for-codespaces...
Found 8 open pull request(s).

Processing PR #463: [WIP] Force close all open PRs in template repo
  Adding comment...
  Closing PR...
  ✓ Successfully closed PR #463

Processing PR #462: Create from wahyu to ania
  Adding comment...
  Closing PR...
  ✓ Successfully closed PR #462

...

Done!
```

### Security Notes

- Never commit your GitHub token to the repository
- Use environment variables to pass sensitive credentials
- The token should have minimal required permissions (repo scope)
- Consider deleting the token after use

### Alternative: Using GitHub CLI

If you have `gh` (GitHub CLI) installed, you can also use it:

```bash
# List all open PRs
gh pr list --repo github/haikus-for-codespaces --state open

# Close each PR with a comment (manual approach)
gh pr close <PR_NUMBER> --repo github/haikus-for-codespaces --comment "This is a template repo, with changes owned by the Codespaces team."
```

### Notes

- This script uses the native Node.js `https` module (no external dependencies required)
- The script will process all open PRs, including the one it was created from
- Failed operations are logged but don't stop the script from processing remaining PRs
