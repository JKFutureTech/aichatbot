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
        let messages = [];
        messages.append({"role": "system", "content": "Your name is Joel and you are a helpful assistant"});
        let question = {};
        question ['user'] = 'user';
        question ['content'] = prompt;
        messages.append(question);
        

  
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));
