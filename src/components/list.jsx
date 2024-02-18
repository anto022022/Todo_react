import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import "../assets/styles/list.scss";

export const List = ({
  list,
  editTask,
  deleteTask,
  checkTask,
  total,
  pagination,
}) => {
  const [editing, setEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [paginate, setPagination] = useState(0);
  // let originalArray = list ? JSON.parse(JSON.stringify([...list])) : [];
  // console.log("divided valkus", Math.ceil(total / 10));
  console.log(total);
  useEffect(() => {
    setTaskList(JSON.parse(JSON.stringify([...list])));
    setPagination(Math.ceil(total / 10));
  }, [list]);

  if (!list) return <div>no data found</div>;

  const editFiled = (val, index) => {
    setCurrentValue("");
    setTaskList(JSON.parse(JSON.stringify([...list])));
    let newArr = JSON.parse(JSON.stringify([...list]));
    newArr[index]["isEditing"] = true;
    setTaskList(newArr);
    val["isEditing"] = true;
    setEditing(true);
    setCurrentValue(val.task_name);
  };

  return (
    <div>
      {taskList.map((ele, index) => (
        <div className="checkbox-list" key={ele._id}>
          {ele.isEditing ? (
            <input
              type="text"
              value={currentValue}
              onChange={(event) => setCurrentValue(event.target.value)}
            />
          ) : (
            <div className="checkbox-wrapper">
              <div className="checkbox-style">
                <input
                  type="checkbox"
                  className="box"
                  checked={ele.is_completed}
                  disabled={ele.is_completed}
                  value={ele.is_completed}
                  onChange={() => checkTask(ele._id)}
                />
              </div>
              {ele.task_name}
            </div>
          )}

          {ele.isEditing ? (
            <button
              onClick={() =>
                editTask({ _id: ele._id, task_name: currentValue })
              }
            >
              save
            </button>
          ) : (
            !ele.is_completed && (
              <div className="checkbox-actions">
                <button
                  // onClick={() => editTask({ _id: ele._id, task_name: ele.task_name })}
                  onClick={() => editFiled(ele, index)}
                >
                  <EditIcon />
                </button>
                <button onClick={() => deleteTask(ele._id)}>
                  <DeleteIcon />
                </button>
              </div>
            )
          )}
        </div>
      ))}
      {taskList.length == 0 ? (
        <div className="empty-list">Add tasks!</div>
      ) : null}
    </div>
  );
};
