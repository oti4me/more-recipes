// import { insertRecipeSeed } from '../client/';
const BASE_URL = 'http://localhost:3001/'
const twoMunutes = 2000;
const threeMinutes = 3000;
const OneMinute = 1000;

module.exports = {
  'Display homepage and ensure all element are available': (browser) => {
    browser
      .url(`${BASE_URL}`)
      .waitForElementVisible('body', twoMunutes)
      .assert.visible('.carouselContainer')
      .assert.visible('.carouselContent')
      .waitForElementVisible('.carouselHeader', twoMunutes)
      .assert.containsText('.carouselHeader', 'THE RECIPE SHARING PLATFORM')
      .assert.containsText('.carouselparagraph', 'Share your biggest fun')
      .assert.visible('input[name=query]')
      .assert.visible('.fa.fa-home')
      .assert.visible('.brand-logo')
      .assert.containsText('.brand-logo', 'More-Recipes')
      .waitForElementVisible('.fa.fa-user-plus', twoMunutes)
      .assert.visible('.fa.fa-user-plus')
      .click('.fa.fa-user-plus')
      .waitForElementVisible('form', twoMunutes)
  },

  'Should return a popup error if signup form not correctly filled':
    (browser) => {
      browser
        .assert.urlEquals(`${BASE_URL}signup`)
        .waitForElementVisible('body', twoMunutes)
        .assert.containsText('h2', 'Sign Up')
        .assert.visible('#lastName')
        .assert.visible('#email')
        .assert.visible('#phone')
        .assert.visible('#password')
        .assert.visible('#confirmPassword')
        .assert.visible('#signupBtn')
        .setValue('input[name=firstName]', '')
        .setValue('input[name=lastName]', '')
        .setValue('input[name=email]', 'signup54855464334@gmail.com')
        .setValue('input[name=phone]', '07067143161')
        .setValue('input[name=password]', 'Oti4thegirls@')
        .setValue('input[name=confirmPassword]', 'Oti4thegirls@')
        .click('.waves-effect.waves-light.btn')
        .waitForElementVisible('div.toast', twoMunutes)
        .assert.visible('div.toast')
        .assert.containsText('div.toast', 'First Name can\'t be empty!!')
        .pause(twoMunutes)
    },

  'Should sign up a new user':
    (browser) => {
      browser
        .clearValue('input[name=firstName]')
        .setValue('input[name=firstName]', 'Otighe')
        .clearValue('input[name=lastName]')
        .setValue('input[name=lastName]', 'Henry')
        .clearValue('input[name=email]')
        .setValue('input[name=email]', 'gloo4432@gmail.com')
        .clearValue('input[name=phone]')
        .setValue('input[name=phone]', '07067143161')
        .clearValue('input[name=password]')
        .setValue('input[name=password]', 'Oti4thegirls@')
        .clearValue('input[name=confirmPassword]')
        .setValue('input[name=confirmPassword]', 'Oti4thegirls@')
        .pause(twoMunutes)
        .click('.waves-effect.waves-light.btn')
        .pause(twoMunutes)
        .waitForElementVisible('div.toast', OneMinute)
        .assert.containsText('div.toast', 'Account created successfully')
        .waitForElementVisible('h4.bold', twoMunutes)
    },

  'Should display User profile page':
    (browser) => {
      browser
        .assert.urlEquals(`${BASE_URL}profile`)
        .waitForElementVisible('body', OneMinute)
        .assert.containsText('h4', 'User Profile')
        .assert.containsText('h4.bold', 'USER BIO')
        .assert.visible('.add')
        .assert.visible('.favourite')
        .assert.visible('.myrecipes')
        .assert.visible('.name')
        .assert.visible('.email')
        .assert.visible('.phone')
        .assert.visible('.fa.fa-sign-out')
        .click('.fa.fa-sign-out')
    },

  'Should signin a registered User':
    (browser) => {
      browser
        .assert.urlEquals(`${BASE_URL}signin`)
        .waitForElementVisible('body', OneMinute)
        .assert.containsText('h2', 'Sign In')
        .assert.visible('form')
        .assert.visible('#email')
        .assert.visible('#password')
        .assert.visible('#signin')
        .setValue('input[name=email]', 'gloo4432@gmail.com')
        .setValue('input[name=password]', 'Oti4thegirls@')
        .click('.waves-effect.waves-light.btn')
        .waitForElementVisible('h4.bold', OneMinute)
        .assert.urlEquals(`${BASE_URL}profile`)
        .waitForElementVisible('.waves-effect.waves-light.btn.add', OneMinute)
        .pause(threeMinutes)
        .click('.waves-effect.waves-light.btn.add')
    },

  'Should add and view own recipes':
    (browser) => {
      browser
        .assert.urlEquals(`${BASE_URL}addrecipe`)
        .waitForElementVisible('body', twoMunutes)
        .assert.visible('h4')
        .assert.containsText('h4', 'Add Recipe')
        .setValue('input[name=title]', 'Rice and beans')
        .setValue('input[name=description]', 'this is a simple description')
        .setValue('textarea[name=ingredients]', 'this is a simple description')
        .setValue('textarea[name=direction]',
        'these are the ingredients required for me'
        )
        .setValue('#img',
        require('path')
          .resolve(`${__dirname}/../client/public/images/img.jpg`))
        .click('.waves-effect.waves-light.btn')
        .waitForElementVisible('div.toast', 15000)
        .assert.containsText('div.toast', 'New recipe added')
    },

  'Should update recipe':
    (browser) => {
      browser
        .assert.urlEquals(`${BASE_URL}myrecipes`)
        .pause(OneMinute)
        .click('.fa.fa-pencil-square-o')
        .assert.urlContains(`${BASE_URL}updaterecipe/`)
        .assert.containsText('h4', 'Edit Recipe')
        .assert.visible('input[name=title]')
        .assert.visible('input[name=description]')
        .assert.visible('textarea[name=direction]')
        .assert.visible('textarea[name=ingredients]')
        .clearValue('input[name=title]')
        .setValue('input[name=title]', 'beans and yam')
        .clearValue('input[name=description]')
        .setValue('input[name=description]', 'this is a another description')
        .pause(OneMinute)
        .click('.waves-effect.waves-light.btn')
        .pause(OneMinute)
        .waitForElementVisible('div.toast', OneMinute)
        .assert.containsText('div.toast', 'Recipe Updated')
        .pause(threeMinutes)
    },

  'Should view recipe details':
    (browser) => {
      browser
        .url(`${BASE_URL}myrecipes`)
        .click('.card-image a')
        .waitForElementVisible('body', OneMinute)
        .pause(twoMunutes)
        .assert.visible('.recipe-title')
        .assert.visible('#review')
        .assert.visible('#upvote')
        .assert.visible('#downvote')
        .assert.visible('#favourite')
        .assert.visible('.recipe-title')
        .assert.visible('img.materialboxed')
        .assert.containsText('h5', 'Description')
    },

  'Should add review for a recipe':
    (browser) => {
      browser
        .assert.urlContains(`${BASE_URL}recipe/`)
        .pause(OneMinute)
        .waitForElementVisible('#review', OneMinute)
        .click('#review')
        .waitForElementVisible('#add-review', OneMinute)
        .pause(OneMinute)
        .click('#add-review')
        .waitForElementVisible('#form', OneMinute)
        .setValue('textarea[name=comment]', 'I like this')
        .click('#commentBtn')
        .waitForElementVisible('div.toast', 15000)
        .assert.visible('div.toast')
        .assert.containsText('div.toast', 'Your review has been recieved')
        .pause(OneMinute)
        .click('.modal-overlay')
        .pause(twoMunutes);
    },

  'Should upvote a recipe':
    (browser) => {
      browser
        .assert.urlContains(`${BASE_URL}recipe/`)
        .waitForElementVisible('#upvote', OneMinute)
        .pause(OneMinute)
        .click('#upvote')
        .pause(twoMunutes)
        .click('#upvote')
        .pause(OneMinute);
    },

  'Should downvote a recipe':
    (browser) => {
      browser
        .assert.urlContains(`${BASE_URL}recipe/`)
        .waitForElementVisible('#upvote', OneMinute)
        .pause(OneMinute)
        .click('#downvote')
        .pause(twoMunutes)
        .click('#downvote')
        .pause(OneMinute)
    },

  'Should toggle upvote and downvote of a recipe':
    (browser) => {
      browser
        .assert.urlContains(`${BASE_URL}recipe/`)
        .waitForElementVisible('#upvote', OneMinute)
        .pause(OneMinute)
        .click('#upvote')
        .pause(twoMunutes)
        .click('#downvote')
        .pause(OneMinute)
    },

  'Should add a favourite recipe':
    (browser) => {
      browser
        .assert.urlContains(`${BASE_URL}recipe/`)
        .waitForElementVisible('#favourite', OneMinute)
        .pause(OneMinute)
        .waitForElementVisible('#favourite', OneMinute)
        .assert.visible('#favourite')
        .click('#favourite')
        .pause(twoMunutes)
    },

  'Should remove a favourite recipe':
    (browser) => {
      browser
        .click('.fa.fa-user-circle-o')
        .waitForElementVisible('.fa.fa-user-circle-o', twoMunutes)
        .assert.visible('.fa.fa-user-circle-o')
        .pause(twoMunutes)
        .waitForElementVisible('.fa.fa-heart', twoMunutes)
        .assert.visible('.fa.fa-heart')
        .click('.fa.fa-heart')
        .pause(twoMunutes)
        .assert.urlContains(`${BASE_URL}favourites`)
        .click('.fa.fa-trash-o')
        .pause(twoMunutes)
        .click('#remove-favourite')
        .pause(twoMunutes)
        .click('.fa.fa-home')
        .pause(twoMunutes)
    },

  'Should search for recipes':
    (browser) => {
      browser
        .assert.urlContains(`${BASE_URL}`)
        .click('.fa.fa-home')
        .waitForElementVisible('form', twoMunutes)
        .assert.visible('form')
        .pause(twoMunutes)
        .click('input[name=query]')
        .pause(threeMinutes)
        .setValue('input[name=query]', 'beans')
        .pause(threeMinutes)
        .clearValue('input[name=query]')
        .pause(threeMinutes)
        .setValue('input[name=query]', 'rice')
        .pause(twoMunutes)
    },

  'Should delete recipe':
    (browser) => {
      browser
        .pause(twoMunutes)
        .assert.urlContains(`${BASE_URL}`)
        .waitForElementVisible('.fa.fa-user-circle-o', twoMunutes)
        .assert.visible('.fa.fa-user-circle-o')
        .click('.fa.fa-user-circle-o')
        .pause(twoMunutes)
        .waitForElementVisible('.fa.fa.fa-cutlery', twoMunutes)
        .assert.visible('.fa.fa.fa-cutlery')
        .click('.fa.fa.fa-cutlery')
        .pause(twoMunutes)
        .waitForElementVisible('.fa.fa-trash-o', twoMunutes)
        .assert.visible('.fa.fa-trash-o')
        .click('.fa.fa-trash-o')
        .pause(twoMunutes)
        .waitForElementVisible('#deleteBtn', twoMunutes)
        .assert.visible('#deleteBtn')
        .click('#deleteBtn')
        .waitForElementVisible('.fa.fa-sign-out', twoMunutes)
        .assert.visible('.fa.fa-sign-out')
        .pause(twoMunutes)
        .click('.fa.fa-sign-out')
        .pause(threeMinutes)
        .end();
    },
};
