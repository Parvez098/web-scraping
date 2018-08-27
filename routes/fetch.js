const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");

router.get("/amazon/mobile", (req, res) => {
    let url = 'https://www.amazon.in/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=iphone';
    let data = [];
    request(url, (err, response, html) => {
        if (err) {
            res.status(500).json({ error: 1, message: "error during fetching the product detail" });
        } else {
            let $ = cheerio.load(html);
            $('li.s-result-item.celwidget').each(function() {
                let element = $(this).find('div.a-fixed-left-grid-col.a-col-right');
                let obj = {};
                obj.productName = element.find('div.a-row.a-spacing-small h2').text();
                obj.companyName = element.find('div.a-row.a-spacing-small span').text();
                obj.cost = element.find('div.a-row span.a-size-small.a-color-secondary.a-text-strike').text().trim();
                obj.price = element.find('div.a-row span.a-size-base.a-color-price.s-price.a-text-bold').text().trim();

                data.push(obj);
            });
            res.status(200).json({ data: data });
        }
    })

});


router.get('/amazon/t-shirt', (req, res) => {
    let url = 'https://www.amazon.in/s/ref=nb_sb_noss?url=search-alias%3Dapparel&field-keywords=t-shirts+for+mens';
    let data = [];
    request(url, (err, response, body) => {
        if (err) {
            res.status(500).json({ error: 1, message: "error during fetching the product detail" });
        } else {
            let $ = cheerio.load(body);
            $("li.s-result-item.s-result-card-for-container.a-declarative.celwidget").each(function() {
                let element = $(this).find("div.a-row.a-spacing-none");
                let obj = {};
                obj.tShirtName = element.find('div.a-row.a-spacing-mini h2').text();
                obj.approxPrice = element.children("div.a-row.a-spacing-none").find("span.a-size-base.a-color-price.s-price.a-text-bold").text().trim();
                data.push(obj);
            });
            res.status(200).json({ data: data });
        }
    })
});

module.exports = router;