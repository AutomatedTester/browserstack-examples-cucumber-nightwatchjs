const chromedriver = require('chromedriver');

const bstackOptions = {
  'bstack:options': {
    "os": "OS X",
    "osVersion": "Sierra",
    "buildName": "Nightwatch-Cucumber-Test",
    "sessionName": "NightwatchJS Cucumber snippet test",
    "local": "false",
    "seleniumVersion": "4.0.0",
    userName: process.env.BROWSERSTACK_USERNAME,
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
  },
}

const browserStack = {
  webdriver: {
    start_process: true
  },

  selenium: {
    host: 'hub-cloud.browserstack.com',
    port: 443
  },

  desiredCapabilities: {
    browserName: 'chrome',
    ...bstackOptions
  }
}


module.exports = {
  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'src/resources/features/google.feature',
      auto_start_session: true,
      parallel: 2
    }
  },

  src_folders: ['src/test/steps'],

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
          "seleniumVersion": "4.0.0",
          userName: process.env.BROWSERSTACK_USERNAME,
          accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
        },
      }
    }
  }
};