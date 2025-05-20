import { expect, Locator, Page } from "@playwright/test"

export class CrudActions{


readonly page: Page
readonly textBoxMain: Locator
readonly toDoElement: Locator
readonly toDoElementDeleteButton: Locator
readonly toDoElementEdit: Locator


constructor(page: Page) {
    this.page = page
    this.textBoxMain = page.getByRole('textbox', { name: 'What needs to be done?' })
    this.toDoElement = page.getByTestId('todo-title')
    this.toDoElementDeleteButton = page.getByRole('button', { name: 'Delete' })
    this.toDoElementEdit = page.getByRole('textbox', { name: 'Edit' })
}



async createToDoElement(){

    await this.textBoxMain.fill('Test to-do')
    await this.textBoxMain.press('Enter')
}

async verifyToDoElement(){
    await expect(this.toDoElement).toHaveText('Test to-do')
}

async deleteToDoElement(){
    await this.createToDoElement()
    await this.toDoElement.click()
    await this.toDoElementDeleteButton.click()
}

async verifyToDoElementIsDeleted(){
    await expect(this.toDoElement).not.toBeVisible()
}

async editToDoElement(){
    await this.createToDoElement()
    await this.toDoElement.dblclick()
    await this.toDoElementEdit.fill('Edited to-do')
    await this.toDoElementEdit.press('Enter')
}

async verifyToDoElementIsEdited(){
    await expect(this.toDoElement).toHaveText('Edited to-do')
}

}
