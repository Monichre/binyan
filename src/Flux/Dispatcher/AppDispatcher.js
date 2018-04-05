// AppDispatcher.js
import { Dispatcher } from 'flux'
import { getCMS, getProjectData } from '../Actions/Actions'

const AppDispatcher = new Dispatcher()

AppDispatcher.register(payload => {
  let {action} = payload

  switch (action) {
    case 'get-cms-data':
      getCMS()
      break

    case 'get-project-data':
      getProjectData(payload.projectSlug)
      break

    default:
      return true
  }

  return true
})

export default AppDispatcher
