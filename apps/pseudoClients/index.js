const puppeteer = require('puppeteer');

puppeteer.launch({ headless: true }).then(async (browser) => {
  for (let i = 0; i < 5; i++) {
    try {
      const page = await browser.newPage();
      client(page);
    } catch (err) {
      console.dir(err);
    }
  }
});

async function client(page) {
  // page.setViewport({ width: 800, height: 600 });
  await page.goto('http://slavikse.ru');

  // todo
  // await page.evaluate();

  // const player = await page.$('.player');

  await page.mouse.move(250, 300);
  await page.mouse.down();
  await page.waitFor(1000);

  await loop(page);

  // await page.mouse.up();

  // await browser.close();
}

async function loop(page) {
  await page.mouse.move(300, 350);
  await page.waitFor(1000);
  await page.mouse.move(150, 200);
  await page.waitFor(1000);
  await page.mouse.move(50, 400);
  await page.waitFor(1000);

  loop(page);
}
