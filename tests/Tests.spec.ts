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

test('Create to-do', async ({ page }) => {
  // Create to-do element and verify it
  await crudActions.createToDoElement();
  await crudActions.verifyToDoElement();
});

test('Delete to-do', async ({ page }) => {
  // Delete to-do element and verify it was deleted
  await crudActions.deleteToDoElement();
  await crudActions.verifyToDoElementIsDeleted();
});

test('Edit to-do', async ({ page }) => {
  // Edit to-do element and verify it was edited
  await crudActions.editToDoElement();
  await crudActions
  .verifyToDoElementIsEdited();
});

test('Mark to-do as completed', async ({ page }) => {
  // Mark to-do element as completed and verify it was marked
  await markActions.markToDoAsCompleted();
  await markActions.verifyToDoIsMarkedAsCompleted();
});

test('Mark all-to-do as completed', async ({ page }) => {
  // Mark three to-do elements as completed and verify they were marked as completed
  await markActions.markAllToDoAsCompleted();
  await markActions.verifyMarkAllToDoAsCompleted();
});

test('Unmark all-to-do', async ({ page }) => {
  // Mark three to-do elements as completed and then unmark them, verify the unmarking
  await markActions.unmarkAllToDo();
  await markActions.verifyUnmarkAllToDo();
});


