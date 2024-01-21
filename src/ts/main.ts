import { TaskData } from "./types";
import handleDataFromForm from "./view/handleDataFromForm";
import taskView from "./view/taskView";

const createNewTask = (data: TaskData) => {
  taskView.addTask(data);
  taskView.renderTask();
};

const checkLocalStorage = () => {
  const storedData = localStorage.getItem("tasksState");
  if (!storedData) return;
  const retrievedData = JSON.parse(storedData);
  taskView.updateTaskState(retrievedData);
  taskView.renderTask();
};

const init = () => {
  checkLocalStorage();
  handleDataFromForm.handleForm(createNewTask);
  taskView.handleCategoryChange();
};

init();
