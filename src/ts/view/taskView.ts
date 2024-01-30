import { TaskData } from "../types";
import View from "./view";

class TaskView extends View {
  tasksState: TaskData[] = [];
  taskFilter: string = "";

  mainTable = document.querySelector("#mainTable") as HTMLDivElement;
  sideBarCats = document.querySelector("#sideBarCats") as HTMLDivElement;

  pendingTasksCat = document.querySelector("#pendingTasksCat") as HTMLLIElement;
  finishedTasksCat = document.querySelector(
    "#finishedTasksCat"
  ) as HTMLLIElement;
  binTasksCat = document.querySelector("#binTasksCat") as HTMLLIElement;

  pending = document.querySelector("#pendingTasks") as HTMLDivElement;
  finished = document.querySelector("#finishedTasks") as HTMLDivElement;
  bin = document.querySelector("#moveToBin") as HTMLDivElement;

  filterTaskForm = document.querySelector("#filterTask") as HTMLInputElement;

  curCategory = "pending";

  selectedStatus: null | string = null;
  selectedElementId: null | string = null;
  selectedElementDiv: null | HTMLDivElement = null;

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
    const { id, taskName, startDate, endDate, status } = data;
    const div = document.createElement("div");
    div.setAttribute("draggable", "true");
    div.classList.add(
      "cursor-move",
      "select-none",
      "hover:bg-[#b5af9550]",
      "px-[3rem]",
      "py-[2.5rem]",
      "grid",
      "grid-cols-5",
      "items-center"
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
    const button = this.createButton(id);
    if (button !== null) div.appendChild(button);

    this.taskMovingHandler(div, id);
    return div;
  }

  createButton(id: string) {
    const button = document.createElement("button");
    const bg = this.curCategory === "bin" ? "bg-red-900" : "bg-zinc-900";

    button.classList.add(
      `${bg}`,
      "text-[#FFFEF1]",
      "text-[1.8rem]",
      "font-[500]",
      "px-[2.5rem]",
      "py-[1rem]",
      "rounded-lg",
      "place-self-center",
      "hover:opacity-90"
    );
    if (this.curCategory === "bin") {
      button.textContent = "Delete";
      button.addEventListener("click", () => {
        const arrWithoutThatElement = this.tasksState.filter(
          (obj) => obj.id !== id
        );
        this.updateTaskState(arrWithoutThatElement);
      });
    }
    if (this.curCategory === "pending") button.textContent = "Edit";
    if (this.curCategory === "finished") return null;
    return button;
  }

  taskMovingHandler(divElement: HTMLDivElement, id: string) {
    divElement.addEventListener("dragstart", () => {
      this.selectedElementId = id;
      this.selectedElementDiv = divElement;
      this.selectedElementDiv.classList.add("opacity-50");
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
    if (this.selectedElementDiv)
      this.selectedElementDiv.classList.remove("opacity-50");
    this.selectedElementDiv = null;
    if (this.selectedStatus === null) {
      this.selectedElementId = null;
      return;
    }
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

  changeCursor() {
    this.mainTable.addEventListener("dragover", (e) => e.preventDefault());
    this.sideBarCats.addEventListener("dragover", (e) => e.preventDefault());
  }

  handleTaskOrder() {
    this.container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = this.getDragAfterElement(e.clientY);
      if (this.selectedElementDiv) {
        if (afterElement.element === undefined) {
          this.container.appendChild(this.selectedElementDiv);
        } else {
          this.container.insertBefore(
            this.selectedElementDiv,
            afterElement.element
          );
        }
      }
    });
  }

  getDragAfterElement(y: number) {
    const draggableElements = [
      ...this.container.querySelectorAll("div:not(.opacity-50)"),
    ];

    return draggableElements.reduce(
      (closest: { offset: number; element?: Element }, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
      }
    );
  }
}

export default new TaskView();
