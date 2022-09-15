const ensureAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    // req.flash('error_msg','Please log in to view this resource')
   // res.redirect('/login');
  // res.status(401).render('./errors/error-404',{
  //       layout:'./layouts/admin-panel',
  //       title:'404'
  // })
    res.status(401).redirect('/')
}

const alreadyAuthenticated = (req,res,next) => {
 if(req.isAuthenticated()){
    return res.redirect('/cbt')
 }
 return next();
}

module.exports = {
    ensureAuthenticated,
    alreadyAuthenticated
}