const puppeteer = require('puppeteer');
const LoginPage  = require('../pages/loginPage');
require("dotenv").config();
describe('Login Module',()=>{
    let browser;
    let page;

    beforeEach (async()=>{
        browser = await puppeteer.launch({ headless:false});
        page = await browser.newPage();
        
      await page.goto(process.env.BASE_URL+'login/',{'waitUntil':'load'});
      

     })
    it('Login to the website using valid credentials', async () => {
        const loginPage = new LoginPage(page);
       // await loginPage.gotoLoginPage();
        await loginPage.verifyLoginPage();
        await loginPage.typeUserName(process.env.USER_EMAIL);
        await loginPage.typePassword(process.env.VALID_PASSWORD);
        await loginPage.clickLogin();
        await loginPage.verifyUrlafterLogin();
        
    });
    it('Login to the website using invalid credentials', async () => {
        const loginPage = new LoginPage(page);
        await loginPage.verifyLoginPage();
        await loginPage.typeUserName(process.env.OTHER_USER_EMAIL);
        await loginPage.typePassword(process.env.INVALID_PASSWORD);
        await loginPage.clickLogin();
        await loginPage.verifyErrorMessage();
        
        
    });
    
    afterEach(async () => {
        await browser.close();
    })

})