import * as Contentful from 'contentful'
import _ from 'lodash'
import AppStore from '../Store/AppStore'

export const getCMS = () => {
  const localDataStore = localStorage.getItem('localDataStore') ? JSON.parse(localStorage.getItem('localDataStore')) : false

  if(localDataStore === false) {

    const CMS_CLIENT = Contentful.createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    })
  
    CMS_CLIENT.getEntries()
      .then(response => {
        const { items } = response
        console.log(items)
  
        const pages = _.filter(items, item =>
          item.sys.contentType.sys.id.includes('Page')
        ).map(item => (item = { ...item.fields }))
  
        const socialMediaLinks = _.filter(
          items,
          item => item.sys.contentType.sys.id === 'socialMediaLink'
        ).map(item => (item = { ...item.fields }))
  
        const cities = _.filter(
          items,
          item => item.sys.contentType.sys.id === 'city'
        ).map(item => (item = { ...item.fields }))
  
        
        const nav = _.filter(pages, page => page.title !== 'Home').map(
          page => page.title
        )
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
  
        const employees = _.filter(
          items,
          item => item.sys.contentType.sys.id === 'employee'
        ).map(employee => (employee = { ...employee.fields }))
  
        const projects = _.filter(
          items,
          item => item.sys.contentType.sys.id === 'project'
        ).map(project => (project = { ...project.fields }))
  
        const featuredProjects = _.filter(projects, project => project.featured)
  
        const press = _.filter(
          items,
          item => item.sys.contentType.sys.id === 'pressItem'
        ).map(pressItem => (pressItem = { ...pressItem.fields }))
  
        const heroImages = _.filter(
          items,
          item => item.sys.contentType.sys.id === 'heroImage'
        ).map(image => (image = { ...image.fields }))
  
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
  } else {
    AppStore.data = {...localDataStore}
    AppStore.emitChange()
  }
}

export const getProjectData = slug => {
  console.log(slug)
  const { projects } = AppStore.data
  console.log(projects)
  const project = _.find(projects, project => project.slug === slug)
  console.log(project)
  if (project) {
    AppStore.data.currentProject = project
    AppStore.emitChange()
  }
}
