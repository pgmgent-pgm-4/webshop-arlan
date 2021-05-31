const getHome = (req, res, next) => {
    try {
        res.render('index', {
            test: "Dit is een test"
        })
    } catch (error) {
        throw new Error(error, next);
    }
}

module.exports = {
    getHome
}