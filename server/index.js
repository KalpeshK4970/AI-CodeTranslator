const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(cors());
const PORT = process.env.PORT || 4000; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/convert-code', async (req, res) => {

    const { from, to, code } = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `convert this code: ${code} from is in ${from} programming language to ${to} programming language`,
        max_tokens: 500,
    });

    res.send({
        data: completion.data
    });

});

const server = app.listen(PORT, () => {
    console.log(`Server running on  ${PORT}`);
});

module.exports = { app, server };
