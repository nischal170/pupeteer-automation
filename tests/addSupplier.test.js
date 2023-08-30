require("dotenv").config();
const puppeteer = require('puppeteer');
const LoginPage = require('../pages/loginPage');
const Supplier=require('../pages/supplierPage');
const { faker } = require('@faker-js/faker');
describe('Supplier Add Module',()=>{
    let browser;
    let page;


    before(async()=>{
        browser = await puppeteer.launch({ headless:false,defaultViewport: null});
        page = await browser.newPage();
    
       
        
      await page.goto(process.env.BASE_URL+'login/',{'waitUntil':'load'});
      

     })
    it('Login to the website and add supplier', async () => {
        const loginPage = new LoginPage(page);
        const suppliers=new Supplier(page);
        await loginPage.verifyLoginPage();
        await loginPage.typeUserName(process.env.USER_EMAIL);
        await loginPage.typePassword(process.env.VALID_PASSWORD);
        await loginPage.clickLogin();
        await loginPage.verifyUrlafterLogin();
        await suppliers.gotoHomePage();
        await suppliers.clickOnSuppliers();
        await suppliers.addSupplier(faker.lorem.word(),'Nepal');
        await suppliers.clickSubmit();
        await suppliers.verifySupplierCreation();

        
        
    });

    
    after(async () => {
        await browser.close();
    })

})