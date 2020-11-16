import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects' 
import { ActionTypes } from './constants'
import { ImportByFileActions, ImportByFileType } from './actions'

import request from 'utils/request'
import api from 'utils/api'
import { errorHandler } from 'utils/util'

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

// todo: modify name
export default function* rootImportByFileSaga() {
    yield all([
        takeLatest(ActionTypes.LOAD_PORTALS, getPortals)
        // takeEvery(ActionTypes.LOAD_PORTALS_SUCCESS, getPortals)
    ])
}