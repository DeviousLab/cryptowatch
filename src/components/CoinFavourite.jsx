import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'

import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext'

const CoinFavourite = () => {
  const [coins, setCoins] = useState([])
  
  const { user } = UserAuth()
  
  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (snapshot) => {
      setCoins(snapshot.data()?.watchlist)
    })
  }, [user])

  const coinPath = doc(db, 'users', `${user?.email}`)

  const handleRemove = async (coinid) => {
    try {
      const newCoins = coins.filter(item => item.id !== coinid)
      await updateDoc(coinPath, {
        watchlist: newCoins
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      {coins.length === 0 ? (
        <p>
          You don't have any coins saved. <Link className='text-accent' to='/'>Add some coins now!</Link>
        </p>
      ) : (
        <table className='w-full border-collapse text-center'>
          <thead>
            <tr className='border-b'>
              <th className='px-4'>Rank #</th>
              <th className='text-left'>Coin</th>
              <th className='text-left'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins?.map((coin) => (
              <tr key={coin.id} className='h-[60px] overflow-hidden'>
                <td>{coin?.rank}</td>
                <td>
                  <Link to={`/coin/${coin.id}`}>
                    <div className='flex items-center'>
                      <img src={coin?.image} className='w-8 mr-4' alt='/' />
                      <div>
                        <p className='hidden sm:table-cell'>{coin?.name}</p>
                        <p className='text-gray-500 text-left text-sm'>
                          {coin?.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className='pl-8'>
                  <AiOutlineClose
                    className='cursor-pointer'
                    onClick={() => handleRemove(coin.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default CoinFavourite