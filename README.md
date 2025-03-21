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

### Example Output

The agent's execution can be monitored through the event listener and final content. Here's an example of the output:

#### Event Listener Messages:
```javascript
// First message - Assistant making a function call
Message: {
  role: 'assistant',
  content: null,
  tool_calls: [
    {
      id: 'call_PEOPtUsRqmK3MnwVoCsC753s',
      type: 'function',
      function: [Object]
    }
  ]
}

// Second message - Tool response (Location data)
Message: {
  role: 'tool',
  tool_call_id: 'call_PEOPtUsRqmK3MnwVoCsC753s',
  content: '{"latitude":47.6008,"longitude":-122.3248,"city":"Seattle","country":"United States"}'
}

// Third message - Assistant making another function call
Message: {
  role: 'assistant',
  content: null,
  tool_calls: [
    {
      id: 'call_R2FlfXT7wsI8EouJFfNhNZD0',
      type: 'function',
      function: [Object]
    }
  ]
}

// Fourth message - Another tool response (Weather data)
Message: {
  role: 'tool',
  tool_call_id: 'call_R2FlfXT7wsI8EouJFfNhNZD0',
  content: '{"temperature":7.2,"unit":"°C","location":"Latitude: 47.6008, Longitude: -122.3248"}'
}

// Final message - Assistant's response
Message: {
  role: 'assistant',
  content: 'Based on your location in Seattle...',
  refusal: null,
  annotations: [],
  parsed: null
}
```

#### Final Content:
```
Based on your location in Seattle and the current weather of 7.2°C, here are some activities I would recommend:

1. Visit the iconic Pike Place Market. It offers fresh produce, unique local businesses and eateries, and the weather is perfect for it.
2. Take a walk at the Seattle Waterfront. The breeze from the water will be refreshing. 
3. Explore the Seattle Art Museum. If the temperature drops, this would make for a great indoor activity.
4. Enjoy some coffee. Seattle is known for its coffee scene.
5. Visit the famous Space Needle and enjoy the city view.

Remember to bundle up, as the weather is quite chilly!
```

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