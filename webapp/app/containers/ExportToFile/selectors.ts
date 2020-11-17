import { createSelector } from 'reselect'

const selectExportToFile = (state) => {
    console.log('selectExportToFile portal state:', state)
    return state.exportToFile
}

// const makeSelectportals = () => createSelector(
const makeSelectPortals = () => createSelector(
    selectExportToFile,
    (exportToFile) => exportToFile.portals
)

const makeSelectLoading = () => createSelector(
    selectExportToFile,
    (importByFile) => importByFile.loading
  )
  
export {
    selectExportToFile,
    makeSelectPortals,
    makeSelectLoading
}