// const chromedriver = require('chromedriver');
require('dotenv').config();
process.setMaxListeners(0);
const timeStamp = new Date().getTime();

const bstackOptions = {
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
  plugins: ['@nightwatch/browserstack'],

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'src/resources/features/*.feature',
      auto_start_session: true,
    }
  },

  src_folders: ['src/test/steps/'],
  page_objects_path: 'src/app/pages',

  '@nightwatch/browserstack': {
    browserstackLocal: true,
    browserstackLocalOptions:{
      localIdentifier: timeStamp.toString()
    }
  },

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: 'https://nightwatchjs.org',

      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true,
      }
    },

    'browserstack.local': {
      ...browserStack,
      desiredCapabilities: {
        browserName: 'chrome',
        'bstack:options': {
          "os": "OS X",
          "osVersion": "Sierra",
          "local":"true",
          "localIdentifier": timeStamp.toString(),
          "buildName": "Nightwatch-Cucumber-Test-Local",
          "seleniumVersion": "4.0.0",
          userName: process.env.BROWSERSTACK_USERNAME,
          accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
        },
      }
    }
  }
};