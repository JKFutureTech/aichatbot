import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();



const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}); 

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from AI Joel',
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
             model:"gpt-3.5-turbo",
            messages: [
                            {"role": "system", "content": "your name is AI Joel and you are a helpful assistant."},
                            {"role": "user", "content": "Who won the world series in 2020?"},
                            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
                            {"role": "user", "content": $prompt}],                             
            temperature:0,
            max_tokens:4000,
            top_p:1,
            frequency_penalty:0.5,
            presence_penalty:0,
        });

        res.status(200).send({
        bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));
