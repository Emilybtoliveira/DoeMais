module.exports = {
    globalSetup: './jest_server_config/globalSetup.js',
    globalTeardown: './jest_server_config/globalTeardown.js',
    roots: ['.'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
    moduleFileExtensions: ['js', 'json', 'node'],
};