const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');

async function push() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.argv[2];
  
  if (!token) {
    console.error('\n[Error] GitHub Personal Access Token required.');
    console.error('Usage:');
    console.error('  npm run git:push -- <YOUR_GITHUB_TOKEN>');
    console.error('  or:');
    console.error('  GITHUB_TOKEN=ghp_xxx npm run git:push\n');
    process.exit(1);
  }

  console.log('Pushing main branch to https://github.com/balajiamigowebster/dharmiclife.git ...');

  try {
    const pushResult = await git.push({
      fs,
      http,
      dir: process.cwd(),
      remote: 'origin',
      ref: 'main',
      force: true,
      onAuth: () => ({
        username: 'balajiamigowebster',
        password: token.trim()
      })
    });

    console.log('[Success] Successfully pushed to https://github.com/balajiamigowebster/dharmiclife.git!');
    console.log(pushResult);
  } catch (error) {
    console.error('[Error] Push failed:', error.message);
    if (error.data) console.error(error.data);
    process.exit(1);
  }
}

push();
