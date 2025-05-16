import { useQuery } from "react-query";
import styled from "styled-components";
import { getPriceInfo } from "../api";
import { useParams } from "react-router-dom";

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 4px;
`;
const Loading = styled.span`
    display: block;
    text-align: center;
    margin-top: 48px;
    font-size: 24px;
    color: ${props => props.theme.accentColor};
`;
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    div{
        height: 24px;
        flex-wrap: 1;
        display: flex;
        font-size: 18px;
        gap: 4px;
        padding-left: 100px;
    }
`
const InfoTitle = styled.span`
    text-transform: capitalize;
    width: 120px;
    height: 36px;
    display: flex;
    align-items: center;
    border-radius: 4px;
`;
const InfoValue = styled.span`
    width: 300px;
    height: 40px;
    display: flex;
    align-items: center;    
`;

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

function Price(){
    const {coinId} = useParams();
    const { isLoading, data } = useQuery<IPriceInfo>(
        {
            queryKey: ["priceInfo", coinId],
            queryFn: () => getPriceInfo(coinId!)
        }
    );

return <Container>
        {isLoading ? <Loading>Loading......</Loading> : 
            <InfoContainer>
                <div><InfoTitle>ath date </InfoTitle><InfoValue>&rarr; {data?.quotes.USD.ath_date}</InfoValue></div>
                <div><InfoTitle>ath price </InfoTitle><InfoValue>&rarr; {data?.quotes.USD.ath_price}</InfoValue></div>
                <div><InfoTitle>market_cap </InfoTitle><InfoValue>&rarr; {data?.quotes.USD.market_cap}</InfoValue></div>
                <div><InfoTitle>price </InfoTitle><InfoValue>&rarr; {data?.quotes.USD.price}</InfoValue></div>
                <div><InfoTitle>volume </InfoTitle><InfoValue>&rarr; {data?.quotes.USD.volume_24h}</InfoValue></div>
            </InfoContainer>
        }
    </Container>
}

export default Price;