import React from 'react'

import CoinSearch from '../components/CoinSearch'
import CoinsTrending from '../components/CoinsTrending'

const Home = () => {
  return (
    <div>
      <CoinSearch/>
      <CoinsTrending/>
    </div>
  )
}

export default Home