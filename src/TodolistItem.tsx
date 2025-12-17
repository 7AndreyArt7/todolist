import {Button} from "./Button.tsx";
import {FilterTaskType, TaskType, TodolistType} from "./types.ts";
import {ChangeEvent, useState} from "react";

type TodolistTaskType = {
    todolistId: TodolistType["id"]
    tasks: TaskType[]
    filter: FilterTaskType
    todolistTitle: string
    deleteTodolist: (todolistId: TodolistType['id']) => void
    deleteTask: (taskId: TaskType["id"], todolistId: TodolistType["id"]) => void
    createTask: (title: TaskType["title"], todolistId: TodolistType["id"]) => void
    changeTodolistFilter: (nextFilterValue: FilterTaskType, todolistId: TodolistType['id']) => void
    changeTaskStatus: (taskId: TaskType["id"], newTaskStatus: TaskType["isDone"], todolistId: TodolistType["id"]) => void
}

export const TodolistItem = ({
                                 tasks,
                                 filter,
                                 todolistId,
                                 todolistTitle,
                                 deleteTask,
                                 createTask,
                                 changeTaskStatus,
                                 changeTodolistFilter,
                                 deleteTodolist
                             }: TodolistTaskType) => {

    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState(false)

    const tasksList = tasks.length === 0 ? "Your taskslist is empty" :
        <ul>
            {tasks.map((t: TaskType) => {
                const deleteTaskHandler = () => {
                    deleteTask(t.id, todolistId)
                };
                return (

                    <li key={t.id} className={t.isDone ? "task-done" : "task"}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={(e) => {
                                changeTaskStatus(t.id, e.target.checked, todolistId)
                            }}

                        />
                        <span>{t.title}</span>
                        <Button title={"X"} onClick={deleteTaskHandler}/>
                    </li>

                )
            })}
        </ul>

    const buttonOnClickHandler = () => {
        const trimmedTitle = inputValue.trim()
        if (trimmedTitle) {
            createTask(inputValue, todolistId);
        } else {
            setError(true);
        }
        setInputValue("")
    }

    const inputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        if (event.currentTarget.value.length < 10) {
            setInputValue(event.currentTarget.value);
        }
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }

    return (
        <div>
            <div>
                <h3>{todolistTitle}
                    <Button title={"X"} onClick={deleteTodolistHandler}/>
                </h3>

            </div>

            <div>
                <input value={inputValue}
                       onChange={inputOnChangeHandler}
                       onKeyDown={(e) => {
                           if (e.key === "Enter") {
                               buttonOnClickHandler()
                           }
                       }}
                       className={error ? "input-error" : ""}
                />
                <Button title={"+"}
                        onClick={buttonOnClickHandler}
                        disabled={inputValue.length === 0 || inputValue.length >= 10}
                />
                {inputValue.length === 0 && <div>Please, enter title max 10 charters</div>}
                {inputValue.length > 10 && <div style={{color: "red"}}>Title is too long</div>}
                {inputValue.length === 0 || inputValue.length <= 10 &&
                    <div>Title length is {inputValue.length} charters</div>}
                {error && <div style={{color: "red"}}>Enter valid title</div>}
            </div>
            {tasksList}
            <div>
                <Button title={"All"} onClick={() => changeTodolistFilter("all", todolistId)}
                        className={filter === "all" ? "btn-action" : ""}/>
                <Button title={"Active"}
                        onClick={() => changeTodolistFilter("active", todolistId)}
                        className={filter === "active" ? "btn-action" : ""}/>
                <Button title={"Completed"} onClick={() => changeTodolistFilter("completed", todolistId)}
                        className={filter === "completed" ? "btn-action" : ""}/>
            </div>
        </div>
    );
};

