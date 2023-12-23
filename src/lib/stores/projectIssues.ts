import { writable } from "svelte/store";

const now = (): number => new Date().valueOf()

const initialData: ProjectIssues = {
    'GC-1000': {
        id: 'this-is-an-id-1',
        status: 'TO DO',
        summary: 'design cool dash',
        subtasks: ['GC-2000', 'GC-2001'],
        updatedAt: now(),
    },
    'GC-2000': {
        id: 'this-is-an-id-2',
        status: 'DONE',
        summary: 'get header image',
        subtasks: [],
        updatedAt: now(),
        parent: 'GC-1000'
    },
    'GC-2001': {
        id: 'this-is-an-id-3',
        status: 'TO DO',
        summary: 'get title text',
        subtasks: [],
        updatedAt: now(),
        parent: 'GC-1000'
    },
}

const projectIssues = writable<ProjectIssues>(initialData)

export default projectIssues