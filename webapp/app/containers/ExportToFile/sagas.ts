import { call, put, all, takeEvery, takeLatest, actionChannel } from 'redux-saga/effects' 
import { ActionTypes } from './constants'
import { ExportToFileActions, ExportToFileType } from './actions'

import request from 'utils/request'
import api from 'utils/api'
import { errorHandler } from 'utils/util'
// import { ISourceBase } from './types'


export function* getPortals(action: ExportToFileType) {
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
          yield put(ExportToFileActions.portalsLoaded(portals))
    } catch (err) {
        yield put(ExportToFileActions.loadPortalsFail())
        errorHandler(err)
    }
}

export function* exportReport(action: ExportToFileType) {
    if (action.type !== ActionTypes.EXPORT_REPORTS) {
        return
    }

    const { payload } = action
    try {
        const asynData = yield call(request, {
            method: 'post',
            url: api.ExportToFile + `/${payload.projectId}`,
            data: payload.exportDto
        })
        console.log('asynData exportReport:', asynData)
        yield put(ExportToFileActions.exportReported(asynData.payload))
    } catch (err) {
        yield put(ExportToFileActions.exportReportFail())
        errorHandler(err)
    }

}

export default function* rootExportToFileSaga() {
    yield all([
        takeLatest(ActionTypes.LOAD_PORTALS, getPortals),

        takeEvery(ActionTypes.EXPORT_REPORTS, exportReport),
    ])
}