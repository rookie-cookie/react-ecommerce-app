import React from 'react'

import Directory from '../../components/directory/directory.component'

// import './homepage.styles.scss'  -- replaced with styled-components (CSS in JS)
import { HomePageContainer } from './homepage.styles'

const HomePage = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
)


export default HomePage;
