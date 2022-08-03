module.exports = (app) => {
    app.post('/register')
    app.get('/', (req, res) => {
        res.send({
            message: 'hello world test'
        });
    })
}