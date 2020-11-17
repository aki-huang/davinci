import { IExportToFileState } from './types'
import { ExportToFileType } from './actions'

import produce from 'immer'
import { ActionTypes } from './constants'

export const initialState: IExportToFileState = {
    portals: [],
    loading: {
        table: false,
        portal: false,
        // display: false,
        // editing: false,
        // dashboards: false,
        // slides: false
    }
}

const exportToFileReducer = (
    state = initialState,
    action: ExportToFileType
) =>
    produce(state, (draft: IExportToFileState) => {
        switch (action.type) {
            case ActionTypes.LOAD_PORTALS:
                //   draft.loading.table = true
                break
            case ActionTypes.LOAD_PORTALS_SUCCESS:
                draft.portals = action.payload.portals
                //   draft.loading.table = false
                break
            case ActionTypes.LOAD_PORTALS_FAILURE:
                //   draft.loading.table = false
                break
            case ActionTypes.EXPORT_REPORTS:
                break
            case ActionTypes.EXPORT_REPORTS_SUCCESS:
                // draft.
                break
            case ActionTypes.EXPORT_REPORTS_FAILURE:
                break
        }

    })

export { initialState as ExportToFileState }
export default exportToFileReducer
