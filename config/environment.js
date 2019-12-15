const DATABASE = new Object({
    DB_URL: 'mongodb://localhost:27017/desire'
})

const JSON_WEB_TOKEN = new Object({
    PRIVATE_KEY: 'SOUP_CRAFT',
    EXPIRES_IN: '7d'
})

module.exports = {
    DATABASE,
    JSON_WEB_TOKEN
}
