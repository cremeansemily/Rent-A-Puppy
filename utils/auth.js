
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

const ownerAuth = (req, res, next)=>{
    const id = req.params.id;
    if (req.session.owner_id = id ) {
       next();
    } else if (req.session.user_id && !req.session.owner_id) {
        return res.render('error', { message: `Nice try, ${req.session.username}`, redirect: `/dashboard/user/${req.session.user_id}` })
    } else if (!req.session.user_id && !req.session.owner_id) {
        return res.render('error');
    }else{
        return res.render('error', { message: 'Not Authorized!', redirect: `/dashboard/owner/${req.session.owner_id}` })
    }
}
const userAuth = (req, res, next)=>{
    const id = req.params.id;
    if (req.session.user_id == id) {
        next()
        
    } else if (req.session.owner_id && !req.session.user_id) {
        return res.render('error', { message: `Nice try, ${req.session.username}`, redirect: `/dashboard/owner/${req.session.owner_id}` })
    } else if (!req.session.user_id && !req.session.owner_id) {
        return res.render('error');
    }else{
        return res.render('error', { message: 'Not Authorized!', redirect: `/dashboard/user/${req.session.user_id}` })
    }
}
module.exports = {withAuth, ownerAuth, userAuth};