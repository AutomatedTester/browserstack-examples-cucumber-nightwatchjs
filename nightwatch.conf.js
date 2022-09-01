const chromedriver = require('chromedriver');

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
    default: {
      webdriver: {
        start_process: true,
        server_path: chromedriver.path,
        port: 4444,
        cli_args: ['--port=4444']
      },
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  }
};