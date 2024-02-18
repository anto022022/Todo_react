//  import React, { lazy, Suspense } from "react";
import { List } from "../components/list";
import "../assets/styles/common.scss";
import "../assets/styles/todo.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const ToDoList = () => {
  const [task, setTask] = useState("");
  const [message, setMessage] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [totalTask, setTotalTask] = useState("");
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    console.log("effect");
    getTask();
  }, [pageCount]);

  const getTask = () => {
    let count = 10;
    axios
      .get(`${import.meta.env.VITE_URL}list?page=${pageCount}&limit=${count}`)
      .then((res) => {
        console.log("res-->", res);
        setTaskList(res.data.data.list);
        setTotalTask(res.data.data.total);
      });
  };

  const submitTask = (val) => {
    if (val) editTask(val);
    if (!val) addTasks();
  };

  const addTasks = () => {
    setMessage("");
    axios
      .post(import.meta.env.VITE_URL + "addTask", { task_name: task })
      .then((res) => {
        // console.log(res);
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
        // console.log(res);
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
        console.log(res);
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
    console.log("id", id);
    axios
      .patch(import.meta.env.VITE_URL + "deleteTask", { _id: id })
      .then((res) => {
        console.log(res);
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
        console.log(res);
        setMessage(res.data.message);
        getTask();
      })
      .catch((err) => {
        setMessage(err.data.message);
      });
  };
  return (
    <div className="todo-list">
      <section>
        {" "}
        <input
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
        <button onClick={addTasks}>Add task</button>
        <button onClick={() => getTask()}>Refresh</button>
        <button onClick={deleteAll}>Reset Tasks</button>
        <div>{message}</div>
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
    </div>
  );
};

export default ToDoList;
