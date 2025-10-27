

import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";
import type { CVData, Experience } from "../types";

// FIX: Aligned with coding guidelines for API key usage.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

export async function generateBulletPoints(experience: Omit<Experience, 'id' | 'description'>): Promise<string> {
    const prompt = `Based on the following job information, generate 3-4 concise, metric-driven, and impactful bullet points for a resume. Each bullet point should start with an action verb.
Job Title: ${experience.jobTitle}
Company: ${experience.company}
Timeframe: ${experience.startDate} to ${experience.endDate}
Focus on achievements, not just responsibilities. Output should be a single string with bullet points separated by newlines, starting with '-'.`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating bullet points:", error);
        return "AI generation failed. Please try again.";
    }
}

export async function generateSummaryAndScore(cvData: CVData, jobDescription: string): Promise<{ score: number; summary: string; keywords: string[] }> {
    const cvText = `
        Name: ${cvData.contact.name}
        Title: ${cvData.contact.title}
        Summary: ${cvData.summary}
        Experience: ${cvData.experience.map(e => `${e.jobTitle} at ${e.company}: ${e.description}`).join('\n')}
        Education: ${cvData.education.map(e => `${e.degree} from ${e.institution}`).join('\n')}
    `;

    const prompt = `Analyze the following CV and Job Description.
        1.  Provide a percentage score from 0-100 representing how well the CV is optimized for the job description for an Applicant Tracking System (ATS).
        2.  Write a new, highly-tailored 3-4 sentence professional summary for the CV that aligns with the job description.
        3.  Suggest a list of 5-7 important keywords from the job description that should be included in the CV.
        
        CV:
        ---
        ${cvText}
        ---
        
        Job Description:
        ---
        ${jobDescription}
        ---
        
        Return a single, valid JSON object with the keys: "score" (number), "summary" (string), and "keywords" (array of strings). Do not include any other text or markdown formatting.
    `;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER },
                        summary: { type: Type.STRING },
                        keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                }
            }
        });

        const result = JSON.parse(response.text);
        return result;

    } catch (error) {
        console.error("Error generating summary and score:", error);
        return { score: 0, summary: "AI analysis failed. Please check the job description and try again.", keywords: [] };
    }
}

export async function generateHeadshot(image: File, style: string): Promise<string> {
    try {
        const base64Image = await fileToBase64(image);
        const imagePart = {
            inlineData: {
                mimeType: image.type,
                data: base64Image,
            },
        };
        const textPart = {
            text: `Generate a professional, studio-quality headshot of a person with similar facial features to the person in this image. The style should be "${style}". The person should be wearing appropriate professional attire. Ensure the final image is a realistic, high-resolution portrait suitable for a CV or professional profile.`,
        };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        const firstPart = response.candidates?.[0]?.content?.parts?.[0];
        if (firstPart && 'inlineData' in firstPart) {
            return firstPart.inlineData.data;
        }

        throw new Error("No image data returned from API.");

    } catch (error) {
        console.error("Error generating headshot:", error);
        throw new Error("AI headshot generation failed. Please try again.");
    }
}