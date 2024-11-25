/**
 * Logs a message to the console.
 *
 * @param {string} message - The message to log.
 * @param {boolean} debug - Whether to log the message in debug mode.
 */
const instaLog = (message: string, debug: boolean = false) => {
    if (debug) {
        console.log(message);
    }
};

/**
 * Logs an error message to the console and optionally sends an error response.
 *
 * @param {string} message - The error message to log.
 * @param {any} res - The response object (optional).
 * @param {any} error - The error object (optional).
 */
const instaError = (message: string, res?: any, error?: any) => {
    if (res !== undefined) {
        res.status(500).json({ Error: message });
    }

    if (error instanceof Error) {
        console.error(error.message);
    } else {
        console.error(String(error));
    }
};

export { instaLog, instaError };
