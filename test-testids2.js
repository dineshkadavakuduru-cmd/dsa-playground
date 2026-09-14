const { chromium } = require('playwright');

async function testTestIds() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3001/stack', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000); // Wait for client-side hydration
    
    // Check page content
    const content = await page.content();
    const hasTestId = content.includes('data-testid');
    console.log('Page has data-testid attributes:', hasTestId);
    
    if (hasTestId) {
      // Find all data-testid values
      const matches = content.match(/data-testid="([^"]+)"/g);
      if (matches) {
        console.log('Found testids:', [...new Set(matches.map(m => m.replace('data-testid="', '').replace('"', '')))]);
      }
    } else {
      console.log('No data-testid found in page HTML');
      // Check if Playground content is there
      const hasPlayground = content.includes('Operation bench') || content.includes('RUN') || content.includes('Live narration');
      console.log('Playground content present:', hasPlayground);
    }
    
    // Take screenshot to verify
    await page.screenshot({ path: 'testids-check.png', fullPage: true });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  await browser.close();
}

testTestIds().catch(console.error);