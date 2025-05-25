export async function closeDialog(page: any): Promise<void> {
  return await page.keyboard.press('Escape');
}
