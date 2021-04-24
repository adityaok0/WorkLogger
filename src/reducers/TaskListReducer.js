let defaultState = {
  toDo: [
    { taskName: "task11", description: "task 1 description" },
    { taskName: "task12", description: "task 1 description" },
    { taskName: "task13", description: "task 1 description" },
    { taskName: "task14", description: "task 1 description" },
  ],
  inProgress: [
    { taskName: "task2", description: "task 2 description" },
    { taskName: "task3", description: "task 3 description" },
  ],
  done: [
    { taskName: "task4", description: "task 4 description" },
    { taskName: "task5", description: "task 5 description" },
    { taskName: "task6", description: "task 6 description" },
  ],
};
const TaskListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_FORM_DATA": {
      let temp = JSON.parse(JSON.stringify(state));
      temp[`${action.payload.form.branch}`].push({
        taskName: action.payload.form.taskName,
        description: action.payload.form.description,
      });
      return temp;
    }
    case "MOVE_TO_IN_PROGRESS_FROM_TO_DO": {
      let temp = JSON.parse(JSON.stringify(state));
      temp.inProgress.push(temp.toDo[action.payload.index]);
      temp.toDo = temp.toDo.filter((item, itemIndex) => {
        return itemIndex !== action.payload.index;
      });
      return temp;
    }

    case "MOVE_TO_DONE_FROM_IN_PROGRESS": {
      let temp = JSON.parse(JSON.stringify(state));
      temp.done.push(temp.inProgress[action.payload.index]);
      temp.inProgress = temp.inProgress.filter((item, itemIndex) => {
        return itemIndex !== action.payload.index;
      });
      return temp;
    }

    case "MOVE_TO_TO_DO_FROM_IN_PROGRESS": {
      let temp = JSON.parse(JSON.stringify(state));
      temp.toDo.push(temp.inProgress[action.payload.index]);
      temp.inProgress = temp.inProgress.filter((item, itemIndex) => {
        return itemIndex !== action.payload.index;
      });
      return temp;
    }
    case "MOVE_TO_IN_PROGRESS_FROM_DONE": {
      let temp = JSON.parse(JSON.stringify(state));
      temp.inProgress.push(temp.done[action.payload.index]);
      temp.done = temp.done.filter((item, itemIndex) => {
        return itemIndex !== action.payload.index;
      });
      return temp;
    }
    default:
      return state;
  }
};
export default TaskListReducer;
