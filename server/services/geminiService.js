import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = null;
let model = null;

export function initGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'your_key_here') {
    try {
      genAI = new GoogleGenerativeAI(apiKey);
      model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      console.log('Gemini AI initialized.');
    } catch (e) {
      console.error('Failed to initialize Gemini AI', e);
    }
  } else {
    console.warn('GEMINI_API_KEY is not set or invalid. AI features will use fallback.');
  }
}

export async function analyzeSafety(area, lat, lng, time, crimeData) {
  if (!model) {
    initGemini();
  }

  if (!model) {
    return {
      analysis: "AI analysis is currently unavailable. Please stay aware of your surroundings.",
      tips: [
        "Stick to well-lit areas.",
        "Keep emergency contacts updated.",
        "Share your live location if you feel unsafe."
      ]
    };
  }

  const prompt = `
    You are a personal safety AI advisor. 
    Analyze the safety of this situation:
    Location Context: ${area || `Lat ${lat}, Lng ${lng}`}
    Time: ${time || new Date().toISOString()}
    Nearby Incidents Summary: ${JSON.stringify(crimeData).substring(0, 500)}

    Provide a short, calming but practical safety analysis (max 3 sentences) and 3 specific actionable tips.
    Format your response exactly as valid JSON like this:
    {
      "analysis": "string",
      "tips": ["tip1", "tip2", "tip3"]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // try to extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
       throw new Error("Invalid format from AI");
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      analysis: "Unable to generate real-time AI analysis due to an error. Proceed with caution.",
      tips: [
        "Stay in well-lit, populated areas.",
        "Keep your phone charged and easily accessible.",
        "Trust your instincts and leave if you feel uncomfortable."
      ]
    };
  }
}
