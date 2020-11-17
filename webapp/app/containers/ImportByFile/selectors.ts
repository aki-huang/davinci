import { createSelector } from 'reselect'

const selectImportByFile= (state) => {
    console.log('select portal state:', state)
    return state.importByFile
}

// const makeSelectportals = () => createSelector(
const makeSelectPortals = () => createSelector(
    selectImportByFile,
    (importByFile) => importByFile.portals
)

const makeSelectSources = () => createSelector(
    selectImportByFile,
    (importByFile) => importByFile.sources
  )

const makeSelectLoading = () => createSelector(
    selectImportByFile,
    (importByFile) => importByFile.loading
  )
  

export {
    selectImportByFile,
    makeSelectPortals,
    makeSelectSources,
    makeSelectLoading
}
