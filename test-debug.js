const { chromium } = require('playwright');

async function testDebug() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3001/stack', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000);
    
    // Check what's on the page
    const content = await page.content();
    console.log('Page title:', await page.title());
    console.log('Has CALIBRATING STAGE:', content.includes('CALIBRATING STAGE'));
    console.log('Has Operation bench:', content.includes('Operation bench'));
    console.log('Has Live narration:', content.includes('Live narration'));
    console.log('Has data-testid:', content.includes('data-testid'));
    
    // Check if elements exist via evaluate
    const testIds = ['nav-stack', 'operation-select', 'run-operation'];
    for (const testId of testIds) {
      const exists = await page.evaluate((id) => {
        return document.querySelector(`[data-testid="${id}"]`) !== null;
      }, testId);
      console.log(`${testId}:`, exists ? 'FOUND' : 'NOT FOUND');
    }
    
    // Take screenshot
    await page.screenshot({ path: 'debug-stack.png', fullPage: true });
    console.log('Screenshot saved');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  await browser.close();
}

testDebug().catch(console.error);