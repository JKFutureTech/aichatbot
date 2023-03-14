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
        const promptHistory = [];
        // add the current prompt to the prompt history array
        promptHistory.push(prompt);

        // if there are more than 10 prompts in the array, remove the oldest one
        if (promptHistory.length > 10) {
            promptHistory.shift();
        }

        const response = await openai.createCompletion({
            model:"text-davinci-003",
            prompt:`${promptHistory}`,
            temperature:0,
            max_tokens:3000,
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
