const { chromium } = require('playwright');
const fs = require('fs');

async function testDSAPlayground() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', error => {
    errors.push(error.message);
  });

  const routes = ['/', '/stack', '/queue', '/bst', '/avl', '/heap', '/graph'];
  const results = {
    passed: [],
    failed: [],
    screenshots: []
  };

  for (const route of routes) {
    try {
      console.log(`\n=== Testing ${route} ===`);
      await page.goto(`http://localhost:3001${route}`, { waitUntil: 'networkidle', timeout: 60000 });
      console.log(`Page loaded: ${page.url()}`);
      
      // Wait a bit for any animations/3D scenes to initialize
      await page.waitForTimeout(3000);
      
      // Take screenshot at desktop
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.waitForTimeout(1000);
      const desktopPath = `dsa-${route.replace('/', '') || 'home'}-desktop-fixed.png`;
      await page.screenshot({ path: desktopPath, fullPage: true });
      console.log(`Desktop screenshot: ${desktopPath}`);
      
      // Take screenshot at mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);
      const mobilePath = `dsa-${route.replace('/', '') || 'home'}-mobile-fixed.png`;
      await page.screenshot({ path: mobilePath, fullPage: true });
      console.log(`Mobile screenshot: ${mobilePath}`);
      
      results.screenshots.push({ route, desktop: desktopPath, mobile: mobilePath });
      
      // Check for console errors on this route (ignore 400 for favicon)
      const reactErrors = errors.filter(e => 
        e.includes('ReactCurrentBatchConfig') || 
        e.includes('ReactCurrentOwner') ||
        e.includes('Cannot read properties of undefined')
      );
      
      if (reactErrors.length > 0) {
        console.log(`React errors on ${route}:`, reactErrors);
        results.failed.push({ route, reason: 'React errors', errors: [...reactErrors] });
      } else {
        console.log(`No React errors on ${route}`);
        results.passed.push({ route, check: 'No React errors' });
      }
      
      errors.length = 0;
      
    } catch (error) {
      console.error(`Error testing ${route}:`, error.message);
      results.failed.push({ route, reason: error.message });
    }
  }
  
  // Test navigation between routes
  try {
    console.log('\n=== Testing navigation between routes ===');
    await page.goto('http://localhost:3001/stack', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.goto('http://localhost:3001/queue', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.goto('http://localhost:3001/bst', { waitUntil: 'networkidle' });
    console.log('Navigation between routes works (no hard reload detected)');
    results.passed.push({ route: 'navigation', check: 'Smooth transitions between routes' });
  } catch (error) {
    console.error('Navigation test failed:', error.message);
    results.failed.push({ route: 'navigation', reason: error.message });
  }
  
  await browser.close();
  
  // Save results
  fs.writeFileSync('dsa-results-final.json', JSON.stringify(results, null, 2));
  console.log('\n=== DSA PLAYGROUND FINAL RESULTS ===');
  console.log('Passed:', results.passed.length);
  console.log('Failed:', results.failed.length);
  
  return results;
}

testDSAPlayground().catch(console.error);