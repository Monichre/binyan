import * as Contentful from 'contentful'
import _ from 'lodash'
import AppStore from '../Store/AppStore'

export const getCMS = async () => {
  const localDataStore = localStorage.getItem('localDataStore')
    ? JSON.parse(localStorage.getItem('localDataStore'))
    : false

  // if (localDataStore === false) {
    const CMS_CLIENT = Contentful.createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    })

    const employees = await CMS_CLIENT.getAssets().then(response => {
      const { items } = response
      return _.filter(items, item => item.fields.description === 'employee').map(item => (item = { ...item.fields }))
    })

    CMS_CLIENT.getEntries()
      .then(response => {
        const { items } = response
        console.log(items)

        const pages = _.filter(items, item => item.sys.contentType.sys.id.includes('Page')).map(
          item => (item = { ...item.fields })
        )

        const socialMediaLinks = _.filter(items, item => item.sys.contentType.sys.id === 'socialMediaLink').map(
          item => (item = { ...item.fields })
        )

        const cities = _.filter(items, item => item.sys.contentType.sys.id === 'city').map(
          item => (item = { ...item.fields })
        )

        const nav = _.filter(pages, page => page.title !== 'Home').map(page => page.title)
        const sortedNav = []

        nav.forEach(page => {
          if (page === 'About') {
            sortedNav[0] = 'about'
          } else if (page === 'Gallery') {
            sortedNav[1] = 'gallery'
          } else if (page === 'Services') {
            sortedNav[2] = 'disciplines'
          } else if (page === 'Contact') {
            sortedNav[3] = 'contact'
          }
        })

        const projects = _.filter(items, item => item.sys.contentType.sys.id === 'project').map(
          project => (project = { ...project.fields })
        )

        const featuredProjects = _.filter(projects, project => project.featured)

        const press = _.filter(items, item => item.sys.contentType.sys.id === 'pressItem').map(
          pressItem => (pressItem = { ...pressItem.fields })
        )

        const heroImages = _.filter(items, item => item.sys.contentType.sys.id === 'heroImage').map(
          image => {
            image.fields.project = {...image.fields.project.fields }
            return image = { ...image.fields }
          } 
        )

        AppStore.data.siteNav = sortedNav
        AppStore.data.employees = employees
        AppStore.data.socialMediaLinks = socialMediaLinks
        AppStore.data.cities = cities
        AppStore.data.projects = projects
        AppStore.data.featuredProjects = featuredProjects
        AppStore.data.press = press
        AppStore.data.heroImages = heroImages
        AppStore.data.pages = {}
        pages.forEach(page => (AppStore.data.pages[page.title] = page))
        AppStore.data.ready = true

        localStorage.setItem('localDataStore', JSON.stringify(AppStore.data))
        AppStore.emitChange()
      })
      .catch(error => {
        console.log(error)
      })
  // } else {
    AppStore.data = { ...localDataStore }
    AppStore.emitChange()
  // }
}

export const getProjectData = slug => {
  const { projects } = AppStore.data
  const project = _.find(projects, project => project.slug === slug)
  if (project) {
    AppStore.data.currentProject = project
    AppStore.emitChange()
  }
}
