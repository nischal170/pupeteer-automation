require("dotenv").config();
const expect= require('chai').expect;
class Supplier  {
    constructor(page) {
        this.page = page;
      }
    async gotoHomePage(){

        await this.page.goto(process.env.BASE_URL+'app/',{'timeout': 10000, 'waitUntil':'load'});
      }

    async clickOnSuppliers(){
      const supp=await this.page.waitForXPath("//a[@data-field-value='sidebar-Supply Chain'][1]")
      await supp.click();
      const supplier=await this.page.waitForXPath("//div[@class='SecureMenu__ChildParentMenu-sc-jss9fx-12 evYypD']//div[2] //a")
      await supplier.click();
        
    }
    async addSupplier(name,country){
      const clickonsuplier=await this.page.waitForXPath("//button[contains(text(), 'Supplier')]");
      await clickonsuplier.click();
      await this.page.waitForTimeout(1000);
      const suppName = await this.page.waitForXPath("//input[@data-field-value='supplier_name']");
      await suppName.type(name);
      await this.page.waitForTimeout(1000);
      const countryField = await this.page.waitForXPath("//form[@skup-component-name='Form-AddSupplier']//div[2]//input");
      await countryField.type(country);
      await this.page.waitForTimeout(1000);
      await countryField.press('Enter');
      

    }
    

    async clickSubmit() {
       const submit= await this.page.waitForXPath("//div[@skup-component-name='div-AddSupplier']//button[2][@type='submit']");
      await submit.click();
      
    }
    
    async verifySupplierCreation(){
     
      const supplierCreateMessageElement = await this.page.waitForXPath("//div[@class='Toastify__toast-body']//p");
      if (supplierCreateMessageElement.length === 0) {
        console.log("Error message element not found");
        return; 
    }
      const supplierCreateText = await this.page.evaluate(element => element.textContent, supplierCreateMessageElement);
      expect(supplierCreateText.trim()).to.equal('Supplier added successfully.');
      //await this.page.waitForTimeout(10000);

    }
    
  }

  module.exports = Supplier;