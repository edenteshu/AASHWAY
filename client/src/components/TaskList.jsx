import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Select, Input, DatePicker } from "antd";
import TaskItem from "./TaskItem";

const { Option } = Select;

const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    priority: "",
    deadline: "",
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setTasks(response.data);
        checkForNotifications(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [token]);

  const checkForNotifications = (tasks) => {
    const currentTime = new Date().getTime();
    const upcomingNotifications = tasks
      .filter((task) => {
        const taskTime = new Date(task.deadline).getTime();
        return (
          taskTime - currentTime <= 24 * 60 * 60 * 1000 &&
          taskTime > currentTime
        );
      })
      .map((task) => `Task "${task.title}" is due within the next 24 hours.`);

    const overdueNotifications = tasks
      .filter((task) => new Date(task.deadline).getTime() < currentTime)
      .map((task) => `Task "${task.title}" is overdue!`);

    setNotifications([...upcomingNotifications, ...overdueNotifications]);
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      (filter.category ? task.category === filter.category : true) &&
      (filter.priority ? task.priority === filter.priority : true) &&
      (filter.deadline
        ? new Date(task.deadline).toISOString().split("T")[0] ===
          filter.deadline
        : true)
    );
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Task List</h1>

      <div className="mb-4 flex gap-4">
        <Input
          placeholder="Filter by category"
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
        />
        <Select
          defaultValue=""
          onChange={(value) => setFilter({ ...filter, priority: value })}
        >
          <Option value="">All Priorities</Option>
          <Option value="Low">Low</Option>
          <Option value="Medium">Medium</Option>
          <Option value="High">High</Option>
        </Select>
        <DatePicker
          format="DD-MM-YYYY"
          onChange={(date) =>
            setFilter({
              ...filter,
              deadline: date ? date.format("DD-MM-YYYY") : "",
            })
          }
        />
      </div>

      {notifications.length > 0 && (
        <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-green-800 text-green-400">
          <h2 className="font-bold mb-2">Notifications</h2>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </div>
      )}

      <List
        itemLayout="horizontal"
        dataSource={filteredTasks}
        renderItem={(task) => (
          <TaskItem key={task._id} task={task} token={token} />
        )}
      />
    </div>
  );
};

export default TaskList;
