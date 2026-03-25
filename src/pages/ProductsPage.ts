import { BasePage } from "../base/BasePage";
import { Page,expect,Locator } from "@playwright/test";
import { LoginPage } from "./LoginPage";

export class ProductsPage extends BasePage{
ProductsTab:Locator;
searchDropdown:Locator;
searchInput:Locator;
addProduct:Locator;
//ProductId: Locator;

//ProductsButton:Locator;
 constructor(page: Page) {
    super(page);
    //this.ProductsTab = page.locator(<any>('Products'));
    //this.ProductsTab =page.locator(<any>("nav-link"));
     //this.ProductsTab = page.getByRole('link', { name: 'Products' });
     //this.ProductsTab = page.locator('text=Products')
    //this.ProductsButton=page.getByRole('heading',{ name: 'Products'});
    this.ProductsTab = page.getByRole('link', { name: 'Products', exact: true });
    this.searchDropdown =page.locator('select.form-control');
    this.searchInput = page.getByPlaceholder('placeholder="Search by product Id"');
    //this.ProductId = page.locator('input[name="productId"]');
//this.addProduct= page.locator('span' , {hasText: "Add Product"});
      this.addProduct = page.getByRole('button',{name :'Add Product'});

  }

  // Actions
  async navigateToProducts() {
    
   // await this.ProductsTab.click();
   await this.navigateToProducts;
     
  }

async AddProduct() { 
    await this.addProduct.click;
    await console.log("clicked");

}
async searchById(id: string) {
    await this.searchDropdown.selectOption('productId');
    await this.searchInput.fill('CON01351');
}

}