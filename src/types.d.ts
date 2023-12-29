type AccessibleResource = {
    id: string
    url: string
    name: string
    scopes: string[]
    avatarUrl: string
}

type ImgSizeKey =  "48x48" | "24x24" | "16x16" | "32x32"

type User = {
    self: string
    accountId: string
    emailAddress: string
    avatarUrls: Record<ImgSizeKey, string>
    displayName: string
    active: boolean
    timeZone: string
    accountType: string
}

type Status = {
    self: string
    description: string
    iconUrl: string
    name: string
    id: string
    statusCategory: {
        self: string
        id: number
        key: string
        colorName: string
        name: string
    }
}

type Priority = {
    self: string
    iconUrl: string
    name: string
    id: string
}

type IssueType  = {
    self: string
    id: string
    description: string
    iconUrl: string
    name: string
    subtask: boolean
    avatarId: number
    entityId: string
    hierarchyLevel: number
}

type IssueSearch = {
    expand: string
    startAt: number
    maxResults: number
    total: number
    issues: {
        expand: string
        id: string
        self: string
        key: string
        fields: {
            issuetype: IssueType
            parent: {
                id: string
                key: string
                self: string
                fields: {
                    summary: string
                    status: Status
                    priority: Priority
                    issuetype: IssueType
                }
            }
        }
        project: {
            self: string
            id: string
            key: string
            name: string
            projectTypeKey: string
            simplified: boolean
            avatarUrls: Record<ImgSizeKey, string>
        }
        lastViewed: string
        watches: {
            self: string
            watchCount: number
            isWatching: boolean
        }
        created: string
        priority: Priority
        assignee: User
        updated: string
        status: Status
        components: any[] // TODO FILL THIS IN
        description: AtlassianDoc
        summary: string
        creator: User
        subtasks: {
            id: string
            key: string
            self: string
            fields: {
                summary: string
                status: Status
                priority: Priority
                issuetype: IssueType
            }
        }[]
        reporter: User
    }[]
}

type ProjectSearch = {
    self: string
    maxResults: number
    startAt: number
    total: number
    isLast: boolean
    values: {
        expand: string
        self: string
        id: string
        key: string
        description: string
        name: string
        avatarUrls: Record<ImgSizeKey, string>
        projectKeys: string[]
        projectTypeKey: string
        simplified: boolean
        style: string
        isPrivate: boolean
        properties: Record<string, any>
        entityId: string
        uuid: string
    }[]
}

type ClientUserState = {
    loggedIn: boolean
}

type User = {
    self: string
    accountId: string
    accountType: string
    emailAddress: string
    avatarUrls: Record<ImgSizeKey, string>
    displayName: string
    active: boolean
    timeZone: string
    locale: string
    groups: {size: number, items: any[]} //TODO what are these
    applicationRoles: {size: number, items: any[]} //TODO what are these
    expand: string
}