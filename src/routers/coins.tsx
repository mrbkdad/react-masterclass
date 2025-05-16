// import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCoins } from "../api";

//https://api.coinpaprika.com/v1/coins
//https://cryptoicon-api.pages.dev/api/icon/btc  for coin icon
// const coinDB = [
//     {
//         id:"btc-bitcoin",
//         name:"Bitcoin",
//         symbol:"BTC",
//         rank:1,
//         is_new:false,
//         is_active:true,
//         type:"coin"
//     }
// ];
const Container = styled.div`
    padding: 24px 8px;
    margin: 0 auto;
`;
const Title = styled.h1`
    font-size: 40px;
    color: ${props => props.theme.accentColor};
    font-weight: bold;
    display: block;
    text-align: center;
`;
const CoinList = styled.ul`
    margin-top: 24px;
`;
const Coin = styled.li`
    display: flex;
    align-items: center;
    height: 64px;
    width: 480px;
    margin-bottom: 8px;
    border-radius: 20px;
    background-color: white;
    color: ${props => props.theme.bgColor};
    img{
        margin-left: 16px;
        width: 40px;
    }
    a{
        display: block;
        padding: 16px 12px;
    }
`;
const Loading = styled.span`
    display: block;
    text-align: center;
    margin-top: 48px;
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;

interface ICoin{
        id:string,
        name:string,
        symbol:string,
        rank:number,
        is_new:boolean,
        is_active:boolean,
        type:string
};
function Coins(){
    // const [coinData,setCoinData] = useState<ICoin[]>([]);
    // const [isLoding,setLoading] = useState(true);
    // useEffect(()=>{
    //     (async ()=>{
    //         const data = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await data.json();
    //         setCoinData(json.slice(0,10));
    //         setLoading(false);
    //     })();
    // },[])

    const { data: coinData, isLoading } = useQuery<ICoin[]>(
        {
            queryKey: ["coinList"],
            queryFn: getCoins
        }
    );

    return(
    <Container>
        <Title>World Top 10 Coins</Title>
        {
            isLoading ?
            <Loading>Loading.....</Loading> :
            <CoinList>
            {
                coinData?.slice(0,10).map(coin => <Coin key={coin.id}>
                        <img src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}/>
                        <Link 
                            to={`/${coin.id}`}
                            state={{ ...coin }}
                        >{coin.name}({coin.symbol}) {coin.type} &rarr;</Link>
                    </Coin>)
            }
            </CoinList>
        }
    </Container>
    )
}

export default Coins;