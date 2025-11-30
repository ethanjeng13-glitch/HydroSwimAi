import { GoogleGenAI, Type } from "@google/genai";
import { SessionData, JournalEntry, ProfessionalBenchmark } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSwimPerformance = async (
  session: SessionData,
  benchmark: ProfessionalBenchmark
): Promise<{ analysis: string; tips: string[] }> => {
  try {
    const prompt = `
      Act as an Olympic Swimming Coach. Analyze the following swim session data compared to professional benchmark data.
      
      User Session:
      - Style: ${session.style}
      - Total Distance: ${session.totalDistanceMeters}m
      - Average Heart Rate: ${session.averageHeartRate} bpm
      - Average Lap Time (50m): ${(session.totalTimeSeconds / (session.totalDistanceMeters / 50)).toFixed(2)}s
      - SWOLF Score (avg): ${Math.round(session.laps.reduce((acc, lap) => acc + lap.swolf, 0) / session.laps.length)}
      
      Professional Benchmark (${benchmark.swimmerName}):
      - Avg 50m Pace: ${benchmark.avgLapTime50m}s
      - Avg Stroke Rate: ${benchmark.avgStrokeRate}
      
      Provide:
      1. A short paragraph analyzing the performance gap.
      2. Three actionable technical tips to close the gap.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("No response from AI");
  } catch (error) {
    console.error("AI Analysis Failed:", error);
    return {
      analysis: "Unable to generate analysis at this time.",
      tips: ["Focus on consistency.", "Maintain a steady breathing rhythm.", "Keep your core engaged."]
    };
  }
};

export const analyzeJournalEntry = async (entry: string, mood: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        The swimmer just finished practice. 
        Self-reported Mood: ${mood}
        Journal Note: "${entry}"
        
        Provide a brief, encouraging, and scientifically sound recovery tip or mental performance insight (max 2 sentences).
      `,
    });
    return response.text || "Rest well and hydrate!";
  } catch (error) {
    return "Great effort today. Focus on recovery.";
  }
};