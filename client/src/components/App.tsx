import React from 'react'
import { useSelector } from 'react-redux'
import { TApp } from '../redux/reducers/rootReducer'
import { useRoutes } from '../routes/routes'
import { Loader } from './Loader/Loader'
import './App.scss'

const App: React.FC = () => {
  const routes = useRoutes()
  const { isLoading } = useSelector((state: TApp) => state.loader)

  return (
    <>
      <div className="wrapper">
        <main className="page">
          <section className="page__sc">
            <div className="sc__container _container">
              <div className="sc__body">{routes}</div>
            </div>
          </section>
        </main>
      </div>
      {isLoading && <Loader />}
    </>
  )
}

export default App
