const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const url = process.env.URL || 'http://localhost:5173/dashboard';
  const outDir = path.resolve(__dirname, '..', 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  console.log('Opening', url);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const screenshotPath = path.join(outDir, 'dashboard.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Saved screenshot to', screenshotPath);

  await browser.close();
})();
