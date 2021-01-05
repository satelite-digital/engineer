class Config {
    constructor(config = {}) {
        this.apiHost = config.apiHost || 'https://tools.ubisuite.com';
        this.apiVersion = config.apiVersion || 'v1';
        this.apiKey = config.apiKey || process.env.PENTCLOUD_TOOLS_API_KEY;
    }
}

module.exports = Config;