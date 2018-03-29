import * as Contentful from 'contentful'
import _ from 'lodash'
import AppStore from '../Store/AppStore'

export const getCMS = () => {
  const CMS_CLIENT = Contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN
  })

  CMS_CLIENT.getEntries()
    .then((response) => {
      const {items} = response
      console.log(items)

      // AppStore.data.ready = true
      // AppStore.emitChange()
      

    })
    .catch((error) => {
      console.log(error)
    })
}

