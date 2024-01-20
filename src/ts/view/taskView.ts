import { TaskData } from "../types";
import View from "./view";

class TaskView extends View {
  renderTask(data: TaskData) {
    if (data === null) return;
    this.render(this.renderMarkUp(data));
  }
  renderMarkUp(data: TaskData) {
    const { taskName, startDate, endDate } = data;
    const div = document.createElement("div");
    div.textContent = `${taskName},${startDate},${endDate}`;
    return div;
  }
}

export default new TaskView();
