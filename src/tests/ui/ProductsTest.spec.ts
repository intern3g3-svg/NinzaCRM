import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { url } from 'node:inspector';
import { ProductsPage } from '../../pages/ProductsPage';
 require('dotenv').config(); 

          

test.beforeEach('launch app', async ({ page }) => {
  const loginPage = new LoginPage(page);
//loginPage.navigate;
  // Use environment variables or configuration for actual credentials
  //const username = process.env.USER_NAME!; 
  //const password = process.env.PASSWORD!;

  //await loginPage.login(username, password);

});
test('Productspage', async ({ page }) => {
  const loginPage = new LoginPage(page);
const productsPage = new ProductsPage(page);
//await expect(page.getByRole('heading',{ name: 'Products'})).toBeVisible({ timeout: 10000 });
 //await expect(page.getByText('Products')).toBeVisible();
 await productsPage.navigateToProducts();

 // Search by ID (can take full ID or just a prefix/alphabet)
 // await productsPage.searchById;
});
test('AddProduct', async ({ page }) => {
  
const pp = new ProductsPage(page);
await pp.AddProduct();





 });