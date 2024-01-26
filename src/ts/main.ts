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

const formVisibilityControl = () => {
  handleDataFromForm.handleFormAppearance();
};

const init = () => {
  checkLocalStorage();
  allowChangeTaskStatus();
  formVisibilityControl();
  taskView.renderActiveCat();
  handleDataFromForm.handleForm(createNewTask);
  taskView.handleCategoryChange();
  taskView.handleFilterForm();
};

init();
