import { test as setup, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
setup('api auth setup', async () => {
  const apiContext = await request.newContext({

   baseURL: process.env.BASE_URL!,
    httpCredentials: {
    
      username: process.env.NINZA_USERNAME!,
   
      password : process.env.NINZA_PASSWORD!
    }
  });

  
  
  const response = await apiContext.get('/login');
expect(response.ok()).toBeTruthy();
//expect(response.status()).toBe(202);

 
await apiContext.storageState({ path: 'playwright/.auth/apiAuth.json' });
});

