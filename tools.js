export async function getLocation() {
    try {
        const response = await fetch("http://ip-api.com/json/")
        const data = await response.json()
        console.log('Location data:', data);
        return {
            latitude: data.lat,
            longitude: data.lon,
            city: data.city,
            country: data.country
        }
    } catch (err) {
        console.log(err)
        return { error: "Failed to fetch location data" }
    }
}

export async function getCurrentWeather(args) {
    try {
        // Parse the arguments if they're a string
        const params = typeof args === 'string' ? JSON.parse(args) : args;
        console.log('Getting weather for:', params);
        
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current=temperature_2m&timezone=auto`;
        console.log('Weather URL:', url);
        const response = await fetch(url)
        const data = await response.json()
        console.log('Weather data:', data);
        
        if (!data.current || typeof data.current.temperature_2m === 'undefined') {
            throw new Error('Invalid weather data received');
        }
        
        return {
            temperature: data.current.temperature_2m,
            unit: "°C",
            location: `Latitude: ${params.latitude}, Longitude: ${params.longitude}`
        }
    } catch (err) {
        console.log('Weather error:', err)
        return { error: "Failed to fetch weather data" }
    }
}

export const tools = [
    {
        type: 'function',
        function: {
            name: "getCurrentWeather",
            description: "Get the current weather for a specific location",
            function: getCurrentWeather,
            parameters: {
                type: "object",
                properties: {
                    latitude: {
                        type: "number",
                        description: "The latitude of the location"
                    },
                    longitude: {
                        type: "number",
                        description: "The longitude of the location"
                    }
                },
                required: ["latitude", "longitude"]
            }
        }
    },
    {
        type: 'function',
        function: {
            name: "getLocation",
            description: "Get the current location based on IP address",
            function: getLocation,
            parameters: {
                type: "object",
                properties: {},
                required: []
            }
        }
    }
];