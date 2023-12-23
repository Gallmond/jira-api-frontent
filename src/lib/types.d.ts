type ProjectIssue = {
    id: string
    key: string
    summary: string
    status: string
    subtasks: string[]
    parent?: string,
    updatedAt: number
}

type ProjectIssues = {
    [key: string]: ProjectIssue
}