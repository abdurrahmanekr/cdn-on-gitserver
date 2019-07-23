function CDNOnGitServer(options) {
    if (!(options instanceof Object))
        throw new Error('Options required!');

    const auth = options.auth;
    const libName = options.libName;

    const libOptions = options.libOptions;

    if (!libOptions)
        throw new Error('libOptions required!')

    switch (libName) {
        case 'gitlab':
            return require('./libs/gitlab')(libOptions, auth);
            break;
        default:
            throw new Error('libName required! Ex: gitlab');
    }
}

module.exports = CDNOnGitServer;