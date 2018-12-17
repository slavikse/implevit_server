const puppeteer = require('puppeteer');

puppeteer.launch({ headless: true }).then(async (browser) => {
  const page = await browser.newPage();
  // page.setViewport({ width: 800, height: 600 });
  await page.goto('http://localhost:8080');

  // todo
  // await page.evaluate();

  // const player = await page.$('.player');

  await page.mouse.move(250, 300);
  await page.mouse.down();
  await page.waitFor(1000);

  await loop(page);

  // await page.mouse.up();

  // await browser.close();
});

async function loop(page) {
  await page.mouse.move(300, 350);
  await page.waitFor(1000);
  await page.mouse.move(150, 200);
  await page.waitFor(1000);
  await page.mouse.move(50, 400);
  await page.waitFor(1000);

  await loop(page);
}
