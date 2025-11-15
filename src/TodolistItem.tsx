import {Button} from "./Button.tsx";
import {TaskType} from "./types.ts";

type TodolistTaskType = {
    tasks: TaskType[]
    todolistTitle: string
    deleteTask: (taskId: TaskType["id"]) => void
}

export const TodolistItem = ({tasks, todolistTitle, deleteTask}: TodolistTaskType) => {

    const tasksList = tasks.length === 0 ? "Your taskslist is empty" :
        <ul>
            {tasks.map((t: TaskType) => {
                const deleteTaskHandler = () => {
                    deleteTask(t.id)
                };
                return (

                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <Button title={"X"} onClick={deleteTaskHandler}/>
                    </li>

                )
            })}
        </ul>

    return (
        <div>
            <h3>{todolistTitle}</h3>
            <div>
                <input/>
                <Button title={"+"}/>
            </div>
            {tasksList}
            <div>
                <Button title={"All"}/>
                <Button title={"Active"}/>
                <Button title={"Completed"}/>
            </div>
        </div>
    );
};

