require("dotenv").config();
const expect= require('chai').expect;
class LoginPage  {
    constructor(page) {
        this.page = page;
      }
    async verifyLoginPage(){
        expect(this.page.url()).to.equal(process.env.BASE_URL+'login/')
    }
    async typeUserName(username) {
    const userName= await this.page.waitForXPath("//input[@data-field-value='email']");
     await userName.type(username);
    }
    async typePassword(pass) {
      const password = await this.page.waitForXPath("//input[@data-field-value='password']");
      await password.type(pass);
    }
    async clickLogin() {
       const btnLogins= await this.page.waitForXPath("//button[@type='submit']");
      await btnLogins.click();
      
    }
    async verifyUrlafterLogin(){
      await this.page.waitForNavigation(); 
      expect(this.page.url()).to.equal(process.env.BASE_URL+'app/')
    }

    async verifyErrorMessage() {
      const errorMessageElements = await this.page.waitForXPath("//h4[@data-testid='error']");
      
      if (errorMessageElements.length === 0) {
          console.log("Error message element not found");
          return; // Handle the case when the element is not found
      }
  
      const errorMessageText = await this.page.evaluate(element => element.textContent, errorMessageElements);
      console.log(errorMessageText.trim());
  
      expect(errorMessageText.trim()).to.equal('Invalid email/password combination');
  }
    
  }

  module.exports = LoginPage;