const DATABASE = new Object({
    DB_URL: 'mongodb://localhost:27017/desire'
})

const JSON_WEB_TOKEN = new Object({
    PRIVATE_KEY: 'SOUP_CRAFT',
    EXPIRES_IN: '7d',
    COOKIE_EXPIRES_IN: 7 * 24 * 60 * 60 * 1000
})

const QI_NIU = new Object({
    BUCKET: 'soupcraft',
    ACCESS_KEY: 'rSFZkJhiCcJ-kK4uxoXPxdzxTJd0KsJTOKBOpdy9',
    SECRET_KEY: 'ytHJGHH7Css1ZjnaxYtGEszbzVRPerXfmjrcQbe-'
})

module.exports = {
    DATABASE,
    JSON_WEB_TOKEN,
    QI_NIU
}
