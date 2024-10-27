import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

export async function setup() {
  if (!browser) {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
  }
  return { browser, context, page };
}

export async function teardown() {
  //await browser.close();
}

export {  page };