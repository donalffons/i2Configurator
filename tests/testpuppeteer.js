/*jshint esversion: 6 */

var childProcess = require("child_process");
var path = require("path");
var request = require('request');
const puppeteer = require('puppeteer');

exports.testAdding = async function(test){  
    var x = 3,
        y = 2;
    test.equals(x+y, 5, "Test add function");

    var cp = childProcess.fork(path.join(__dirname, "/webserver.js"));
    cp.on("exit", function (code, signal) {
        console.log("Exited", {code: code, signal: signal});
    });
    cp.on("error", console.error.bind(console));

    console.log("starting timeout\n");
    setTimeout(async function() {
        console.log('waited 3 seconds\n');

        await (async () => {
            var bodyHTML;
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('http://127.0.0.1:3000/explorer.php', {waitUntil: 'networkidle0'});
            bodyHTML = await page.evaluate(() => document.body.innerHTML);
            console.log(bodyHTML);
            await console.log("-----Login-----\n");
            // Login
            await page.type('#fm_usr', 'admin');
            await page.type('#fm_pwd', 'admin');
            var form = await page.$('form');
            await Promise.all([
                form.evaluate(form => form.submit()),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
            ]);
            bodyHTML = await page.evaluate(() => document.body.innerHTML);
            console.log(bodyHTML);
            await console.log("-----Click on Dancing Robot Test-----\n");
            // Click on Dancing Robot Test
            await Promise.all([
                page.click('a[href="?p=Dancing+Robot+Test"]'),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
            ]);
            bodyHTML = await page.evaluate(() => document.body.innerHTML);
            console.log(bodyHTML);
            await console.log("-----Click on Edit link-----\n");
            // Click on Edit link
            await Promise.all([
                page.click('a[href="http://localhost/I2Configurator/editor.html?model=Dancing%20Robot%20Test&variant=No%20Dancing%20Dark%20Blue%20-%20Title"]'),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
            ]);
            bodyHTML = await page.evaluate(() => document.body.innerHTML);
            console.log(bodyHTML);
            await console.log("-----Hover on File-----\n");
            // Hover on File
            await Promise.all([
                page.hover('div[innerHTML="File"]'),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
            ]);
            bodyHTML = await page.evaluate(() => document.body.innerHTML);
            console.log(bodyHTML);
            await console.log("-----Click on Close-----\n");
            // Click on Close
            await Promise.all([
                page.click('div[innerHTML="Close"]'),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
            ]);
            bodyHTML = await page.evaluate(() => document.body.innerHTML);
            console.log(bodyHTML);
            await console.log("-----browser.close()-----\n");
            await browser.close();
        })();

        console.log('waited 3 seconds\n');

        cp.kill('SIGINT');
        test.done();
    }, 3000);
};
