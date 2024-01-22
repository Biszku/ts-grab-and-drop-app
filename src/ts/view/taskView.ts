import { TaskData } from "../types";
import View from "./view";

class TaskView extends View {
  pending = document.querySelector("#pendingTasks") as HTMLDivElement;
  finished = document.querySelector("#finishedTasks") as HTMLDivElement;
  bin = document.querySelector("#moveToBin") as HTMLDivElement;

  curCategory = "pending";

  tasksState: TaskData[] = [];

  elementDrag: null | HTMLDivElement = null;
  selectedStatus: null | string = null;
  dragStartListeners: Map<string, boolean> = new Map();

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
      this.elementDrag = divElement;
      this.selectStatus();
      this.changeStatusOfTask(id);
    });
  }

  selectStatus() {
    [
      { element: this.bin, status: "bin" },
      { element: this.finished, status: "finished" },
      { element: this.pending, status: "pending" },
    ].forEach((el) =>
      el.element.addEventListener("dragenter", () => {
        if (this.elementDrag !== null) {
          this.selectedStatus = el.status;
        }
      })
    );
  }

  changeStatusOfTask(id: string) {
    if (this.dragStartListeners.get(id)) return;
    document.body.addEventListener("dragend", () => this.taskStateMutation(id));
    this.dragStartListeners.set(id, true);
  }

  taskStateMutation(id: string) {
    console.log(1);
    if (this.selectedStatus === null) return;
    const newDatas = this.tasksState.map((obj) => {
      if (obj.id === id && this.selectedStatus !== null) {
        return { ...obj, status: this.selectedStatus };
      }
      return obj;
    });
    this.updateTaskState(newDatas);
    this.selectedStatus = null;
    this.elementDrag = null;
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
