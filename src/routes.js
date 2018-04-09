import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AppStore from './Flux/Store/AppStore'
import Home from './Containers/Home/Home'
import About from './Containers/About/index'
import Contact from './Containers/Contact/Contact'
import Gallery from './Containers/Gallery/Gallery'
import Projects from './Containers/Projects/Projects'
import Project from './Containers/Projects/Project'
import Services from './Containers/Services/Services'

const _routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    exact: true,
    component: About
  },
  {
    path: '/contact',
    exact: true,
    component: Contact
  },
  {
    path: '/work',
    exact: true,
    component: Gallery
  },
  {
    path: '/disciplines',
    exact: true,
    component: Services
  },
  {
    path: '/projects',
    exact: true,
    component: Projects
  },
  {
    path: '/projects/:project',
    exact: true,
    component: Project
  }
]

const { data } = AppStore
export default (
  <Switch>
    {_routes.map((route, i) => (
      <Route
        exact
        path={route.path}
        render={props => (
          <route.component key={`route${i}`} data={data} {...props} />
        )}
      />
    ))}
  </Switch>
)