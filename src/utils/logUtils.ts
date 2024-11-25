const instaLog = (message: string, debug: boolean = false) => {
    if (debug) {
        console.log(message);
    }
};

const instaError = (message: string, res: any = undefined, error: any) => {
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
