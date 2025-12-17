export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterTaskType = "all" | "active" | "completed"


export type TodolistType = {
    id: string
    title: string
    filter: FilterTaskType
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}
