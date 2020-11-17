import { IExportToFileState } from './types'
import { ExportToFileType } from './actions'

import produce from 'immer'
import { ActionTypes } from './constants'

export const initialState: IExportToFileState = {
    portals: [],
    exportSuccess: false,
    loading: {
        portal: false,
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
                draft.exportSuccess = false
                break
            case ActionTypes.EXPORT_REPORTS_SUCCESS:
                draft.exportSuccess = true
                break
            case ActionTypes.EXPORT_REPORTS_FAILURE:
                draft.exportSuccess = false
                break
            case ActionTypes.RESET_EXPORT_SUCCESS_STATUS:
                draft.exportSuccess = false
        }

    })

export { initialState as ExportToFileState }
export default exportToFileReducer
