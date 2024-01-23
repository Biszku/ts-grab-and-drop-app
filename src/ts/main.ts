import { TaskData } from "./types";
import handleDataFromForm from "./view/handleDataFromForm";
import taskView from "./view/taskView";

const createNewTask = (data: TaskData) => {
  taskView.addTask(data);
};

const checkLocalStorage = () => {
  const storedData = localStorage.getItem("tasksState");
  if (!storedData) return;
  const retrievedData = JSON.parse(storedData);
  taskView.updateTaskState(retrievedData);
};

const allowChangeTaskStatus = () => {
  taskView.selectStatus();
  taskView.changeStatusOfTask();
};

const init = () => {
  checkLocalStorage();
  allowChangeTaskStatus();
  handleDataFromForm.handleForm(createNewTask);
  taskView.handleCategoryChange();
};

init();
