import { TaskData } from "../types";

import { v4 as uuidv4 } from "uuid";

class HandleDataFromForm {
  addingForm = document.querySelector("#adding-form") as HTMLButtonElement;
  formVisibleBtn = document.querySelector(
    "#submit-form-btn"
  ) as HTMLButtonElement;
  formSection = document.querySelector("#form-section") as HTMLDivElement;
  closeForm = document.querySelector("#closeForm") as HTMLImageElement;
  formBackdrop = document.querySelector("#form-backdrop") as HTMLDivElement;

  handleForm(func: (data: TaskData) => void) {
    this.addingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.getDataFromForm.bind(this, func)();
    });
  }

  handleFormAppearance() {
    this.formVisibleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.openFormSection();
    });

    this.closeForm.addEventListener("click", () => {
      this.closeFormSection();
    });

    this.formBackdrop.addEventListener("click", () => {
      this.closeFormSection();
    });
  }

  closeFormSection() {
    this.formSection.classList.add("formDisappearance");
    this.formBackdrop.classList.add("backdropDisappearance");

    this.formSection.classList.remove("formAppearance");
    this.formBackdrop.classList.remove("backdropAppearance");
  }

  openFormSection() {
    this.formSection.classList.add("formAppearance");
    this.formBackdrop.classList.add("backdropAppearance");

    this.formSection.classList.remove("formDisappearance");
    this.formBackdrop.classList.remove("backdropDisappearance");
  }

  getDataFromForm(func: (data: TaskData) => void) {
    const taskName = document.querySelector("#taskName") as HTMLInputElement;
    const startDate = document.querySelector("#startDate") as HTMLInputElement;
    const endDate = document.querySelector("#endDate") as HTMLInputElement;
    const description = document.querySelector(
      "#description"
    ) as HTMLInputElement;

    if (
      taskName.value.trim() === "" ||
      startDate.value === "" ||
      endDate.value === "" ||
      description.value === ""
    ) {
      return null;
    }

    const taskData = {
      id: uuidv4(),
      taskName: taskName.value.trim(),
      startDate: startDate.value,
      endDate: endDate.value,
      description: description.value,
      status: "pending",
    };

    this.resetInputs([taskName, startDate, endDate, description]);
    func(taskData);
  }

  resetInputs(arr: HTMLInputElement[]) {
    arr.forEach((el) => (el.value = ""));
  }
}

export default new HandleDataFromForm();
