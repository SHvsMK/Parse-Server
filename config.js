var config = {
    parse: {
        dataBaseUri: 'mongodb://localhost:27017/parse-test',
        cloud: './cloud/main.js',
        appId: 'parse-test',
        masterKey: 'parse-test',
        serverURL: 'http://localhost:3000/parse',
        liveQuery: {
            classNames: ["Posts", "Comments"]
        }
    }
};

module.exports = config;