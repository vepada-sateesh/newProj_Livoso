import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../Redux/action";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "To Do",
    due_date: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const tasks = useSelector((state) => state.data.data);
  const isLoading = useSelector((state) => state.isLoading);
  const isError = useSelector((state) => state.isError);

  useEffect(() => {
    let token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
    dispatch(getTasks());
  }, [dispatch]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setEditingTaskId(null);
    setForm({ title: "", description: "", status: "To Do", due_date: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const method = editingTaskId ? "put" : "post";
    const url = editingTaskId
      ? `http://localhost:8080/task/tasks/${editingTaskId}`
      : "http://localhost:8080/task/tasks";

    axios[method](url, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        dispatch(getTasks());
        togglePopup();
      })
      .catch((err) => {
        console.error("Error saving task:", err.message);
        alert("Failed to save task");
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8080/task/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => dispatch(getTasks()))
      .catch((err) => {
        console.error("Delete error:", err.message);
        alert("Failed to delete task");
      });
  };

  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.dueDate,
    });

    setEditingTaskId(task._id);
    setIsPopupOpen(true);
  };

  const renderColumn = (status) => (
    <div className="w-full md:w-1/3 p-2">
      <h2 className="text-xl font-semibold mb-4">{status}</h2>
      <div className="space-y-4">
        {tasks
          ?.filter((task) => task.status === status)
          .map((task) => (
            <div key={task.id} className="p-4 border rounded shadow bg-white">
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={togglePopup}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        style={{
          position: "fixed",
          right: "10%",
          top: "10%",
        }}
      >
        Create Task
      </button>

      <div className="min-h-screen p-4 bg-gray-100 relative">
        {isLoading && <p>Loading tasks...</p>}
        {isError && <p className="text-red-500">Failed to load tasks.</p>}

        {isPopupOpen && (
          <div
            style={{ position: "fixed", top: "10%", left: "40%", padding: "4%" }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white p-6 rounded shadow-lg w-1/2">
              <h2 className="text-xl font-bold mb-4">
                {editingTaskId ? "Edit Task" : "Create Task"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium">Due Date</label>
                  <input
                    type="date"
                    name="due_date"
                    value={form.due_date}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {editingTaskId ? "Update Task" : "Create Task"}
                </button>
              </form>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={togglePopup}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row mt-16">
          {renderColumn("To Do")}
          {renderColumn("In Progress")}
          {renderColumn("Completed")}
        </div>
      </div>
    </>
  );
};

export default Dashboard;