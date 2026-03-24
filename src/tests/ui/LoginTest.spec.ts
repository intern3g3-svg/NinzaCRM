require('dotenv').config();

import {test,expect} from '@playwright/test';
//import testdata from '../../testdata/contactstestdata.json';
import { LoginPage } from '../../pages/LoginPage';
//import { ENV } from '../env';


let lp :LoginPage;

test.beforeEach(async ({page})=>{
  //  lp = new LoginPage(page);
 //  console.log('BASE_URL:', process.env.BASE_URL!);
 // //await lp.launchApp(testdata.loginpage.url);
  // await lp.launchApp(process.env.BASE_URL!);
});

test('Login with valid credential', async({}) =>{
 
 // const uname = process.env.NINZA_USERNAME!;
  // console.log(uname);
  // await lp.enterUsername(process.env.NINZA_USERNAME!);
   //  await lp.enterPassword(process.env.NINZA_PASSWORD!);
    //await lp.enterUsername(uname);
   // await lp.enterPassword(testdata.loginpage.validPassword);
 //   await lp.clickLogin();
  //  await lp.validateCampaignHeading();

})

test.afterAll(async ({browser}) => {
 // await browser.close();
});