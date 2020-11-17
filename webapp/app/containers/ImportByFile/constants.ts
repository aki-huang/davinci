
import { createTypes } from 'utils/redux'

enum Types {
    LOAD_PORTALS = 'davinci/importByFile/LOAD_PORTALS',
    LOAD_PORTALS_SUCCESS = 'davinci/importByFile/LOAD_PORTALS_SUCCESS',
    LOAD_PORTALS_FAILURE = 'davinci/importByFile/LOAD_PORTALS_FAILURE',

    LOAD_SOURCES = 'davinci/importByFile/LOAD_SOURCES',
    LOAD_SOURCES_SUCCESS = 'davinci/importByFile/LOAD_SOURCES_SUCCESS',
    LOAD_SOURCES_FAILURE = 'davinci/importByFile/LOAD_SOURCES_FAILURE',

    IMPORT_REPORT = 'davinci/importByFile/IMPORT_REPORT',
    IMPORT_REPORT_SUCCESS = 'davinci/importByFile/IMPORT_REPORT_SUCCESS',
    IMPORT_REPORT_FAILURE = 'davinci/importByFile/IMPORT_REPORT_FAILURE',

    RESET_IMPORT_SUCCESS_STATUS = 'davinci/importByFile/RESET_IMPORT_SUCCESS_STATUS',
}

// export { DashboardTypes } from 'app/containers/Dashboard/constants'

export const ActionTypes = createTypes(Types)
