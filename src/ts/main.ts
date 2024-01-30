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

const categoryController = () => {
  taskView.renderActiveCat();
  taskView.handleCategoryChange();
};

const init = () => {
  checkLocalStorage();
  allowChangeTaskStatus();
  categoryController();
  taskView.changeCursor();
  handleDataFromForm.handleForm(createNewTask);
  handleDataFromForm.handleFormAppearance();
  taskView.handleFilterForm();
  taskView.handleTaskOrder();
};

init();
