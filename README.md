# Weather Activity Recommendation Agent

This project demonstrates an AI agent that provides personalized activity recommendations based on the user's location and current weather conditions. The agent uses OpenAI's `runTools` API to automate the process of gathering information and generating recommendations.

## Features

- Automatic location detection using IP geolocation
- Real-time weather data retrieval
- Personalized activity recommendations based on location and weather
- Seamless integration of multiple API calls through OpenAI's `runTools`

## How It Works

The agent follows a simple but effective workflow:

1. Gets the user's location using the IP-API service
2. Retrieves current weather data for that location using Open-Meteo API
3. Generates personalized activity recommendations based on the gathered information

### Technical Implementation

The project leverages OpenAI's `runTools` API, which automates the complex process of:
- Reasoning about what information is needed
- Making function calls to gather that information
- Processing the results
- Generating a final response

#### APIs Used:
1. **IP-API** (`http://ip-api.com/json/`)
   - Provides geolocation data based on IP address
   - Returns latitude, longitude, city, and country

2. **Open-Meteo** (`https://api.open-meteo.com/v1/forecast`)
   - Provides current weather data
   - Returns temperature and other weather metrics

### Why `runTools` is Better Than Traditional Approach

Using the traditional completion API would require manual implementation of:
1. A loop to handle multiple function calls
2. Logic to determine when to stop calling functions
3. State management for tracking function call results
4. Error handling for each function call
5. Parsing and validating function responses

Example of what the traditional approach might look like:
```javascript
// Traditional approach would require something like this:
let needsLocation = true;
let needsWeather = true;
let location = null;
let weather = null;

while (needsLocation || needsWeather) {
    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-4"
    });
    
    // Parse the response
    // Check if it needs to call getLocation
    if (needsLocation) {
        location = await getLocation();
        needsLocation = false;
    }
    
    // Check if it needs to call getCurrentWeather
    if (needsWeather && location) {
        weather = await getCurrentWeather(location);
        needsWeather = false;
    }
    
    // Update messages with results
    // Check if we need to continue
}
```

With `runTools`, all of this complexity is handled automatically:
```javascript
const runner = await openai.beta.chat.completions.runTools({
    model: 'gpt-4',
    messages: messages,
    tools: tools
});
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Run the application:
   ```bash
   node index.js
   ```

## Dependencies

- openai
- dotenv
- node-fetch (for API calls)

## License

MIT 