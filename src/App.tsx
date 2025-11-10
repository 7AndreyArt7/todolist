import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {TaskType} from "./types.ts";




const tasks: TaskType[] = [
    {id: crypto.randomUUID(), title: "HTML&CSS", isDone: true},
    {id: crypto.randomUUID(), title: "JS", isDone: true},
    {id: crypto.randomUUID(), title: "React", isDone: false}
]

function App() {

    const todolistTitle: string= "What to learn";

    return (
        <div className="app">
            <TodolistItem tasks={tasks} todolistTitle={todolistTitle} />
        </div>
    )
}

export default App
