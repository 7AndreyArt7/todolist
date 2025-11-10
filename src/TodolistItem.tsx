import {Button} from "./Button.tsx";
import {TaskType} from "./types.ts";

type TodolistTaskType = {
    tasks: TaskType[]
    todolistTitle: string
}

export const TodolistItem = ({tasks, todolistTitle}: TodolistTaskType) => {

    const tasksList = tasks.length === 0 ? "Your taskslist is empty" :
        <ul>
            {tasks.map((t: TaskType) => {
                return (

                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
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

