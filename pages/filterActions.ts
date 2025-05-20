import { expect, Locator, Page } from "@playwright/test"
import { CrudActions } from "./crudActions"
import { MarkActions } from "./markActions"

export class FilterActions{

crudAction: CrudActions
markActions: MarkActions

readonly page: Page
readonly activeFilterButton: Locator
readonly toDoTable: Locator
readonly completedFilterButton: Locator
readonly clearCompletedButton: Locator


constructor(page: Page) {
    this.page = page
    this.crudAction = new CrudActions(page)
    this.markActions = new MarkActions(page)
    this.activeFilterButton = page.getByText('Active')
    this.toDoTable = page.getByTestId('todo-title')
    this.completedFilterButton = page.getByText('Completed')
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' })
}

async activeFilter(){
    this.markActions.createThreeToDoElements()
    this.activeFilterButton.click()
}

async verifyActiveFilter(){
     await expect(this.toDoTable).toHaveText(['First', 'Second', 'Third']);
}

async completedFilter(){
    this.markActions.createThreeToDoElements()
    await this.completedFilterButton.click()

}
async verifyCompletedFilter(){
    await expect(this.toDoTable).not.toHaveText(['First', 'Second', 'Third']);

}

async useClearCompletedButton(){
    await this.markActions.createThreeToDoElements()
    await this.markActions.markAllToDoAsCompleted()
    await this.clearCompletedButton.click()

}

async verifyUseClearCompletedButton(){
    await expect(this.toDoTable).not.toHaveText(['First', 'Second', 'Third']);
}

}