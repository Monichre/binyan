// AppDispatcher.js
import { Dispatcher } from 'flux'
import { getCMS } from '../Actions/Actions'

const AppDispatcher = new Dispatcher()

AppDispatcher.register(payload => {
  let action = payload.action

  switch (action) {
    case 'get-cms-data':
      getCMS()
      break

    default:
      return true
  }

  return true
})

export default AppDispatcher
