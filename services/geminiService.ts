import { GoogleGenAI, Type } from "@google/genai";
import type { Theme, Project, Layout } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

export async function generateBio(name: string, title: string, skills: string[]): Promise<string> {
    const prompt = `Write a professional and engaging bio (around 4-5 sentences) for a person named ${name}, who is a ${title}. They have skills in: ${skills.join(', ')}. The tone should be confident but approachable. Do not use markdown.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
    });
    
    return response.text.trim();
}

export async function suggestProjects(name: string, title: string, skills: string[]): Promise<Omit<Project, 'id' | 'link'>[]> {
    const prompt = `Based on the profile of ${name}, a ${title} with skills in ${skills.join(', ')}, suggest 3 creative and relevant portfolio project ideas. For each project, provide a concise title and a 2-3 sentence description.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        image: { type: Type.STRING, description: "A placeholder image URL from a service like picsum.photos." }
                    },
                    required: ["title", "description", "image"]
                }
            }
        }
    });

    try {
        const json = JSON.parse(response.text);
        return json;
    } catch(e) {
        console.error("Failed to parse JSON for project suggestions:", response.text);
        return [];
    }
}

export async function generateTheme(): Promise<Omit<Theme, 'id' | 'isAIGenerated'>> {
    const prompt = `Generate a unique and modern color scheme for a developer portfolio website. Provide a creative name for the theme. The theme must include two palettes: one for light mode and one for dark mode. Each palette must have exactly these 6 properties: 'primary' (main interactive elements), 'secondary' (accent color), 'background' (page background), 'card' (background for cards/sections), 'text' (main body text), and 'heading' (for titles). All color values must be in hex format (e.g., #RRGGBB).`;

    const colorSchema = {
        type: Type.OBJECT,
        properties: {
            primary: { type: Type.STRING },
            secondary: { type: Type.STRING },
            background: { type: Type.STRING },
            card: { type: Type.STRING },
            text: { type: Type.STRING },
            heading: { type: Type.STRING },
        },
        required: ["primary", "secondary", "background", "card", "text", "heading"]
    };

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "A creative name for the theme." },
                    light: colorSchema,
                    dark: colorSchema,
                },
                required: ["name", "light", "dark"]
            }
        }
    });

    const json = JSON.parse(response.text);
    return json;
}

export async function suggestLayout(bio: string, title: string, layouts: Layout[]): Promise<string> {
    const layoutOptions = layouts.map(l => `- ${l.id} (${l.name})`).join('\n');
    const prompt = `
        Analyze the following user profile and recommend the most suitable portfolio layout from the list provided.
        
        **User Profile:**
        - **Job Title:** ${title}
        - **Bio:** ${bio}

        **Available Layouts:**
        ${layoutOptions}

        Consider the user's profession and the tone of their bio. For example, a "Gallery Grid" might be best for a photographer, while a "Material Resume" might suit a software engineer. Return only the ID of the recommended layout.
    `;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    layoutId: { 
                        type: Type.STRING,
                        description: "The ID of the recommended layout."
                    }
                },
                required: ["layoutId"]
            }
        }
    });

    try {
        const json = JSON.parse(response.text);
        const suggestedId = json.layoutId;
        if (layouts.some(l => l.id === suggestedId)) {
            return suggestedId;
        }
        return layouts[0].id; 
    } catch(e) {
        console.error("Failed to parse JSON for layout suggestion:", response.text);
        return layouts[0].id;
    }
}