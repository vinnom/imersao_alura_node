import { GoogleGenerativeAI } from "@google/generative-ai";
import { instaError } from "../utils/logUtils.js";

const geminiKey = process.env.GEMINI_KEY as string;
const genAI = new GoogleGenerativeAI(geminiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function geminiGenerateDescription(imageBuffer: Buffer) {
    const prompt = "Generate a short description in Brazilian Portuguese for the following image";
    return generateGeminiText(prompt, imageBuffer);
}

export async function geminiGenerateAltText(imageBuffer: Buffer) {
    const prompt =
        "Generate an alt-text for the following image. If there is more than option for it, take the more descriptive one. Return only the description.";
    return generateGeminiText(prompt, imageBuffer);
}

async function generateGeminiText(prompt: string, imageBuffer: Buffer): Promise<string | Error> {
    try {
        const mimeType = getImageMimeType(imageBuffer);
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType,
            },
        };
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "No text";
    } catch (error) {
        const errorMessage = "Error generating text:";
        instaError(errorMessage, undefined, error);

        if (error instanceof Error) {
            throw new Error(`${errorMessage}: ${error.message}`);
        } else {
            throw new Error(`${errorMessage}: ${String(error)}`);
        }
    }
}

function getImageMimeType(buffer: Buffer): string {
    const possibleExtensions = ["png", "jpg", "jpeg", "webp"];
    const extension = possibleExtensions.find((ext) => buffer.toString("hex").startsWith(ext));
    return `image/${extension}`;
}
