import { createSelector } from 'reselect'

const selectImportByFile = (state) => state.importByFile

const makeSelectSources = () => createSelector(
  selectImportByFile,
  (importByFile) => importByFile.sources
)

const makeSelectImportSuccess = () => createSelector(
  selectImportByFile,
  (importByFile) => importByFile.importSuccess
)

const makeSelectLoading = () => createSelector(
  selectImportByFile,
  (importByFile) => importByFile.loading
)


export {
  selectImportByFile,
  makeSelectSources,
  makeSelectImportSuccess,
  makeSelectLoading
}
