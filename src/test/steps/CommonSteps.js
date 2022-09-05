const {Given, Then, When} = require('@cucumber/cucumber')

Given(/^I navigate to website$/, ()=> {
        return browser.url("https://www.bstackdemo.com/").waitForElementVisible('body', 10000);;
});

