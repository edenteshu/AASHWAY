import React, { useState } from "react";
import axios from "axios";
import { List, Button, Modal, Form, Input, Select } from "antd";

const { Option } = Select;

const TaskItem = ({ task, token }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    axios
      .put(`http://localhost:5000/api/tasks/${task._id}`, editedTask, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setIsEditing(false);
        console.log("Task updated:", response.data);
        window.location.reload();
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/tasks/${task._id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        console.log("Task deleted");
        window.location.reload();
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <List.Item
      actions={[
        <Button
          onClick={() => setIsEditing(true)}
          type="primary"
          className="bg-sky-900 text-white p-2 rounded mb-4"
        >
          Edit
        </Button>,
        <Button
          onClick={handleDelete}
          type="danger"
          className="bg-yellow-900 text-white p-2 rounded mb-4"
        >
          Delete
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={task.title}
        description={
          <>
            <p>{task.description}</p>
            <span
              className={`px-2 py-1 text-sm rounded ${
                task.priority === "High"
                  ? "bg-red-700"
                  : task.priority === "Medium"
                  ? "bg-green-700"
                  : "bg-yellow-700"
              } text-white`}
            >
              {task.priority} Priority
            </span>
          </>
        }
      />

      <Modal
        title="Edit Task"
        visible={isEditing}
        onOk={handleEdit}
        onCancel={() => setIsEditing(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Description">
            <Input.TextArea
              rows={4}
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Priority">
            <Select
              value={editedTask.priority}
              onChange={(value) =>
                setEditedTask({ ...editedTask, priority: value })
              }
            >
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </List.Item>
  );
};

export default TaskItem;
