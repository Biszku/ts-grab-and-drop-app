import { TaskData } from "../types";
import View from "./view";
import { v4 as uuidv4 } from "uuid";

class HandleDataFromForm extends View {
  submitBtn = document.querySelector("#submit-form-btn") as HTMLButtonElement;

  handleForm(func: (data: TaskData) => void) {
    this.submitBtn.addEventListener(
      "click",
      this.getDataFromForm.bind(this, func)
    );
  }

  getDataFromForm(func: (data: TaskData) => void, e: Event) {
    e.preventDefault();

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

    this.resetInputs([taskName, startDate, endDate]);
    func(taskData);
  }

  resetInputs(arr: HTMLInputElement[]) {
    arr.forEach((el) => (el.value = ""));
  }
}

export default new HandleDataFromForm();
