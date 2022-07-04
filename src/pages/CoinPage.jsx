import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from 'react-icons/fa';
import DOMPurify from 'dompurify';

import Spinner from '../components/Spinner';

const CoinPage = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);

  const url = 'https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&sparkline=true';
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url);
      setCoin(res.data);
      setLoading(false);
    }
    fetchData()
    .catch(err => {
      console.log(err);
    })
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='rounded-div my-12 py-8'>
      <div className='flex py-8'>
        <img className='w-20 mr-8' src={coin.image?.large} alt='/' />
        <div>
          <p className='text-3xl font-bold'>{coin?.name} price</p>
          <p>({coin.symbol?.toUpperCase()} / USD)</p>
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-8'>
        <div>
          <div className='flex justify-between'>
            {coin.market_data?.current_price ? (
              <p className='text-3xl font-bold'>{coin.market_data.current_price.usd.toLocaleString(undefined, { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            ) : null}
            <p>7 Day</p>
          </div>
          <div>
            <Sparklines data={coin.market_data?.sparkline_7d.price}>
              <SparklinesLine color='' />
              <SparklinesReferenceLine type="avg" />
            </Sparklines>
          </div>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Market Cap</p>
              {coin.market_data?.market_cap ? (
                <p>{coin.market_data.market_cap.usd.toLocaleString(undefined, { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
              ) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Volume (24h)</p>
              {coin.market_data?.market_cap ? (
                <p>{coin.market_data.total_volume.usd.toLocaleString(undefined, { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
              ) : null}
            </div>
          </div>

          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>24h High</p>
              {coin.market_data?.high_24h ? (
                <p>{coin.market_data.high_24h.usd.toLocaleString(undefined, { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
              ) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>24h Low</p>
              {coin.market_data?.low_24h ? (
                <p>{coin.market_data.low_24h.usd.toLocaleString(undefined, { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <p className='text-xl font-bold'>Market Stats</p>
          <div className='flex justify-evenly py-4 text-center'>
            <div>
              <p className='text-gray-500 text-sm'>Market Rank</p>
              {coin.market_cap_rank}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Hashing Algorithm</p>
              {coin.hashing_algorithm ? <p>{coin.hashing_algorithm}</p> : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Trust Score</p>
              {coin.tickers ? <p>{coin.liquidity_score.toFixed(2)}</p> : null}
            </div>
          </div>

          <div className='flex justify-evenly py-4 text-center'>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (24h)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_24h > 0 ?
                    (
                      <span className='text-green-600'>+{coin.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                    ) :
                    (
                      <span className='text-red-600'>{coin.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                    )}
                </p>
              ) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (7d)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_7d > 0 ?
                    (
                      <span className='text-green-600'>+{coin.market_data.price_change_percentage_7d.toFixed(2)}%</span>
                    ) :
                    (
                      <span className='text-red-600'>{coin.market_data.price_change_percentage_7d.toFixed(2)}%</span>
                    )}
                </p>
              ) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (14d)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_14d > 0 ?
                    (
                      <span className='text-green-600'>+{coin.market_data.price_change_percentage_14d.toFixed(2)}%</span>
                    ) :
                    (
                      <span className='text-red-600'>{coin.market_data.price_change_percentage_14d.toFixed(2)}%</span>
                    )}
                </p>
              ) : null}
            </div>
          </div>
          <div className='flex justify-evenly py-4 text-center'>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (30d)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_30d > 0 ?
                    (
                      <span className='text-green-600'>+{coin.market_data.price_change_percentage_30d.toFixed(2)}%</span>
                    ) :
                    (
                      <span className='text-red-600'>{coin.market_data.price_change_percentage_30d.toFixed(2)}%</span>
                    )}
                </p>
              ) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (60d)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_60d > 0 ?
                    (
                      <span className='text-green-600'>+{coin.market_data.price_change_percentage_60d.toFixed(2)}%</span>
                    ) :
                    (
                      <span className='text-red-600'>{coin.market_data.price_change_percentage_60d.toFixed(2)}%</span>
                    )}
                </p>
              ) : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (1y)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_1y > 0 ?
                    (
                      <span className='text-green-600'>+{coin.market_data.price_change_percentage_1y.toFixed(2)}%</span>
                    ) :
                    (
                      <span className='text-red-600'>{coin.market_data.price_change_percentage_1y.toFixed(2)}%</span>
                    )}
                </p>
              ) : null}
            </div>
          </div>
          <div className='flex justify-around p-8 text-accent'>
            <a href={`https://twitter.com/${coin.links.twitter_screen_name}`} target="_blank" rel='noreferrer'><FaTwitter size={25} /></a>
            <a href={`https://facebook.com/${coin.links.facebook_username}`} target="_blank" rel='noreferrer'><FaFacebook size={25}/></a>
            <a href={`https://twitter.com/${coin.links.subreddit_url}`} target="_blank" rel='noreferrer'><FaReddit size={25}/></a>
            <a href={`${coin.links.repos_url.github[0]}`} target="_blank" rel='noreferrer'><FaGithub size={25}/></a>
          </div>
        </div>
      </div>

      <div className='py-4'>
        <p className='text-xl font-bold'>About {coin.name}</p>
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(coin.description.en ? coin.description.en : '')}}></p>
      </div>
    </div>
  );
}

export default CoinPage