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
        {id: todolistId_1, filter: "all", title: "What to learn"},
        {id: todolistId_2, filter: "all", title: "What to buy"}
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "TS", isDone: true},
            {id: crypto.randomUUID(), title: "React", isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
        ]
    });


    const deleteTask = (taskId: TaskType["id"], todolistId: TodolistType["id"]) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((t: TaskType) => t.id !== taskId)});
    }

    const createTask = (title: TaskType["title"], todolistId: TodolistType["id"]) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({
            ...tasks, [todolistId]: [...tasks[todolistId], newTask]
        });
    }

    const changeTaskStatus = (taskId: TaskType["id"],
                              newTaskStatus: TaskType["isDone"],
                              todolistId: TodolistType["id"]) => {

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((t: TaskType) => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
        })
    }


    const changeTodolistFilter = (nextFilterValue: FilterTaskType, todolistId: TodolistType['id']) => {
        const nextState: TodolistType[] = todolists.map(tl => tl.id === todolistId ? {
            ...tl,
            filter: nextFilterValue
        } : tl)
        setTodolist(nextState)
    }

    const deleteTodolist = (todolistId: TodolistType['id']) => {
        const newState = todolists.filter(tl => tl.id !== todolistId)
        setTodolist(newState)

        const copyTaskState = {...tasks}
        delete copyTaskState[todolistId];
        setTasks(copyTaskState);
    }

    //GUI

    const todolistComponents = todolists.map(tl => {

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
            <TodolistItem
                key={tl.id}
                todolistId={tl.id}
                filter={tl.filter}
                tasks={getFilterTaskHandler(tasks[tl.id], tl.filter)}
                todolistTitle={tl.title}
                deleteTask={deleteTask}
                createTask={createTask}
                deleteTodolist={deleteTodolist}
                changeTaskStatus={changeTaskStatus}
                changeTodolistFilter={changeTodolistFilter}
            />)
    })




    return (
        <div className="app">
            {todolistComponents}
        </div>
    )
}

export default App
