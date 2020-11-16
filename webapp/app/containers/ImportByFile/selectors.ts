import { createSelector } from 'reselect'

const selectPortal = (state) => {
    // console.log('select portal state:', state)
    return state.importByFile
}

// const makeSelectportals = () => createSelector(
const makeSelectPortals = () => createSelector(
    selectPortal,
    (importByFile) => importByFile.portals
)

const makeSelectLoading = () => createSelector(
    selectPortal,
    (importByFile) => importByFile.loading
  )
  

export {
    selectPortal,
    makeSelectPortals,
    makeSelectLoading
}
