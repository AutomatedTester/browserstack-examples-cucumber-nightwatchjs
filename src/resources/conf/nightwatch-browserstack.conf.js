// const chromedriver = require('chromedriver');
require('dotenv').config();
process.setMaxListeners(0);

const bstackOptions = {
  'bstack:options': {
    "os": "OS X",
    "osVersion": "Sierra",
    "buildName": "Nightwatch-Cucumber-Test Parallel",
    "local": "false",
    "seleniumVersion": "4.0.0",
    userName: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
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
    default: {
      disable_error_log: false,
      launch_url: 'https://nightwatchjs.org',

      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true,
      },

      desiredCapabilities: {
        browserName: 'chrome',
      },
    },

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
    'browserstack.chrome-mobile': {
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
        browserName: "chrome",
        'bstack:options': {
          buildName: "Nightwatch-Cucumber-Test Parallel",
          // sessionName: "NightwatchJS Cucumber snippet test",
          osVersion: "12.0",
          deviceName: "Google Pixel 6",
          userName: process.env.BROWSERSTACK_USERNAME,
          accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
        },
      },
    },
    'browserstack.local': {
      ...browserStack,
      desiredCapabilities: {
        browserName: 'chrome',
        'bstack:options': {
          "os": "OS X",
          "osVersion": "Sierra",
          "buildName": "Nightwatch-Cucumber-Test",
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