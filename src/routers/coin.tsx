// import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, Outlet, useParams, useMatch } from "react-router-dom";
import styled from "styled-components";
import { getCoinInfo, getPriceInfo } from "../api";

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
const CoinInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* height: 480px; */
    width: 600px;
    margin-top: 24px;
    border-radius: 20px;
    padding: 12px;
    color: ${props => props.theme.textColor};
    a{
        display: block;
        padding: 16px 12px;
    }
    div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 24px;
    }
    #header, #footer{
        background-color: black;
        opacity: 0.6;
        height: 80px;
        border-radius: 20px;
        color: white;
        font-size: 20px;
        text-transform: uppercase;
        p{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
        }
    }
    #desc{
        font-size: 24px;
        line-height: 1.4;
    }
`;
const Tabs = styled.div`
    display: flex;
    height: 80px;
    width: 600px;
    padding: 12px;
    gap: 4px;
`;
const Tab = styled.span<{isSelected : boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    border-radius: 20px;    
    background-color: black;
    opacity: ${props => props.isSelected ? 0.8 : 0.6};
    font-size: 24px;
    color: ${props => props.isSelected ? props.theme.accentColor : props.theme.textColor};
`;

const Loading = styled.span`
    display: block;
    text-align: center;
    margin-top: 48px;
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;

interface ICoinInfo{
    id:string,
    name:string,
    symbol:string,
    rank:number,
    is_new:boolean,
    is_active:boolean,
    type:string,
    logo:string,
    description:string,
    message:string,
    open_source:boolean,
    started_at:string,
    development_status:string,
    hardware_wallet:boolean,
    proof_type:string,
    org_structure:string,
    hash_algorithm:string,
    first_data_at:string,
    last_data_at:string,
}
interface IPriceInfo{
    id:string
    name:string
    symbol:string
    rank:number
    total_supply:number
    max_supply:number
    beta_value:number
    first_data_at:string
    last_updated:string
    quotes:{
        USD:{
            ath_date:string, 
            ath_price:number, 
            market_cap:number, 
            market_cap_change_24h:number, 
            percent_change_1h:number, 
            percent_change_1y:number, 
            percent_change_6h:number, 
            percent_change_7d:number, 
            percent_change_12h:number, 
            percent_change_15m:number, 
            percent_change_24h:number, 
            percent_change_30d:number, 
            percent_change_30m:number, 
            percent_from_price_ath:number, 
            price:number, 
            volume_24h:number, 
            volume_24h_change_24h:number, 
        }
    }
}


//https://api.coinpaprika.com/v1/coins/:coinId
//https://api.coinpaprika.com/v1/tickers/:coinId
function Coin(){
    const {coinId} = useParams();
    const isPrice = useMatch("/:coinId/price");
    const isChart = useMatch("/:coinId/chart");

    const { data: coinInfo, isLoading: coinLoading } = useQuery<ICoinInfo>(
        {
            queryKey: ["coinInfo", coinId],
            queryFn: () => getCoinInfo(coinId!)
        }
    );

    const { data: priceInfo, isLoading: priceLoading } = useQuery<IPriceInfo>(
        {
            queryKey: ["priceInfo", coinId],
            queryFn: () => getPriceInfo(coinId!)
        }
    );
    const loading = coinLoading || priceLoading;

    // const [coinInfo, setCoinInfo] = useState<ICoinInfo>();
    // const [priceInfo, setPriceInfo] = useState<IPriceInfo>();
    // const [loading, setLoading] = useState(true);
    // useEffect(()=>{
    //     (async ()=>{
    //         const coinJson:ICoinInfo = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    //         const priceJson = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    //         setCoinInfo(coinJson);
    //         setPriceInfo(priceJson);
    //         setLoading(false);
    //     })();
    // },[]);
    return(
    <Container>
        <Title>{coinInfo?.name}</Title>
        {loading? <Loading>Loading......</Loading> : 
        <>
        <CoinInfo>
            <div id="header">
                <p><span>rank:</span><span>{coinInfo?.rank}</span></p>
                <p><span>symbol:</span><span>{coinInfo?.symbol}</span></p>
                <p><span>open source:</span><span>{coinInfo?.open_source ? "Yes" : "No"}</span></p>
            </div>
            <div id="desc"><span>{coinInfo?.description}</span></div>
            <div id="footer">
                <p><span>total suply:</span><span>{priceInfo?.total_supply}</span></p>
                <p><span>max supply:</span><span>{priceInfo?.max_supply}</span></p>
            </div>
        </CoinInfo>
        <Tabs>
            <Tab isSelected={isChart !== null ? true : false}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isSelected={isPrice !== null ? true : false}>
                <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
        </Tabs>
        <Outlet />
        </>
        }
    </Container>
    )
}

export default Coin;