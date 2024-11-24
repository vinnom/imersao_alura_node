const instaLog = (message: string, debug: boolean = false) => {
    if (debug) {
        console.log(message);
    }
}

export default instaLog