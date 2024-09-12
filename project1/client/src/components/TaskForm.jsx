import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Select, DatePicker } from "antd";
import moment from "moment";

const { Option } = Select;

const TaskForm = ({ token }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const task = {
      ...values,
      deadline: values.deadline ? values.deadline.format("YYYY-MM-DD") : null,
    };

    axios
      .post("http://localhost:5000/api/tasks", task, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("Task created:", response.data);
        form.resetFields();
        window.location.reload(); // Reload the page to show the new task
      })
      .catch((error) => console.error("Error creating task:", error));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="mb-6 "
    >
      <h2 className="text-2xl font-bold mb-3">Add New Task</h2>

      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input placeholder="Task title" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please input the description!" }]}
      >
        <Input.TextArea rows={5} placeholder="Task description" />
      </Form.Item>

      <Form.Item name="category" label="Category">
        <Input placeholder="Task category" />
      </Form.Item>

      <Form.Item name="priority" label="Priority" initialValue="Low">
        <Select>
          <Option value="Low">Low</Option>
          <Option value="Medium">Medium</Option>
          <Option value="High">High</Option>
        </Select>
      </Form.Item>

      <Form.Item name="deadline" label="Deadline">
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="bg-sky-900 text-white p-2 rounded mb-4"
        >
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
