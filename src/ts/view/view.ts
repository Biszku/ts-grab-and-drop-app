import { TaskData } from "../types";

class View {
  tasksState: TaskData[] = [];
  container = document.querySelector("#container") as HTMLDivElement;
  render(element: Element) {
    this.container.insertAdjacentElement("afterbegin", element);
  }
}

export default View;
