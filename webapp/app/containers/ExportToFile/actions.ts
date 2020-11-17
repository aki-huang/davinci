import { ActionTypes } from './constants'
import { IPortal } from './types'
import { returnType } from 'utils/redux'

export const ExportToFileActions = {

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

  exportReport(projectId: number, exportDto: any) {
    return {
      type: ActionTypes.EXPORT_REPORTS,
      payload: {
        projectId,
        exportDto
      }
    }
  },
  exportReported(result: any) {
    return {
      type: ActionTypes.EXPORT_REPORTS_SUCCESS,
      payload: {
        result
      }
    }
  },
  exportReportFail() {
    return {
      type: ActionTypes.EXPORT_REPORTS_FAILURE,
      payload: {}
    }
  },

}


const mockAction = returnType(ExportToFileActions)
export type ExportToFileType = typeof mockAction

export default ExportToFileActions