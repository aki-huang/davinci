import { createSelector } from 'reselect'

const selectExportToFile = (state) => state.exportToFile

// const makeSelectportals = () => createSelector(
const makeSelectPortals = () => createSelector(
    selectExportToFile,
    (exportToFile) => exportToFile.portals
)

const makeSelectExportSuccess = () => createSelector(
    selectExportToFile,
    (exportToFile) => exportToFile.exportSuccess
)

const makeSelectLoading = () => createSelector(
    selectExportToFile,
    (importByFile) => importByFile.loading
  )
  
export {
    selectExportToFile,
    makeSelectExportSuccess,
    makeSelectPortals,
    makeSelectLoading
}