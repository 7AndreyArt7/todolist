export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterTaskType = "all" | "active" | "completed"