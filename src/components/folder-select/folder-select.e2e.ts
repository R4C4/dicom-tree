import { newE2EPage } from '@stencil/core/testing';

describe('folder-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<folder-select></folder-select>');
    const element = await page.find('folder-select');
    expect(element).toHaveClass('hydrated');
  });{cursor}
});
