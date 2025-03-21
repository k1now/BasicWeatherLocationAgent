import OpenAI from "openai";
import dotenv from 'dotenv';
import { tools } from './tools.js';
// Load environment variables
dotenv.config();

// Check if API key exists
if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY is not set in .env file');
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const query = "What activities do you recommend for me?"

const messages = [
    { 
        role: "system", 
        content: "You are a helpful AI agent that provides activity recommendations based on weather. You MUST use the getLocation function first to get the user's location, then use getCurrentWeather to get the current weather conditions. Only after you have both pieces of information should you provide activity recommendations. Never ask the user for their location - always use the getLocation function." 
    },
    { 
        role: "user", 
        content: query 
    }
];

async function Agent(query) {
    try {
        const runner = await openai.beta.chat.completions.runTools({
            model: 'gpt-4',
            messages: messages,
            tools: tools
        }).on('message', (message) => console.log('Message:', message));

        const finalContent = await runner.finalContent();
        console.log('\nFinal response:', finalContent);
    } catch (error) {
        console.error('Error:', error);
        if (error.response) {
            console.error('Response error:', error.response.data);
        }
    }
}

// Run the main function with the query
await Agent(query);
