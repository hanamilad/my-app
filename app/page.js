"use client";
import React, { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [draggingTask, setDraggingTask] = useState(null);

  const handleAddTask = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, name: newTask, status: "todo" },
      ]);
      setNewTask("");
      setShowForm(false);
    }
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id);
    setDraggingTask(id);
  };

  const handleTouchStart = (e, id) => {
    setDraggingTask(id);
  };

  const handleTouchEnd = (e) => {
    const target = document.elementFromPoint(
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    );
    if (target && target.dataset && target.dataset.status) {
      const status = target.dataset.status;
      handleDrop(draggingTask, status);
    }
    setDraggingTask(null);
  };

  const handleDrop = (taskId, status) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === parseInt(taskId)) {
        return { ...task, status };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <main className="">
      <div className="text-center shadow-md p-3">
        <h>
          <span className="text-white bg-black rounded-md p-2 mr-2">Do</span>TO
          DO APP
        </h>
      </div>
      <div className="text-center mt-4">
        <button
          className="p-2 rounded-md bg-[#3c3d83] hover:opacity-80"
          onClick={handleAddTask}
        >
          Add New Task
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-9 max-[900px]:grid-cols-1">
        <div
          className="bg-[#3c3d83] rounded-lg p-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleDrop(e.dataTransfer.getData("taskId"), "todo");
          }}
          data-status="todo"
        >
          <h>To Do</h>
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <div
                key={task.id}
                className="bg-white text-black mt-3 rounded-lg p-2 cursor-pointer"
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onTouchStart={(e) => handleTouchStart(e, task.id)}
                onTouchEnd={handleTouchEnd}
              >
                {task.name}
              </div>
            ))}
        </div>
        <div
          className="bg-[#3c3d83] rounded-lg p-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleDrop(e.dataTransfer.getData("taskId"), "progress");
          }}
          data-status="progress"
        >
          <h>Progression</h>
          {tasks
            .filter((task) => task.status === "progress")
            .map((task) => (
              <div
                key={task.id}
                className="bg-black text-white mt-3 rounded-lg p-2 cursor-pointer"
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onTouchStart={(e) => handleTouchStart(e, task.id)}
                onTouchEnd={handleTouchEnd}
              >
                {task.name}
              </div>
            ))}
        </div>
        <div
          className="bg-[#3c3d83] rounded-lg p-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleDrop(e.dataTransfer.getData("taskId"), "done");
          }}
          data-status="done"
        >
          <h>Done</h>
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <div
                key={task.id}
                className="bg-green-700 text-white mt-3 rounded-lg p-2 cursor-pointer"
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onTouchStart={(e) => handleTouchStart(e, task.id)}
                onTouchEnd={handleTouchEnd}
              >
                {task.name}
              </div>
            ))}
        </div>
      </div>
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 rounded-lg text-black"
        >
          <h1 className="font-bold">Add New Task</h1>
          <div>
            <label className="block">Title</label>
            <input
              type="text"
              value={newTask}
              onChange={handleInputChange}
              className="border"
              placeholder="Titel"
              autoFocus
            />
          </div>
          <button className="text-blue-950 bg-blue-400 p-2 rounded-lg">
            Add
          </button>
        </form>
      )}
    </main>
  );
}
