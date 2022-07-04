import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CoinItem from '../components/CoinItem';

const CoinSearch = () => {
  const [query, setQuery] = useState('');
  const [coins, setCoins] = useState([]);

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true';
  useEffect(() => {
    axios.get(url)
      .then(res => {
        setCoins(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <div className='rounded-div my-4'>
      <div className='flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
        <h1 className='text-2xl font-bold my-2'>Search Crypto</h1>
        <form>
          <input
            className='w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl'
            type='text'
            placeholder='Search for a coin'
            onChange={e => setQuery(e.target.value)}
          />
        </form>
      </div>

      <table className='w-full border-collapse text-center'>
        <thead>
          <tr className='border-b'>
            <th></th>
            <th className='px-4'>#</th>
            <th className='text-left'>Coin</th>
            <th></th>
            <th>Price</th>
            <th>24h Change</th>
            <th className='hidden md:table-cell'>24h Volume</th>
            <th className='hidden sm:table-cell'>Market Cap</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {coins.filter((value) => {
            if (query === '') {
              return value
            } else if (value.name.toLowerCase().includes(query.toLowerCase())) {
              return value
            }
          }).map((coin, index) => (
            <CoinItem key={index} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoinSearch