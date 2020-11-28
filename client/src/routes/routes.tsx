import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage/AuthPage'
import { TodosPage } from '../pages/TodosPage/TodosPage'
import { TApp } from '../redux/reducers/rootReducer'

export const useRoutes = () => {
	const { token } = useSelector((state: TApp) => state.auth)
	const isAuthed = !!token

  if (!isAuthed) {
    return (
      <Switch>
        <Route exact path="/" component={AuthPage} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path="/" component={TodosPage} />
      <Redirect to="/" />
    </Switch>
  )
}
