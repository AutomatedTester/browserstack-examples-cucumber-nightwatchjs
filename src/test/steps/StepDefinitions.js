const {
  Given,
  Then,
} = require('@cucumber/cucumber');


//Common Feature Steps

Given(/^I navigate to website$/, () => {
  return browser
    .url("https://www.bstackdemo.com/")
    .waitForElementVisible('body', 10000);
});

Given(/^I navigate to local website$/, () => {
  return browser
    .url("http://localhost:3000")
    .waitForElementVisible('body', 10000);
});

Given(/^I click on "([^"]*)?" link$/, (selector) => {
  if (selector == 'Sign In') {
    return browser
      .waitForElementVisible("#signin", 10000)
      .click("#signin");
  } else if (selector == 'Offers') {
    return browser
      .waitForElementVisible("#offers", 10000)
      .click("#offers");
  } else if (selector == 'Orders') {
    return browser
      .waitForElementVisible("#orders",10000)
      .click("#orders")
  }
});
//e2e Feature Steps
Given(/^I add two products to cart$/, () => {
  return browser.page.home().addiPhonesToCartAndCheckout();
})

Given(/^I click on Buy Button$/, () => {
  return browser.click(".buy-btn");
})

Given(/^I enter shipping details "([^"]*)?", "([^"]*)?", "([^"]*)?", "([^"]*)?" and "([^"]*)?"$/, (firstName, lastName, address, province, zipcode) => {
  return browser.page.checkout().enterDetailAndSubmit(
    firstName,
    lastName,
    address,
    province,
    zipcode
  );
})

Given(/^I click on Checkout Button$/,()=>{
  return browser
            .click('#checkout-shipping-continue')
            .pause(700)
            .click(".optimizedCheckout-buttonSecondary")
})

//Login Feature Steps

Given(/^I type "([^"]*)?" in "([^"]*)?"$/, (credential, selector) => {
  if (selector == "username") {
    return browser
      .waitForElementVisible("#username input", 10000)
      .clearValue("#username input")
      .setValue("#username input", credential + browser.Keys.ENTER)
  } else {
    return browser
      .waitForElementVisible("#password input", 10000)
      .clearValue("#password input")
      .setValue("#password input", credential + browser.Keys.ENTER)
  }
});

Given(/^I press Log In Button$/, () => {
  return browser
    .waitForElementVisible("#login-btn", 10000)
    .click("#login-btn")
});

Then(/^I should see user "([^"]*)?" logged in$/, (username) => {
  return browser
    .waitForElementVisible(".username", 10000)
    .assert.textContains(".username", username)
});


Then(/^I should see "([^"]*)?" as Login Error Message$/, (api_error) => {
  return browser
    .waitForElementVisible(".api-error", 10000)
    .assert.textContains(".api-error", api_error)
});

//Offers Feature Steps
Given(/^I SignIn as "([^"]*)?" with "([^"]*)?" password$/, (username, password) => {
  return browser
    .waitForElementVisible('#signin', 10000)
    .click("#signin")
    .waitForElementVisible("#username input", 10000)
    .clearValue("#username input")
    .setValue("#username input", username + browser.Keys.ENTER)
    .waitForElementVisible("#password input", 10000)
    .clearValue("#password input")
    .setValue("#password input", password + browser.Keys.ENTER)
    .waitForElementVisible("#login-btn", 10000)
    .click("#login-btn");
});

Then(/^I should see Offer elements$/, () => {
  return browser
    .expect.element('.offer').to.be.present;
});

//Product Feature Steps
Given(/^I press the Apple Vendor Filter$/, () => {
  browser.expect.elements(".shelf-item__title").count.to.equal(25);
  return browser
    .waitForElementPresent("input[value='Apple'] + span", 10000)
    .click("input[value='Apple'] + span");
});

Then(/^I should see 9 items in the list$/, () => {
  return browser
    .expect.elements(".shelf-item")
    .count.to.equal(9);
});

Given(/^I order by lowest to highest$/, () => {
  return browser
    .click(".sort select option[value='lowestprice']")

});

Then(/^I should see prices in ascending order$/, () => {
  return browser
    .pause(700)
    .waitForElementPresent("div.shelf-container-header + div.shelf-item", 10000)
    .expect.element("div.shelf-item__price > div.val > b")
    .text.to.equal("399");
});

// User Feature Steps
Given(/^I should see no image loaded$/, () => {
  return browser
    .pause(1000)
    .expect.elements("img[src='']")
    .count.to.equal(25);
});

Then(/^I should see elements in list$/, () => {
  return browser
    .pause(1000)
    .expect.elements(".order")
    .count.to.not.equal(0);
})