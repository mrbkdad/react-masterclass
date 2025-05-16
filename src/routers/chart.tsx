import styled from "styled-components";
import ApexChart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getHistoryInfo } from "../api";

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 2px;
`;

const Loading = styled.span`
    display: block;
    text-align: center;
    margin-top: 48px;
    font-size: 24px;
    color: ${props => props.theme.accentColor};
`;

interface IHistoryData {
    close: string;
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
    volume: string;
}

interface ICandleData {
    x: Date;
    y: [number, number, number, number];
}

function Chart() {
    const { coinId } = useParams();
    const { isLoading, data } = useQuery<IHistoryData[]>(
        {
            queryKey: ["historyData", coinId],
            queryFn: () => getHistoryInfo(coinId!)
        }
    );

    const candleData: ICandleData[] = data?.map(price => ({
        x: new Date(price.time_close * 1000),
        y: [
            Number(price.open),
            Number(price.high),
            Number(price.low),
            Number(price.close)
        ]
    })) ?? [];

    return (
        <Container>
            {isLoading ? (
                <Loading>Loading...</Loading>
            ) : (
                <ApexChart
                    type="candlestick"
                    series={[{
                        data: candleData
                    }]}
                    options={{
                        chart: {
                            width: 500,
                            height: 300,
                            toolbar: {
                                show: false
                            },
                            background: "transparent"
                        },
                        xaxis: {
                            type: "datetime",
                            labels: {
                                style: {
                                    colors: "#9ca3af"
                                }
                            }
                        },
                        yaxis: {
                            tooltip: {
                                enabled: true
                            },
                            labels: {
                                style: {
                                    colors: "#9ca3af"
                                }
                            }
                        },
                        grid: {
                            borderColor: "#27272a"
                        },
                        tooltip: {
                            theme: "dark"
                        }
                    }}
                />
            )}
        </Container>
    );
}

export default Chart;