import { TaskData } from "../types";

class View {
  container = document.querySelector("#container") as HTMLDivElement;
  render(element: Element) {
    this.container.insertAdjacentElement("afterbegin", element);
  }
}

export default View;
