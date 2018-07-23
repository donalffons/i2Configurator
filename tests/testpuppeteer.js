/*jshint esversion: 6 */

var childProcess = require("child_process");
var path = require("path");
var request = require('request');
const puppeteer = require('puppeteer')

exports.testAdding = function(test){  
    var x = 3,
        y = 2;
    test.equals(x+y, 5, "Test add function");

    var cp = childProcess.fork(path.join(__dirname, "/webserver.js"));
    cp.on("exit", function (code, signal) {
        console.log("Exited", {code: code, signal: signal});
    });
    cp.on("error", console.error.bind(console));

    console.log("starting timeout\n");
    setTimeout(function() {
        console.log('waited 3 seconds\n');

        await (async () => {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto('http://127.0.0.1:3000/explorer.php')
            await page.type('#fm_usr', 'admin')
            await page.type('#fm_pwd', 'admin')
            await page.click(':nth-child(2) > :nth-child(2) > .filename > a')
            await page.goto('http://localhost/I2Configurator/explorer.php?p=Dancing+Robot+Test')
            await page.click(':nth-child(2) > :nth-child(3) > a')
            await page.goto('http://localhost/I2Configurator/editor.html?model=Dancing%20Robot%20Test&variant=No%20Dancing%20Dark%20Blue%20-%20Title')
            await page.click(':nth-child(2) > :nth-child(2) > a')
            await page.goto('http://localhost/I2Configurator/viewer.html?model=Dancing%20Robot%20Test&variant=No%20Dancing%20Dark%20Blue%20-%20Title')
            await browser.close()
        })()

        console.log('waited 3 seconds\n');

        cp.kill('SIGINT');
        test.done();
    }, 3000);
};
