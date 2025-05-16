const BASE_URL = "https://api.coinpaprika.com/v1"

function getCoins(){
    return fetch(`${BASE_URL}/coins`).
        then((response) => response.json());
}

function getCoinInfo(coinId:string){
    return fetch(`${BASE_URL}/coins/${coinId}`).
        then((response) => response.json());
}

function getPriceInfo(coinId:string){
    return fetch(`${BASE_URL}/tickers/${coinId}`).
        then((response) => response.json());
}

function getHistoryInfo(coinId:string){
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).
        then((response) => response.json());
}

export { getCoins, getCoinInfo, getPriceInfo, getHistoryInfo };