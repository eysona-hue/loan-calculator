const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'studentLoanSourceMonitor.json'), 'utf8'));
function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'CheckMyPaymentsSourceMonitor/1.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ url, status: res.statusCode, hash: crypto.createHash('sha256').update(data).digest('hex'), bytes: data.length }));
    }).on('error', reject);
  });
}
(async () => {
  console.log('Check My Payments student loan source monitor');
  console.log('Mode:', config.mode);
  const results = [];
  for (const url of config.sources) {
    try {
      const result = await get(url);
      results.push(result);
      console.log(`${result.status} ${result.bytes} bytes ${result.hash} ${result.url}`);
      if (result.status >= 400) process.exitCode = 1;
    } catch (error) {
      console.error('Failed:', url, error.message);
      process.exitCode = 1;
    }
  }
  console.log('Review StudentAid.gov manually before changing rates or calculations.');
})();
