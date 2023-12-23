type ProjectIssues = {
    [key: string]: {
        id: string
        summary: string
        status: string
        subtasks: string[]
        parent?: string
    }
}