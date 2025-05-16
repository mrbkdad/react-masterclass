import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import NotFound from "./routers/notfound";
import Coin from "./routers/coin";
import Coins from "./routers/coins";
import Price from "./routers/price";
import Chart from "./routers/chart";

const Router = createBrowserRouter([
    {
        path: "/",
        element:<Root />,
        children:[
            {
                path:"/",
                element:<Coins />,
            },
            {
                path:"/:coinId",
                element:<Coin />,
                children:[
                    {
                        path:"price",
                        element:<Price />
                    },
                    {
                        path:"chart",
                        element:<Chart />
                    },
                ]
            }
        ],
        errorElement: <NotFound />
    }
]);

export { Router };