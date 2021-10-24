const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://contractorsinsurancereview.com/ExampleForm/');
  
  await page.type('#name', 'Yishay Garame') 
  await page.type('#email', 'Yishay@gmail.com')
  await page.type('#phone', '9067574745')
  await page.type('#company', 'YishayGr')

  let optionValue = await page.$$eval('option',
   options => options.find(
       o => o.id === "option3")?.value)
  await page.select('#employees', optionValue);

  //screen shot for the  form page
  await page.screenshot({ path: 'formPage.png' });

  // move to the next page when clicking the "request a call back"
await Promise.all([
    page.waitForNavigation(),
    page.click('button.primary'),
    console.log('you have reached to the thank you page')
])
   
//screen shot for the  thank you page
await page.screenshot({ path: 'thankYouPage.png' });

await browser.close();
})();

