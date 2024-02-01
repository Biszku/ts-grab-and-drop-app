import { TaskData } from "./types";
import categoryChange from "./view/categoryChange";
import handleDataFromForm from "./view/dataFromFormControl";
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
  categoryChange.handleCategoryChange(
    taskView.updateCategoryState.bind(taskView)
  );
  categoryChange.renderActiveCat(taskView.curCategory);
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
