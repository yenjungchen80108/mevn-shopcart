module.exports = (app) => {
    app.post('/register')
    app.get("/", (res, req) => {
        res.send("home page");
    })
}