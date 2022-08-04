module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send({
            message: 'hello world test'
        });
    })
    app.post('/register', (req, res) => {
        res.send({
            message: `Hello ${req.body.email} user has registered`

        });
    })
}