const autoId = () => {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let autoId = ''

    for (let i = 0; i < 20; i++) {
        autoId += CHARS.charAt(
            Math.floor(Math.random() * CHARS.length)
        )
    }
    return autoId
};

const delay = retryCount =>
    new Promise(resolve => setTimeout(resolve, 10 ** retryCount));

const retry =  async (fn, maxRetry, retryCount = 0, lastError = null) => {
    if (retryCount > maxRetry) throw new Error(lastError);
    try {
        return await fn();
    } catch (e) {
        await delay(retryCount);
        return retry(fn, link, retryCount + 1, e);
    }

}    

module.exports = {
    autoId,
    retry
}