/*jshint esversion: 6 */

var childProcess = require("child_process");
var path = require("path");
var request = require('request');
const puppeteer = require('puppeteer');
const delay = require('delay');

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
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('http://127.0.0.1:3000/explorer.php', {waitUntil: 'networkidle0'});

            // Login
            await console.log("-----Login-----\n");
            await page.type('#fm_usr', 'admin');
            await page.type('#fm_pwd', 'admin');
            page.$eval('form', form => form.submit());
            await page.waitForNavigation({ waitUntil: 'networkidle2' });
            
            // Click on Dancing Robot Test
            await console.log("-----Click on Dancing Robot Test-----\n");
            await Promise.all([
                page.click('a[href="?p=Dancing+Robot+Test"]'),
                page.waitForNavigation({ waitUntil: 'networkidle2' }),
            ]);

            // Click on Edit link
            await console.log("-----Click on Edit link-----\n");
            await Promise.all([
                page.click('a[href="editor.html?model=Dancing%20Robot%20Test&variant=No%20Dancing%20Dark%20Blue%20-%20Title"]'),
                page.waitForNavigation({ waitUntil: 'networkidle2' }),
            ]);

            // Hover on File
            await console.log("-----Hover on File-----\n");
            await (await page.$x('//div[normalize-space()="File"]'))[0].hover();

            // Confirm Warning
            page.on("dialog", (dialog) => {
                console.log("-----Confirm warning dialog-----\n");
                dialog.accept();
            });

            // Click on Close
            await console.log("-----Click on Close-----\n");
            (await page.$x('//div[normalize-space()="Close"]'))[0].click();
            await page.waitForNavigation({ waitUntil: 'networkidle2' });

            await console.log("-----browser.close()-----\n");
            await browser.close();
        })();

        console.log('waited 3 seconds\n');

        cp.kill('SIGINT');
        test.done();
    }, 3000);
};
