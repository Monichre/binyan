import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AppStore from './Flux/Store/AppStore'
import Home from './Containers/Home/Home'
import About from './Containers/About/About'
import Contact from './Containers/Contact/Contact'
import Work from './Containers/Work/Work'
import Press from './Containers/Press/Press'
import PressItem from './Containers/Press/PressItem'
import Projects from './Containers/Projects/Projects'
import Project from './Containers/Projects/Project'

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
    component: Work
  },
  {
    path: '/press',
    exact: true,
    component: Press
  },
  {
    path: '/press/:pressItem',
    exact: true,
    component: PressItem
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