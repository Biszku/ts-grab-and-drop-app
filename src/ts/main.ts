import { TaskData } from "./types";
import handleDataFromForm from "./view/handleDataFromForm";
import taskView from "./view/taskView";

const renderTask = (data: TaskData) => {
  taskView.renderTask(data);
};

const init = () => {
  handleDataFromForm.handleForm(renderTask);
};

init();
