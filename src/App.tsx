import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {FilterTaskType, TaskType} from "./types.ts";
import {useState} from "react";
import {v1} from "uuid"


function App() {
    //BLL
    const todolistTitle: string = "What to learn";

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "TS", isDone: true},
        {id: crypto.randomUUID(), title: "React", isDone: false}
    ])

    const deleteTask = (taskId: TaskType["id"]) => {
        const newState = tasks.filter((t: TaskType) => t.id !== taskId);
        setTasks(newState);
    }

    const createTask = (title: TaskType["title"]) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([...tasks, newTask]);
    }

    const changeTaskStatus = (taskId: TaskType["id"], newTaskStatus: TaskType["isDone"]) => {
        const nextState = tasks.map((t: TaskType) => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
        setTasks(nextState)
    }

    //GUI
    const [filter, setFilter] = useState<FilterTaskType>("all");

    const filterTask = (filter: FilterTaskType) => {
        setFilter(filter);
    }


    const getFilterTaskHandler = (tasks: TaskType[], filter: FilterTaskType): TaskType[] => {

        switch (filter) {
            case "all":
                return tasks;
            case "active":
                return tasks.filter((t: TaskType) => !t.isDone)
            case "completed":
                return tasks.filter((t: TaskType) => t.isDone)
            default:
                return tasks
        }
    }

    return (
        <div className="app">
            <TodolistItem
                tasks={getFilterTaskHandler(tasks, filter)}
                todolistTitle={todolistTitle}
                deleteTask={deleteTask}
                filterTask={filterTask}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />

        </div>
    )
}

export default App
