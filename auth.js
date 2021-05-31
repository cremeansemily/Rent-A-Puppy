const withAuth = (req, res, next) => {
    console.log(req.session.user_id)
    if (!req.session.user_id) {
<<<<<<< HEAD
        res.redirect('/user/login');
=======
        res.redirect('/login');
>>>>>>> feature/review
        
    } else {
        next();
    }
};

module.exports = withAuth;