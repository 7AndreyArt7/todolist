import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {FilterTaskType, TasksStateType, TaskType, TodolistType} from "./types.ts";
import {useState} from "react";
import {v1} from "uuid"


function App() {
    //BLL
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolist] = useState<TodolistType[]>([
        {id: todolistId_1, filter: "all", title: "What to learn" },
        {id: todolistId_2, filter: "all", title: "What to buy" }
    ]);

    const [tasks, setTasks]=useState<TasksStateType>({
            [todolistId_1]:[
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "TS", isDone: true},
                {id: crypto.randomUUID(), title: "React", isDone: false}
            ],
                [todolistId_2]:[
                {id: v1(), title: "Meat", isDone: true},
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Bread", isDone: false},
            ]
        });



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
