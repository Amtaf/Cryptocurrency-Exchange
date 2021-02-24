import React,{useEffect,useState} from 'react';
import './App.css';

import axios from "axios";
import Coin from './coin';


function App() {
  const[coins,setCoins]=useState([]);
  const[search,setSearch]=useState('');
  
  useEffect(()=>{
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then(response=>{
      setCoins(response.data)
      console.log(response.data)
    })
    .catch(error=>alert("error"))

    
  },[]);
  
  const handleSearch=(e)=>{
    setSearch(e.target.value)
}

  const filteredCoins=coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )
    
  
  return (
    <div>
        
       
          <div className="coin-app">
            <div className="coin-search">
              <h1 className="coin-text" >Search A Currency</h1>
              <form>
                <input type="text" placeholder="search" className="coin-input" onChange={handleSearch}/>
              </form>
             <tr className="table-head"><th colSpan="2">Name</th> 
             <th colSpan="2">Symbol</th>
             <th colSpan="2">Price</th>
             <th colSpan="2">Volume</th>
             <th colSpan="2">Price Change</th>
             <th colSpan="2">Market Cap</th>
             </tr>
              
              {filteredCoins.map(coin=>{return <Coin key={coin.id}
               name={coin.name}
                image={coin.image}
                 symbol={coin.symbol}
                  price={coin.current_price}
                   volume={coin.total_volume} 
                   priceChange={coin.price_change_percentage_24h} 
                   marketcap={coin.market_cap}/>})}
                
            </div>
      
          </div>
      </div>
    );
  }
  



export default App;