
export type SourceType = 'csv' | 'jdbc'

export interface IPortal {
    projectId?: number
    id?: number
    name?: string
    avatar?: string
    publish?: boolean
    description?: string
}

export interface IImportByFileState {
    // portals: IPortal[],
    sources: ISourceBase[],
    importSuccess: boolean,
    loading: {
        // import: boolean,
        // portal: boolean,
    }
}

export interface ISourceSimple {
    id: number
    name: string
  }
  
  export interface ISourceBase extends ISourceSimple {
    type: SourceType
    description: string
    projectId: number
  }