import test, { expect } from "@playwright/test";
import { setup, page, teardown } from './base';
import dotenv from 'dotenv';

dotenv.config();

test.beforeAll(async () => {
  await setup();
});

test.afterAll(async () => {
  await teardown();
});

const username = process.env.GITHUB_USERNAME;
const password = process.env.GITHUB_PASSWORD;
const repoName = process.env.GITHUB_REPONAME;


test("Login Test", async () => {
  
  await page.goto("/login");
  await page.fill('input[name="login"]',`${username}` );
  await page.fill('input[name="password"]',`${password}` );
  await page.click('input[value="Sign in"]');
  await page.waitForTimeout(3000);
  const menulist = page.locator('img.avatar[src="https://avatars.githubusercontent.com/u/186371718?v=4"]');
  await menulist.click();
  await page.waitForTimeout(2000);
  const usernameLocator = page.locator('div.text-bold div.Truncate__StyledTruncate-sc-23o1d2-0.cBdrp'); 
  await expect(usernameLocator).toHaveText('gitchamila');
});


test("Create and delete a new repository", async () => {

  await page.goto('/');
  await page.fill('input[name="repository[name]"]', `${repoName}`);
  await page.click('button[value="Create a new repository"]');
  expect(page.url()).toContain('/playwright-automation-test');
  await page.waitForTimeout(5000);

});

test('Repository Search', async () => {
  await page.goto('/dashboard');
  await page.fill('input[placeholder="Find a repository…"]', 'playwright-automation-test');
  await page.click(`a:has-text("${username}/${repoName}")`);
  await page.waitForTimeout(5000);
  const repoLink = page.locator(`a.d-block.overflow-x-hidden[href="/${username}/${repoName}"]`);
  await expect(repoLink).toHaveText('playwright-automation-test');
});

test("delete an existing repository", async () => {
  await page.goto(`https://github.com/${username}/${repoName}/settings`);
  await page.waitForTimeout(3000);
  await page.click('button:has-text("Delete this repository")');
  await page.click('button:has-text("I want to delete this repository")');
  await page.click('button:has-text("I have read and understand these effects")');
  await page.fill('input[name="verification_field"]', `${username}/${repoName}`);
  await page.waitForTimeout(2000);
  await page.locator('button#repo-delete-proceed-button').click();
  await expect(page).toHaveURL(`https://github.com/${username}?tab=repositories`);
  const repoLocator = page.locator(`a[href="/${username}/${repoName}"]`);
  await expect(repoLocator).toHaveCount(0);
  await page.waitForTimeout(3000);
});

test("Logout Test", async () => {
  await page.goto('/dashboard');
  await page.waitForTimeout(2000);
  const menulist = page.locator('img.avatar[src="https://avatars.githubusercontent.com/u/186371718?v=4"]');
  await menulist.click();
  await page.waitForTimeout(2000);
  await page.click('a[href="/logout"]');
  await page.waitForTimeout(2000);
});