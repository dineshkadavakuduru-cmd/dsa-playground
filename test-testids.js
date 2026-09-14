const { chromium } = require('playwright');

async function testTestIds() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3001/stack', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);
    
    // Test each data-testid
    const testIds = [
      'operation-select',
      'operation-input',
      'mode-manual',
      'mode-random',
      'run-operation',
      'step-back',
      'play-pause',
      'step-forward',
      'reset-playback',
      'copy-scenario',
      'randomize-structure',
      'nav-stack',
      'nav-queue',
      'nav-bst',
      'nav-avl',
      'nav-heap',
      'nav-graph',
    ];
    
    console.log('=== Testing data-testid attributes ===\n');
    
    for (const testId of testIds) {
      const element = page.locator(`[data-testid="${testId}"]`);
      const count = await element.count();
      if (count > 0) {
        console.log(`✅ ${testId} - FOUND (${count} elements)`);
      } else {
        console.log(`❌ ${testId} - NOT FOUND`);
      }
    }
    
    // Test step buttons (dynamic)
    const stepButtons = page.locator('[data-testid^="step-"]');
    const stepCount = await stepButtons.count();
    console.log(`\nStep buttons: ${stepCount} found`);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  await browser.close();
}

testTestIds().catch(console.error);