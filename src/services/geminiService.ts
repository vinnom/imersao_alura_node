import { Buffer } from "buffer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { instaError } from "../utils/logUtils.js";

/**
 * Initializes the Gemini AI model.
 */
const geminiKey = process.env.GEMINI_KEY as string;
const genAI = new GoogleGenerativeAI(geminiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generates a short description for an image using Gemini AI.
 *
 * @param {Buffer} imageBuffer - The image buffer.
 * @returns {Promise<string | Error>} - The generated description or an error.
 */
export async function geminiGenerateDescription(imageBuffer: Buffer): Promise<string | Error> {
    const prompt = "Generate a short description in Brazilian Portuguese for the following image";
    return generateGeminiText(prompt, imageBuffer);
}

/**
 * Generates an alt-text for an image using Gemini AI.
 *
 * @param {Buffer} imageBuffer - The image buffer.
 * @returns {Promise<string | Error>} - The generated alt-text or an error.
 */
export async function geminiGenerateAltText(imageBuffer: Buffer): Promise<string | Error> {
    const prompt =
        "Generate an alt-text for the following image. If there is more than one option, take the most descriptive one. Return only the description.";
    return generateGeminiText(prompt, imageBuffer);
}

/**
 * Generates text from an image using the Gemini AI model.
 *
 * @param {string} prompt - The prompt for the model.
 * @param {Buffer} imageBuffer - The image buffer.
 * @returns {Promise<string | Error>} - The generated text or an error.
 */
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

/**
 * Determines the MIME type of an image buffer.
 *
 * @param {Buffer} buffer - The image buffer.
 * @returns {string} - The MIME type of the image.
 */
function getImageMimeType(buffer: Buffer): string {
    const possibleExtensions = ["png", "jpg", "jpeg", "webp"];
    const extension = possibleExtensions.find((ext) => buffer.toString("hex").startsWith(ext));
    return `image/${extension}`;
}
