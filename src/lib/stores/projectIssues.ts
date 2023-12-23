import { writable } from "svelte/store";

const initialData: ProjectIssues = {
    'GC-1000': {
        id: 'this-is-an-id-1',
        status: 'TO DO',
        summary: 'design cool dash',
        subtasks: ['GC-2000', 'GC-2001']
    },
    'GC-2000': {
        id: 'this-is-an-id-2',
        status: 'DONE',
        summary: 'get header image',
        subtasks: [],
        parent: 'GC-1000'
    },
    'GC-2001': {
        id: 'this-is-an-id-3',
        status: 'TO DO',
        summary: 'get title text',
        subtasks: [],
        parent: 'GC-1000'
    },
}

const projectIssues = writable<ProjectIssues>(initialData)

export default projectIssues