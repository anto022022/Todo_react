import { List } from "../components/list";
import { SimplePagination } from "../components/simplePagination";
import "../assets/styles/common.scss";
import "../assets/styles/todo.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const ToDoList = () => {
  const [task, setTask] = useState("");
  const [message, setMessage] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [totalTask, setTotalTask] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTask();
  }, [pageCount]);

  const getTask = () => {
    let count = 10;
    axios
      .get(`${import.meta.env.VITE_URL}list?page=${pageCount}&limit=${count}`)
      .then((res) => {
        if (!res.data.success) return internalReset();
        setTaskList(res.data.data.list);
        setTotalTask(res.data.data.total);
      });
  };

  const submitTask = (val) => {
    if (val) editTask(val);
    if (!val) addTasks();
  };

  const addTasks = () => {
    if (!task.trim()) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    setMessage("");

    axios
      .post(import.meta.env.VITE_URL + "addTask", { task_name: task })
      .then((res) => {
        setTask("");
        setMessage(res.data.message);
        getTask();
      })
      .catch((err) => {
        setMessage(err.data.message);
      });
  };

  const editTask = (val) => {
    setMessage("");
    axios
      .patch(import.meta.env.VITE_URL + "patchTask", val)
      .then((res) => {
        setTask("");
        setMessage(res.data.message);
        getTask();
      })
      .catch((err) => {
        setMessage(err.data.message);
      });
  };

  const checkTask = (id) => {
    setMessage("");
    axios
      .patch(import.meta.env.VITE_URL + "completeTask", { _id: id })
      .then((res) => {
        setTask("");
        setMessage(res.data.message);
        getTask();
      })
      .catch((err) => {
        setMessage(err.data.message);
      });
  };

  const deleteTask = (id) => {
    setMessage("");
    axios
      .patch(import.meta.env.VITE_URL + "deleteTask", { _id: id })
      .then((res) => {
        setMessage(res.data.message);
        getTask();
      })
      .catch((err) => {
        setMessage(err.data.message);
      });
  };

  const deleteAll = () => {
    setMessage("");
    axios
      .delete(import.meta.env.VITE_URL + "deleteAll")
      .then((res) => {
        setMessage(res.data.message);
        internalReset();
      })
      .catch((err) => {
        setMessage(err.data.message);
      });
  };

  const internalReset = () => {
    setMessage("");
    setPageCount(1);
    setTaskList([]);
    setTask("");
    setTotalTask(0);
  };

  return (
    <div className="todo-list">
      <section className="menu-section">
        <div className="add-task-div">
          <input
            type="text"
            value={task}
            className={error ? "input-error" : ""}
            placeholder="Your task here..."
            onChange={(event) => setTask(event.target.value)}
          />
          <button onClick={addTasks}>Add task</button>{" "}
        </div>
        <div className="task-actions">
          <button onClick={() => getTask()}>Refresh</button>
          <button onClick={deleteAll}>Reset Tasks</button>
        </div>
        <div
          className="message-div"
          style={
            message ? { background: "#d87bff" } : { background: "transparent" }
          }
        >
          {message}
        </div>
      </section>
      <section>
        {" "}
        <List
          list={taskList}
          editTask={(val) => submitTask(val)}
          checkTask={(val) => checkTask(val)}
          deleteTask={(val) => deleteTask(val)}
          total={totalTask}
          pagination={(val) => setPageCount(val)}
        />
      </section>
      <section>
        {" "}
        <SimplePagination
          list={taskList}
          total={totalTask}
          pagination={(val) => setPageCount(val)}
        />
      </section>
    </div>
  );
};

export default ToDoList;
