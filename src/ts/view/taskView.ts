import { TaskData } from "../types";
import View from "./view";

class TaskView extends View {
  bin = document.querySelector("#pendingTasks") as HTMLDivElement;
  pending = document.querySelector("#finishedTasks") as HTMLDivElement;
  finished = document.querySelector("#moveToBin") as HTMLDivElement;
  elementDrag: null | HTMLDivElement = null;

  curCategory = "pending";

  handleCategoryChange() {
    [
      { element: this.bin, category: "bin" },
      { element: this.pending, category: "pending" },
      { element: this.finished, category: "finished" },
    ].forEach((obj) =>
      obj.element.addEventListener("click", () =>
        this.categoryChange(obj.category)
      )
    );
  }

  categoryChange(category: string) {
    this.curCategory = category;
    this.renderTask();
  }

  addTask(data: TaskData) {
    this.tasksState = [...this.tasksState, data];
    const jsonTasksState = JSON.stringify(this.tasksState);
    localStorage.setItem("tasksState", jsonTasksState);
  }

  updateTaskState(data: TaskData[]) {
    this.tasksState = data;
    const jsonTasksState = JSON.stringify(this.tasksState);
    localStorage.setItem("tasksState", jsonTasksState);
  }

  renderTask() {
    this.container.innerHTML = "";
    const filteredTasks = this.tasksState.filter(
      (task) => task.status === this.curCategory
    );
    filteredTasks.forEach((data) => this.render(this.renderMarkUp(data)));
  }

  renderMarkUp(data: TaskData) {
    const { taskName, startDate, endDate, status } = data;
    const div = document.createElement("div");
    div.classList.add("cursor-grab", "select-none", "relative");
    div.textContent = `${taskName},${startDate},${endDate},${status}`;
    this.taskMovingHandler(div);
    return div;
  }

  taskMovingHandler(divElement: HTMLDivElement) {
    divElement.addEventListener("mousedown", () => {
      this.elementDrag = divElement;
      console.log("Drag!");
    });

    document.body.addEventListener("mousemove", () => {
      if (this.elementDrag) {
      }
    });

    document.body.addEventListener("mouseup", () => {
      this.elementDrag = null;
    });
  }
}

export default new TaskView();
