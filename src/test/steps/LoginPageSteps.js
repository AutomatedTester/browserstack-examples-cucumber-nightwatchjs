const {Given, Then, When} = require('@cucumber/cucumber')

Given(/^I click on "Sign In" link$/, ()=> {
    return browser.waitForElementVisible('#signin',10000).click("#signin");
  });

Given(/^I type "([^"]*)?" in "([^"]*)?"$/, function (credential, selector) {
    if(selector=="username"){
        return browser
                    .waitForElementVisible("#username input",10000)
                    .clearValue("#username input")
                    .setValue("#username input", credential + browser.Keys.ENTER)
    }
    else{
        return browser
                .waitForElementVisible("#password input",10000)
				.clearValue("#password input")
				.setValue("#password input", credential + browser.Keys.ENTER)
    }
  });


Given(/^I press Log In Button$/, ()=> {
    return browser
                .waitForElementVisible("#login-btn",10000)
				.click("#login-btn")
    });

Then(/^I should see user "([^"]*)?" logged in$/,(username)=>{
    return browser
                .waitForElementVisible(".username",10000)
                .assert.textContains(".username",username)
});

  
Then(/^I should see "([^"]*)?" as Login Error Message$/,(api_error)=>{
    return browser
                .waitForElementVisible(".api-error",10000)
                .assert.textContains(".api-error",api_error)
});
