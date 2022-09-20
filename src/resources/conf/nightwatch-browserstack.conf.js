// const chromedriver = require('chromedriver');
require('dotenv').config();

const bstackOptions = {
  'bstack:options': {
    "os": "OS X",
    "osVersion": "Sierra",
    "buildName": "Nightwatch-Cucumber-Test Parallel",
    "sessionName": "NightwatchJS Cucumber snippet test",
    "local": "false",
    "seleniumVersion": "4.0.0",
    userName: process.env.BROWSERSTACK_USERNAME,
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
  },
  "browserVersion": "latest",
  "resolution": "1920x1080",
  "browserstack.video": true
}

const browserStack = {
  webdriver: {
    timeout_options: {
      timeout: 100000,
      retry_attempts: 3
    },
    keep_alive: true,
    start_process: false
  },

  selenium: {
    host: 'hub-cloud.browserstack.com',
    port: 443
  },

  desiredCapabilities: {
    ...bstackOptions,
  }
}

module.exports = {
  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'src/resources/features/*.feature',
      auto_start_session: true,
    }
  },
  src_folders: ['src/test/steps/'],
  page_objects_path: 'src/app/pages',
  test_settings: {

    browserstack: {
      ...browserStack
    },

    "browserstack.chrome": {
      ...browserStack,
      desiredCapabilities: {
        browserName: 'chrome',
        ...bstackOptions
      }
    },
    "browserstack.firefox": {
      ...browserStack,
      desiredCapabilities: {
        browserName: 'firefox',
        ...bstackOptions
      }
    },
    "browserstack.edge": {
      ...browserStack,
      desiredCapabilities: {
        browserName: 'Edge',
        ...bstackOptions
      }
    },
    'browserstack.local': {
      ...browserStack,
      desiredCapabilities: {
        browserName: 'chrome',
        'bstack:options': {
          "os": "OS X",
          "osVersion": "Sierra",
          "buildName": "Nightwatch-Cucumber-Test",
          "sessionName": "NightwatchJS Cucumber snippet test",
          "local": "true",
          "localIdentifier": process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
          "seleniumVersion": "4.0.0",
          userName: process.env.BROWSERSTACK_USERNAME,
          accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
        },
      }
    }
  }
};