import { IImportByFileState } from './types'
import { ImportByFileType } from './actions'

import produce from 'immer'
import { ActionTypes } from './constants'

export const initialState: IImportByFileState = { 
    // portals: [],
    sources: [],
    importSuccess: false,
    loading: {
        // portal: false,
      }
}

const importByFileReducer = (
    state = initialState,
    action: ImportByFileType
) => 
  produce(state, (draft: IImportByFileState) => {
      switch (action.type) {
          // case ActionTypes.LOAD_PORTALS:
          //   //   draft.loading.table = true
          //     break
          // case ActionTypes.LOAD_PORTALS_SUCCESS:
          //     // draft.portals = action.payload.portals
          //   //   draft.loading.table = false
          //     break
          // case ActionTypes.LOAD_PORTALS_FAILURE:
          //     // draft.loading.table = false
          //     break

          case ActionTypes.LOAD_SOURCES:
            //   draft.loading.table = true
              break
          case ActionTypes.LOAD_SOURCES_SUCCESS:
              draft.sources = action.payload.sources
            //   draft.loading.table = false
              break
          case ActionTypes.LOAD_SOURCES_FAILURE:
            //   draft.loading.table = false
              break

        case ActionTypes.IMPORT_REPORT:
              // draft.loading.import = true
              draft.importSuccess = false
              break
        case ActionTypes.IMPORT_REPORT_SUCCESS:
              // draft.loading.import = false
              draft.importSuccess = true
              break
        case ActionTypes.IMPORT_REPORT_FAILURE:
              // draft.loading.import = false
              draft.importSuccess = false
              break
        case ActionTypes.RESET_IMPORT_SUCCESS_STATUS:
              draft.importSuccess = false
      }
  })




export { initialState as importByFileState}
export default importByFileReducer
