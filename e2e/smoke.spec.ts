import { test, expect } from '@playwright/test';

test.describe('Bridge2Partners Smoke Tests', () => {
  
  test('Homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check if the main title/brand name is visible
    await expect(page.locator('text=Bridge2Partners').first()).toBeVisible();
    
    // Check if navigation exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('Services pages load', async ({ page }) => {
    // Navigate to a service page
    await page.goto('/services/wealth');
    
    // Ensure the page didn't 404
    await expect(page).not.toHaveTitle(/404/);
    
    // Check for the footer CTA
    await expect(page.locator('text=Ready to Transform')).toBeVisible();
  });

  test('People page loads team members', async ({ page }) => {
    await page.goto('/people');
    
    // Verify the hero title is present
    await expect(page.locator('text=Our People').first()).toBeVisible();
    
    // Note: We don't check for specific team member names here because the DB might be empty in preview
    // We just verify the UI structure loads without throwing 500 errors.
  });

  test('CMS Dashboard is protected', async ({ page }) => {
    await page.goto('/admin/people');
    
    // The guest user should see the "Please log in" message
    await expect(page.locator('text=Please log in to access the CMS')).toBeVisible();
  });

});
