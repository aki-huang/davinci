import { IImportByFileState } from './types'
import { ImportByFileType } from './actions'

import produce from 'immer'
import { ActionTypes } from './constants'

export const initialState: IImportByFileState = { 
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

const importByFileReducer = (
    state = initialState,
    action: ImportByFileType
) => 
  produce(state, (draft: IImportByFileState) => {
      switch (action.type) {
          case ActionTypes.LOAD_PORTALS:
              draft.loading.table = true
              break
          case ActionTypes.LOAD_PORTALS_SUCCESS:
              draft.portals = action.payload.portals
              draft.loading.table = false
              break
        //   case ActionTypes.LOAD_PORTALS_FAILURE:
        //       draft.loading.table = false
        //       break
      }
  })




export { initialState as importByFileState}
export default importByFileReducer
