import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {FilterTaskType, TaskType} from "./types.ts";
import {useState} from "react";


function App() {
    //BLL
    const todolistTitle: string = "What to learn";

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), title: "HTML&CSS", isDone: true},
        {id: crypto.randomUUID(), title: "JS", isDone: true},
        {id: crypto.randomUUID(), title: "TS", isDone: true},
        {id: crypto.randomUUID(), title: "React", isDone: false}
    ])

    const deleteTask = (taskId: TaskType["id"]) => {
        const newState = tasks.filter((t: TaskType) => t.id !== taskId);
        setTasks(newState);
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
            />

        </div>
    )
}

export default App
