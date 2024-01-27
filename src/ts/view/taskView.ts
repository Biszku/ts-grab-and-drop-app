import { TaskData } from "../types";
import View from "./view";

class TaskView extends View {
  [key: string]: any;
  tasksState: TaskData[] = [];
  taskFilter: string = "";

  statusFilter: string | null = null;
  taskNameFilter: string | null = null;
  startDateFilter: string | null = null;
  endDateFilter: string | null = null;

  statusElement = document.querySelector("#statusElement") as HTMLDivElement;
  taskNameElement = document.querySelector(
    "#taskNameElement"
  ) as HTMLDivElement;
  startDateElement = document.querySelector(
    "#startDateElement"
  ) as HTMLDivElement;
  endDateElement = document.querySelector("#endDateElement") as HTMLDivElement;

  pendingTasksCat = document.querySelector("#pendingTasksCat") as HTMLLIElement;
  finishedTasksCat = document.querySelector(
    "#finishedTasksCat"
  ) as HTMLLIElement;
  binTasksCat = document.querySelector("#binTasksCat") as HTMLLIElement;

  filterTaskForm = document.querySelector("#filterTask") as HTMLInputElement;

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
      (task) =>
        task.status === this.curCategory &&
        task.taskName.includes(this.taskFilter)
    );
    if (filteredTasks.length === 0) this.render(this.renderNoResult());

    filteredTasks.forEach((data, index) =>
      this.render(this.renderMarkUp(data, index))
    );
  }

  renderNoResult() {
    const p = document.createElement("p");
    p.classList.add(
      "text-center",
      "text-[1.8rem]",
      "py-[8rem]",
      "hover:bg-[#b5af9550]"
    );
    p.textContent = `No results.`;
    return p;
  }

  renderMarkUp(data: TaskData, index: number) {
    const { id, taskName, description, startDate, endDate, status } = data;
    const div = document.createElement("div");
    div.setAttribute("draggable", "true");
    div.classList.add(
      "cursor-move",
      "select-none",
      "hover:bg-[#b5af9550]",
      "px-[3rem]",
      "py-[2.5rem]",
      "grid",
      "grid-cols-5"
    );

    if (index !== 0) {
      div.classList.add("border-b-[0.2rem]", "border-[#00000020]");
    }

    [status, taskName, startDate, endDate].forEach((value) => {
      const span = document.createElement("span");
      span.textContent = value;
      span.classList.add("font-medium");
      div.appendChild(span);
    });
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

    [
      { element: this.pendingTasksCat, status: "pending" },
      { element: this.finishedTasksCat, status: "finished" },
      { element: this.binTasksCat, status: "bin" },
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

    [
      { element: this.pendingTasksCat, category: "pending" },
      { element: this.finishedTasksCat, category: "finished" },
      { element: this.binTasksCat, category: "bin" },
    ].forEach((obj) =>
      obj.element.addEventListener("click", () =>
        this.categoryChange(obj.category)
      )
    );
  }

  categoryChange(category: string) {
    this.curCategory = category;
    this.renderActiveCat();
    this.renderTask();
  }

  renderActiveCat() {
    [
      { element: this.pending, category: "pending" },
      { element: this.finished, category: "finished" },
      { element: this.bin, category: "bin" },
    ].forEach((obj) => {
      obj.element.classList.remove("active-cat");
      if (this.curCategory === obj.category)
        obj.element.classList.add("active-cat");
    });
  }

  handleFilterForm() {
    this.filterTaskForm.addEventListener("input", () => {
      this.taskFilter = this.filterTaskForm.value;
      this.renderTask();
    });
  }

  handleFilterByData() {
    [
      {
        element: this.statusElement,
        filterType: "statusFilter",
      },
      {
        element: this.taskNameElement,
        filterType: "taskNameFilter",
      },
      {
        element: this.startDateElement,
        filterType: "startDateFilter",
      },
      {
        element: this.endDateElement,
        filterType: "endDateFilter",
      },
    ].forEach((obj) => {
      obj.element.addEventListener("click", () => {
        const filterType = obj.filterType;
        if (this[filterType] === null) return (this[filterType] = "up");
        this[filterType] === "up"
          ? (this[filterType] = "down")
          : (this[filterType] = "up");
        this.renderTask();
      });
    });
  }
}

export default new TaskView();
