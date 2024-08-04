const express = require("express");
const puppeteer = require("puppeteer");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://kur.doviz.com/");

    const data = await page.evaluate(() => {
      const results = [];
      const rows = document.querySelectorAll(
        ".value-table .sortable .tablesorter tbody tr"
      );

      rows.forEach((row) => {
        const imgElement = row.querySelector("td a img");
        const imgSrc = imgElement ? imgElement.getAttribute("data-src") : "";
        const currencyDetails =
          row.querySelector("td a .currency-details div")?.innerText || "";
        const cname =
          row.querySelector("td a .currency-details .cname")?.innerText || "";
        const textBoldElements = row.querySelectorAll("td.text-bold");
        const textBold = Array.from(textBoldElements)
          .map((element) => element.innerText)
          .join(" | ");

        results.push({ imgSrc, currencyDetails, cname, textBold });
      });

      return results;
    });

    await browser.close();

    const filteredData = data.filter(item => 
      ["USD", "EUR", "GBP", "CHF", "CAD", "RUB", "AUD", "SEK"].includes(item.currencyDetails)
    );

    res.status(200).json({ success: true, data: filteredData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
