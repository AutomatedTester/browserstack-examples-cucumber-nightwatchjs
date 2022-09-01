const {Given, Then, When} = require('@cucumber/cucumber')

Given(/^I open Google's search page$/, () => {
  return browser.url('http://google.com').waitForElementVisible('body', 1000);
});

Then(/^the title is "([^"]*)"$/, title => {
  return browser.assert.title(title);
});

Then(/^the Google search form exists$/, () => {
  return browser.assert.visible('input[name="q"]');
});