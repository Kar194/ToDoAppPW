import { expect, Locator, Page } from "@playwright/test"
import { CrudActions } from "./crudActions"

export class MarkActions{

crudActions: CrudActions

readonly page: Page
readonly markCompletedBox: Locator
readonly markAllCompletedButton: Locator
readonly clearCompletedButton: Locator
readonly todoCount: Locator


constructor(page: Page) {
    this.page = page
    this.crudActions = new CrudActions(page)
    this.markCompletedBox = page.getByRole('checkbox', { name: 'Toggle Todo' })
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' })
    this.markAllCompletedButton = page.getByText('Mark all as complete')
    this.todoCount = page.getByTestId("todo-count")
}


async markToDoAsCompleted(){
    this.crudActions.createToDoElement();
    await this.markCompletedBox.check()
}

async verifyToDoIsMarkedAsCompleted(){
    await expect(this.clearCompletedButton).toBeVisible()
}

async createThreeToDoElements(){
    await this.crudActions.textBoxMain.fill('First')
    await this.crudActions.textBoxMain.press('Enter')
    await this.crudActions.textBoxMain.fill('Second')
    await this.crudActions.textBoxMain.press('Enter')  
    await this.crudActions.textBoxMain.fill('Third')
    await this.crudActions.textBoxMain.press('Enter')
}

async markAllToDoAsCompleted(){
    await this.createThreeToDoElements()
    await this.markAllCompletedButton.click()
}

async verifyMarkAllToDoAsCompleted(){
    await expect(this.todoCount).toHaveText('0 items left')
}

async unmarkAllToDo(){
    await this.createThreeToDoElements()
    await this.markAllCompletedButton.click()
    await this.markAllCompletedButton.click()
}

async verifyUnmarkAllToDo(){
    await expect(this.todoCount).toHaveText('3 items left')
}

}