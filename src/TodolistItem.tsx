import {Button} from "./Button.tsx";
import {FilterTaskType, TaskType} from "./types.ts";
import {ChangeEvent, useState} from "react";

type TodolistTaskType = {
    tasks: TaskType[]
    todolistTitle: string
    filterTask: (filter: FilterTaskType) => void
    deleteTask: (taskId: TaskType["id"]) => void
    createTask: (title: TaskType["title"]) => void
    changeTaskStatus: (taskId: TaskType["id"], newTaskStatus: TaskType["isDone"]) => void
}

export const TodolistItem = ({
                                 tasks,
                                 todolistTitle,
                                 deleteTask,
                                 filterTask,
                                 createTask,
                                 changeTaskStatus
                             }: TodolistTaskType) => {

    const [inputValue, setInputValue] = useState("")

    const tasksList = tasks.length === 0 ? "Your taskslist is empty" :
        <ul>
            {tasks.map((t: TaskType) => {
                const deleteTaskHandler = () => {
                    deleteTask(t.id)
                };
                return (

                    <li key={t.id}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={(e) => {changeTaskStatus(t.id, e.target.checked)}}
                        />
                        <span>{t.title}</span>
                        <Button title={"X"} onClick={deleteTaskHandler}/>
                    </li>

                )
            })}
        </ul>

    const buttonOnClickHandler = () => {
        createTask(inputValue);
        setInputValue("")
    }

    const inputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }

    return (
        <div>
            <h3>{todolistTitle}</h3>
            <div>
                <input value={inputValue}
                       onChange={inputOnChangeHandler}
                />
                <Button title={"+"}
                        onClick={buttonOnClickHandler}
                        disabled={inputValue.length === 0 || inputValue.length >= 10}
                />
                {inputValue.length === 0 && <div>Please, enter title max 10 charters</div>}
                {inputValue.length > 10 && <div style={{color: "red"}}>Title is too long</div>}
                {inputValue.length === 0 || inputValue.length <= 10 &&
                    <div>Title length is {inputValue.length} charters</div>}
            </div>
            {tasksList}
            <div>
                <Button title={"All"} onClick={() => filterTask("all")}/>
                <Button title={"Active"} onClick={() => filterTask("active")}/>
                <Button title={"Completed"} onClick={() => filterTask("completed")}/>
            </div>
        </div>
    );
};

