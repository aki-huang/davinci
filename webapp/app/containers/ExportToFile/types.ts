
export interface IPortal {
    projectId?: number
    id?: number
    name?: string
    avatar?: string
    publish?: boolean
    description?: string
}

export interface IExportToFileState {
    portals: IPortal[],
    loading: {
        table: boolean,
        portal: boolean,
        // display: boolean,
        // editing: boolean,
        // dashboards: boolean,
        // slides: boolean
    }
}