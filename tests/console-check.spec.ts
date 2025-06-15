import { expect, test } from '@playwright/test'

test('check for console errors', async ({ page }) => {
  const consoleMessages: Array<{ type: string; text: string }> = []

  // Listen for console events
  page.on('console', (msg) => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
    })
  })

  // Listen for page errors
  page.on('pageerror', (error) => {
    consoleMessages.push({
      type: 'pageerror',
      text: error.message,
    })
  })

  // Navigate to the homepage
  await page.goto('/')

  // Wait a bit for any async operations
  await page.waitForTimeout(2000)

  // Filter for errors and warnings
  const errors = consoleMessages.filter(
    (msg) =>
      msg.type === 'error' ||
      msg.type === 'warning' ||
      msg.type === 'pageerror',
  )

  // Log all console messages for debugging
  console.log('All console messages:', consoleMessages)

  // Log errors specifically
  if (errors.length > 0) {
    console.log('Console errors/warnings found:', errors)
  } else {
    console.log('No console errors or warnings found')
  }

  // Report errors (but don't fail the test, just report)
  for (const error of errors) {
    console.log(`Console ${error.type}: ${error.text}`)
  }
})
