import { expect, test } from '@playwright/test'

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/')

  // Check if the main title is present
  await expect(page.locator('h1')).toContainText('K-K App')

  // Check if the description is present
  await expect(page.locator('p')).toContainText(
    "Private couple's web application for expense tracking, to-dos, and calendar",
  )

  // Check if page has proper structure
  await expect(page.locator('main')).toBeVisible()
})
