
import { createTypes } from 'utils/redux'

enum Types {
    LOAD_PORTALS = 'davinci/importByFile/LOAD_PORTALS',
    LOAD_PORTALS_SUCCESS = 'davinci/importByFile/LOAD_PORTALS_SUCCESS',
    LOAD_PORTALS_FAILURE = 'davinci/importByFile/LOAD_PORTALS_FAILURE',
}

// export { DashboardTypes } from 'app/containers/Dashboard/constants'

export const ActionTypes = createTypes(Types)
