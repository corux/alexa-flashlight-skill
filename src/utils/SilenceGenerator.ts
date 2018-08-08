function repeat(text: string, count: number) {
    let result = "";
    for (let i = 0; i < count; i++) {
        result += text;
    }

    return result;
}

export function generateSilence(seconds: number) {
    const secondsPerBreak = 10;
    const ssml = `<prosody volume="x-loud">`
        + repeat(`<break time="${secondsPerBreak}s"/>`, Math.floor(seconds / secondsPerBreak))
        + (seconds % secondsPerBreak > 0 ? `<break time="${seconds % secondsPerBreak}s"/>` : "")
        + "</prosody>";

    return ssml;
}
