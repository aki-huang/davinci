
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
    exportSuccess: boolean,
    loading: {
        portal: boolean,
    }
}

export interface IExportDto {

}