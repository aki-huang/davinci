import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects' 
import { ActionTypes } from './constants'
import { ImportByFileActions, ImportByFileType } from './actions'

import request from 'utils/request'
import api from 'utils/api'
import { errorHandler } from 'utils/util'
import { ISourceBase } from './types'

export function* getPortals(action: ImportByFileType) {
    if (action.type !== ActionTypes.LOAD_PORTALS) {
        return 
    }

    const { payload } = action

    try {
        console.log('getPortals +++++++++++++');
        const asyncData = yield call(
            request,
            `${api.portal}?projectId=${payload.projectId}`
          )
          const portals = asyncData.payload
        console.log('getPortals +++++++++++++:', portals);
          yield put(ImportByFileActions.portalsLoaded(portals))
    } catch (err) {
        yield put(ImportByFileActions.loadPortalsFail())
        errorHandler(err)
    }

}

export function* getSources(action: ImportByFileType) {
  if (action.type !== ActionTypes.LOAD_SOURCES) {
    return
  }
  const { payload } = action
  try {
    const asyncData = yield call(
      request,
      `${api.source}?projectId=${payload.projectId}`
    )
    const sources = asyncData.payload as ISourceBase[]
    console.log('sources asyncData:', sources)
    yield put(ImportByFileActions.sourcesLoaded(sources))
  } catch (err) {
    yield put(ImportByFileActions.loadSourcesFail())
    errorHandler(err)
  }
}


export function* importReport(action: any) {
    if (action.type !== ActionTypes.IMPORT_REPORT) {
      return
    }
    const { payload } = action
    console.log('importReport payload:', payload)
    try {
      const asyncData = yield call(request, {
        method: 'post',
        url: api.importByFile + `/${payload.projectId}`,
        data: payload.importDto
      })
      // payload.resolve()
      console.log('asyncData:', asyncData)
      yield put(ImportByFileActions.importReported(asyncData.payload))
    } catch (err) {
      yield put(ImportByFileActions.importReportFail())
      errorHandler(err)
    }
  }

export default function* rootImportByFileSaga() {
    yield all([
        takeLatest(ActionTypes.LOAD_PORTALS, getPortals),
        takeEvery(ActionTypes.IMPORT_REPORT, importReport),

        takeLatest(ActionTypes.LOAD_SOURCES, getSources),
    ])
}