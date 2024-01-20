import { TaskData } from "../types";
import View from "./view";

class HandleDataFromForm extends View {
  submitBtn = document.querySelector("#submit-form-btn")!;

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
    if (
      taskName.value.trim() === "" ||
      startDate.value === "" ||
      endDate.value === ""
    ) {
      this.resetInputs([taskName, startDate, endDate]);
      return null;
    }
    const taskData = {
      taskName: taskName.value,
      startDate: startDate.value,
      endDate: endDate.value,
    };
    this.resetInputs([taskName, startDate, endDate]);
    func(taskData);
  }

  resetInputs(arr: HTMLInputElement[]) {
    arr.forEach((el) => (el.value = ""));
  }
}

export default new HandleDataFromForm();
