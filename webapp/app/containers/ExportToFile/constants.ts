
import { createTypes } from 'utils/redux'

enum Types {
    LOAD_PORTALS = 'davinci/exportToFile/LOAD_PORTALS',
    LOAD_PORTALS_SUCCESS = 'davinci/exportToFile/LOAD_PORTALS_SUCCESS',
    LOAD_PORTALS_FAILURE = 'davinci/exportToFile/LOAD_PORTALS_FAILURE', 

    EXPORT_REPORTS = 'davinci/exportToFile/EXPORT_REPORTS',
    EXPORT_REPORTS_SUCCESS = 'davinci/exportToFile/EXPORT_REPORTS_SUCCESS',
    EXPORT_REPORTS_FAILURE = 'davinci/exportToFile/EXPORT_REPORTS_FAILURE',
}

export const ActionTypes = createTypes(Types)
