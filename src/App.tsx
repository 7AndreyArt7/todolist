import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {TaskType} from "./types.ts";
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


    return (
        <div className="app">
            <TodolistItem tasks={tasks} todolistTitle={todolistTitle} deleteTask={deleteTask}/>
        </div>
    )
}

export default App
