import { test, expect } from '@playwright/test';
import { CrudActions } from '../pages/crudActions';
import { MarkActions } from '../pages/markActions';
import { verify } from 'crypto';
import { FilterActions } from '../pages/filterActions';
import { cursorTo } from 'readline';


let crudActions: CrudActions
let markActions: MarkActions
let filterActions: FilterActions


test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/  ');
  crudActions = new CrudActions(page)
  markActions = new MarkActions(page)
  filterActions = new FilterActions(page)
});


