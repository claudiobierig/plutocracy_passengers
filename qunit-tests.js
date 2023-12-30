const path = require("path");
const {
    runQunitPuppeteer,
    printResultSummary,
    printFailedTests
  } = require("node-qunit-puppeteer");
  

const qunitArgs = {
  // Path to qunit tests suite
  targetUrl: `file://${path.join(__dirname, "test.html")}`,
  // (optional, 30000 by default) global timeout for the tests suite
  timeout: 30000,
  // (optional, false by default) should the browser console be redirected or not
  redirectConsole: true,
  // (optional, ['--allow-file-access-from-files'] by default) Chrome command-line arguments
  puppeteerArgs: ["--allow-file-access-from-files"]
};

runQunitPuppeteer(qunitArgs)
  .then(result => {
    printResultSummary(result, console);

    if (result.stats.failed > 0) {
      printFailedTests(result, console);
      // other action(s) on failed tests
    }
  })
  .catch(ex => {
    console.error(ex);
  });
