import { TaskData } from "../types";
import View from "./view";

class TaskView extends View {
  tasksState: TaskData[] = [];

  pending = document.querySelector("#pendingTasks") as HTMLDivElement;
  finished = document.querySelector("#finishedTasks") as HTMLDivElement;
  bin = document.querySelector("#moveToBin") as HTMLDivElement;

  curCategory = "pending";

  selectedStatus: null | string = null;
  selectedElementId: null | string = null;

  addTask(data: TaskData) {
    this.tasksState = [...this.tasksState, data];
    const jsonTasksState = JSON.stringify(this.tasksState);
    localStorage.setItem("tasksState", jsonTasksState);
    this.renderTask();
  }

  updateTaskState(data: TaskData[]) {
    this.tasksState = data;
    const jsonTasksState = JSON.stringify(this.tasksState);
    localStorage.setItem("tasksState", jsonTasksState);
    this.renderTask();
  }

  renderTask() {
    this.container.innerHTML = "";
    const filteredTasks = this.tasksState.filter(
      (task) => task.status === this.curCategory
    );
    filteredTasks.forEach((data) => this.render(this.renderMarkUp(data)));
  }

  renderMarkUp(data: TaskData) {
    const { id, taskName, description, startDate, endDate, status } = data;
    const div = document.createElement("div");
    div.setAttribute("draggable", "true");
    div.classList.add("cursor-grab", "select-none", "relative");
    div.textContent = `${taskName},${description},${startDate},${endDate},${status}`;
    this.taskMovingHandler(div, id);
    return div;
  }

  taskMovingHandler(divElement: HTMLDivElement, id: string) {
    divElement.addEventListener("dragstart", () => {
      this.selectedElementId = id;
    });
  }

  selectStatus() {
    [
      { element: this.bin, status: "bin" },
      { element: this.finished, status: "finished" },
      { element: this.pending, status: "pending" },
    ].forEach((el) =>
      el.element.addEventListener("dragenter", () => {
        if (this.selectedElementId !== null) this.selectedStatus = el.status;
      })
    );
  }

  changeStatusOfTask() {
    document.body.addEventListener("dragend", () => {
      if (this.selectedElementId !== null)
        this.taskStateMutation(this.selectedElementId);
    });
  }

  taskStateMutation(id: string) {
    if (this.selectedStatus === null) return;
    const newDatas = this.tasksState.map((obj) => {
      if (obj.id === id && this.selectedStatus !== null) {
        return { ...obj, status: this.selectedStatus };
      }
      return obj;
    });
    this.updateTaskState(newDatas);
    this.selectedStatus = null;
    this.selectedElementId = null;
  }

  handleCategoryChange() {
    [
      { element: this.pending, category: "pending" },
      { element: this.finished, category: "finished" },
      { element: this.bin, category: "bin" },
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
}

export default new TaskView();
