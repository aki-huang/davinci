import { ActionTypes } from './constants'
import { IPortal } from './types'
import { returnType } from 'utils/redux'

export const ImportByFileActions = {
  loadPortals(projectId: number) {
    return {
      type: ActionTypes.LOAD_PORTALS,
      payload: {
        projectId
      }
    }
  },
  portalsLoaded(portals: IPortal[]) {
    return {
      type: ActionTypes.LOAD_PORTALS_SUCCESS,
      payload: {
        portals
      }
    }
  },
  loadPortalsFail() {
    return {
      type: ActionTypes.LOAD_PORTALS_FAILURE,
      payload: {}
    }
  },
}

const mockAction = returnType(ImportByFileActions)
export type ImportByFileType = typeof mockAction

export default ImportByFileActions