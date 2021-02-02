const fs = require("fs");
const puppeteer = require("puppeteer");

// IIFE (Immediately Invoked Function Expression)
(async () => {
	try {
		// initialize Puppeteer
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		// specify comic issue page url
		await page.goto(
			"https://comicpunch.net/readme/index.php?title=batman-the-adventures-continue-2020&chapter=1"
		);
		console.log("page has been loaded");

		// While page is waiting for 10s, click on the 'full chapter' button and do the rest
		await page.waitForTimeout(10000);
		await page.click("button.button4");
		console.log("full chapter button has been clicked");

		// evaluate/compute the main task
		const issueSrcs = await page.evaluate(() => {
			const srcs = Array.from(
				document.querySelectorAll(".comicpic")
			).map((image) => image.getAttribute("src"));
			return srcs;
		});
		console.log("page has been evaluated");

		// persist data into data.json file
		fs.writeFileSync("./data.json", JSON.stringify(issueSrcs));
		console.log("file created");

		// end puppeteer
		await browser.close();
	} catch (error) {
		console.log(error);
	}
})();
