# PlaywrightUIEcommerce
Ecommerce website for purchasing CD's

Basic browser UI tests using Playwright Typescript to test Ecommerce Music site, two tests:

1) Browse function and add one CD to cart
2) Discounted offer of 'Save big with our 2 for £5'

Feature: Online CD purchase
As a CD fan
I want to purchase my CDs online from a reputable etailer
So that I don’t have to join a subscription service

Scenario: Choose a CD from Summer Vibes page
Given I’m on the Summer Vibe page
When I select View Item for my chosen CD
Then I am able to add the CD to my basket
And make a purchase

Scenario: Two CDs for a £5
Given I have added a special offer CD to my cart
When I select a second CD within the same offer
Then the total for both CDs is reduced to £5
