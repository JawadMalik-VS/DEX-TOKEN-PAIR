const express = require("express");
const app = express();
const Moralis = require('moralis').default;
const cors = require('cors');
const port = 5001;
require('dotenv').config({ path: ".env" })

app.use(cors())
app.use(express.json())


app.get("/", async (req, res) => {
    res.send("SENT");
})

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

app.get("/getdexpair", async (req, res) => {
    try {
        const { query } = req;
        const response = await Moralis.EvmApi.defi.getPairAddress({
            token0Address: query.token0Address,
            token1Address: query.token1Address,
            exchange: query.exchange,
            chain: query.chain
        })
        return res.status(200).json(response);
    }
    catch (e) {
        console.log(`Something went Wrong ${e}`);
        return res.status(400).json();
    }
})

//PAIR ADD1
//0x5ac13261c181a9c3938bfe1b649e65d10f98566b

//PAIR ADD2
//0x3470447f3cecffac709d3e783a307790b0208d60
Moralis.start({
    apiKey: MORALIS_API_KEY,
}).then(() => {
    app.listen(port, () => {
        console.log(`Listen for API Calls at port ${port}`)
    })
})