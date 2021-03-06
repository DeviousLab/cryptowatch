import React, { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

import { UserAuth } from '../context/AuthContext';

const CoinItem = ({ coin }) => {
  const [favourite, setFavourite] = useState(false);
  
  const { user } = UserAuth();

  const coinPath = doc(db, 'users', `${user?.email}`)  
  const handleFavourite = async () => {
    if (user?.email) {
      setFavourite(true);
      await updateDoc(coinPath, {
        watchlist: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        }),
      })
    } else {
      alert('Please sign in to add to your watchlist');
    }
  }

  return (
    <tr className='h-[80px] border-b overflow-hidden'>
      <td onClick={handleFavourite}>
        {favourite ? (
          <AiFillStar size={20} className='text-accent' />
        ) : (
          <AiOutlineStar size={20} />
        )}
      </td>
      <td>
        {coin.market_cap_rank}
      </td>
      <td>
        <Link to={`coin/${coin.id}`}>
        <div className='flex items-center'>
          <img className='w-6 mr-2 rounded-full' src={coin.image} alt={coin.name} />
          <p className='hidden sm:table-cell'>{coin.name}</p>
        </div>
        </Link>
      </td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>{coin.current_price.toLocaleString(undefined, { style: "currency", currency: "USD" })}</td>
      <td>
        {coin.price_change_percentage_24h > 0 ?
          (
            <p className='text-green-600'>+{coin.price_change_percentage_24h.toFixed(2)}%</p>
          ) :
          (
            <p className='text-red-600'>{coin.price_change_percentage_24h.toFixed(2)}%</p>
          )}
      </td>
      <td className='w-[180px] hidden md:table-cell'>{coin.total_volume.toLocaleString(undefined, { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
      <td className='w-[180px] hidden sm:table-cell'>{coin.market_cap.toLocaleString(undefined, { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color='' />
          <SparklinesReferenceLine type="avg" />
        </Sparklines>
      </td>
    </tr>
  )
}

export default CoinItem