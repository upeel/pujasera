import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingScreen from './components/loadingScreen'
import MainContainer from './components/container'

function Root() {
  return (
    <>
      <MainContainer>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet/>
        </Suspense>
      </MainContainer>
    </>
  )
}

export default Root
