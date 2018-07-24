/*jshint esversion: 6 */

var childProcess = require("child_process");
var path = require("path");
var request = require('request');
const puppeteer = require('puppeteer');
const delay = require('delay');

exports.testAdding = async function(test){
    console.log("Waiting 3 seconds for server to load up...\n");
    await delay(3000);
    console.log('Continuing...\n');

    const browser = await puppeteer.launch({devtools: true});
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(1000*60*5);
    page.on('console', function(msg) { console.log('browser console: ', msg.text()); });
    page.on("pageerror", function(err) { console.log("browser page error: " + err.toString()); test.ok(false); });
    page.on("error", function(err) { console.log("browser error: " + err.toString()); test.ok(false); });
    await page.goto('http://127.0.0.1:3000/explorer.php', {waitUntil: 'networkidle2'});

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

    await console.log("-----Finish Testing-----\n");
    await browser.close();
    test.done();
};
