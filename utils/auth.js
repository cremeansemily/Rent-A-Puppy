const withAuth = (req, res, next) => {
    // console.log(req.originalUrl)
    req.redirect = req.originalUrl
    const data = {
        redirect : req.originalUrl
    }
    if (!req.session.user_id) {
        res.render('user-views/login', data);
        
    } else {
        next();
    }
};

module.exports = withAuth;