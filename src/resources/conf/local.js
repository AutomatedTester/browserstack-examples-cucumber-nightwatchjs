const Nightwatch = require("nightwatch");
const browserstack = require("browserstack-local");
require("dotenv").config();

let bs_local;

try {
    const accessKey =
        process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY';
    const pathToNightwatchExecutable =
        "./node_modules/nightwatch/bin/nightwatch";
    require.main.filename = pathToNightwatchExecutable;
    process.mainModule.filename = pathToNightwatchExecutable;
    // Code to start browserstack local before start of test
    console.log("Connecting local");
    Nightwatch.bs_local = bs_local = new browserstack.Local();
    let localIdentifier;
    
    localIdentifier =
        process.env.BROWSERSTACK_LOCAL_IDENTIFIER ||
        new Date().getTime();
    process.env.BROWSERSTACK_LOCAL_IDENTIFIER = localIdentifier;
    bs_local.start({
            key: accessKey,
            localIdentifier: localIdentifier,
        },
        function (error) {
            if (error) throw error;
            console.log("Connected. Now testing...");
            Nightwatch.cli(function (argv) {
                Nightwatch.CliRunner(argv)
                    .setup(null, function () {
                        // Code to stop browserstack local after end of parallel test
                        bs_local.stop(function () {});
                    })
                    .runTests(function () {
                        // Code to stop browserstack local after end of single test
                        bs_local.stop(function () {});
                    });
            });
        }
    );
} catch (ex) {
    console.log("There was an error while starting the test runner:\n\n");
    process.stderr.write(ex.stack + "\n");
    process.exit(2);
}