import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AppStore from './Flux/Store/AppStore'
import Home from './pages/Home/Home'
import About from './pages/About/index'
import Contact from './pages/Contact/index'
import Gallery from './pages/Gallery/Gallery'
import Projects from './pages/Projects/Projects'
import Project from './pages/Projects/Project'
import Services from './pages/services/index'

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
    path: '/gallery',
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