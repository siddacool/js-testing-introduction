const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

test('Should output Name and Age', () => {
  const text = generateText('Fabian', 69);

  expect(text).toBe('Fabian (69 years old)');
});

test('Should Generate a valid text output', () => {
  const text = checkAndGenerate('Fabian', 69)

  expect(text).toBe('Fabian (69 years old)');
});

test('Should Create a new list item', async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 80,
    // args: ['--window-size=1600,900'],
  });

  const page = await browser.newPage();

  await page.goto('file:///E:/sid/js-testing-introduction/index.html');

  await page.click('input#name');
  await page.type('input#name', 'Fabian');
  await page.click('input#age');
  await page.type('input#age', '69');
  await page.click('#btnAddUser');
  const finalText = await page.$eval('.user-item', el => el.textContent);

  await browser.close();
  expect(finalText).toBe('Fabian (69 years old)');
}, 15000)