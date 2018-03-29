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

      const pages = _.filter(items, (item) => item.sys.contentType.sys.id.includes('Page'))
        .map((item) => item = { ...item.fields })
      
      const nav = _.filter(pages, (page) => page.title !== 'Home')
        .map((page) => page.title)

      const employees = _.filter(items, item => item.sys.contentType.sys.id === 'employee')
        .map((employee) => employee = {... employee.fields})

      const projects = _.filter(items, item => item.sys.contentType.sys.id === 'project')
        .map((project) => project = {... project.fields})

      const press = _.filter(items, item => item.sys.contentType.sys.id === 'pressItem')
        .map((pressItem) => pressItem = {... pressItem.fields})

      const heroImages = _.filter(items, item => item.sys.contentType.sys.id === 'heroImage')
        .map((image) => image = {... image.fields})

      console.log(pages)
      console.log(nav)
      console.log(employees)
      console.log(projects)
      console.log(press)
      console.log(heroImages)
      
      AppStore.data.siteNav = nav
      AppStore.data.employees = employees
      AppStore.data.projects = projects
      AppStore.data.press = press
      AppStore.data.heroImages = heroImages
      AppStore.data.pages = {}
      pages.forEach(page => (AppStore.data.pages[page.title] = page))
      AppStore.data.ready = true

      AppStore.emitChange()
      
    })
    .catch((error) => {
      console.log(error)
    })
}

