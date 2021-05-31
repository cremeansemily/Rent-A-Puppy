const withAuth = (req, res, next) => {
    console.log(req.session.user_id)
    if (!req.session.user_id) {
        res.redirect('/user/login');
        
    } else {
        next();
    }
};

module.exports = withAuth;