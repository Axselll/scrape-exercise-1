const puppeteer = require("puppeteer");

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("https://kenjimmy.me");
	await page.screenshot({
		path: "ex.png",
	});

	await browser.close();
})();
