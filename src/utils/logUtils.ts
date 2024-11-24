const instaLog = (message: string, debug: boolean = false) => {
    if (debug) {
        console.log(message);
    }
};

const instaError = (message: string, res: any, error: any) => {
    if (error instanceof Error) {
        console.error(error.message);
    } else {
        console.error(String(error));
    }
    res.status(500).json({ Error: message });
};

export { instaLog, instaError };
