import { ActionTypes } from './constants'
import { IPortal, ISourceBase } from './types'
import { returnType } from 'utils/redux'

export const ImportByFileActions = {
  // loadPortals(projectId: number) {
  //   return {
  //     type: ActionTypes.LOAD_PORTALS,
  //     payload: {
  //       projectId
  //     }
  //   }
  // },
  // portalsLoaded(portals: IPortal[]) {
  //   return {
  //     type: ActionTypes.LOAD_PORTALS_SUCCESS,
  //     payload: {
  //       portals
  //     }
  //   }
  // },
  // loadPortalsFail() {
  //   return {
  //     type: ActionTypes.LOAD_PORTALS_FAILURE,
  //     payload: {}
  //   }
  // },

  loadSources(projectId: number) {
    return {
      type: ActionTypes.LOAD_SOURCES,
      payload: {
        projectId
      }
    }
  },
  sourcesLoaded(sources: ISourceBase[]) {
    return {
      type: ActionTypes.LOAD_SOURCES_SUCCESS,
      payload: {
        sources
      }
    }
  },
  loadSourcesFail() {
    return {
      type: ActionTypes.LOAD_SOURCES_FAILURE
    }
  },

  resetImportSuccessStatus() {
    return {
      type: ActionTypes.RESET_IMPORT_SUCCESS_STATUS
    }
  },

  importReport(projectId: number, importDto: any) {
    return {
      type: ActionTypes.IMPORT_REPORT,
      payload: {
        projectId,
        importDto
      }
    }
  },
  importReported(result: any) {
    return {
      type: ActionTypes.IMPORT_REPORT_SUCCESS,
      payload: {
        result
      }
    }
  },
  importReportFail() {
    return {
      type: ActionTypes.IMPORT_REPORT_FAILURE,
      payload: {}
    }
  }
}

const mockAction = returnType(ImportByFileActions)
export type ImportByFileType = typeof mockAction

export default ImportByFileActions