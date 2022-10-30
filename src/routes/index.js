const express = require('express');
const {ensureAuthenticated,alreadyAuthenticated} = require('../middleware/verifyAuth');
const router = express.Router();

router.get('/', (req,res) => {
  res.status(200).render('home',{
  	title:'Ksp staff e-exam'
  })
})

router.get('/reg', (req,res) => {
	res.status(200).render('register',{
		title:'Register'
	})
})

router.get('/login', (req,res) => {
	res.status(200).render('login',{
		title:'Login'
	})
})


router.get('/cbt', ensureAuthenticated, (req,res) => {
	res.status(200).render('cbt',{
		title:'Examination'
	})
})

router.get('/logout',(req,res) => {
   res.status(200).redirect('/')
})

router.get('/adminDashboard', (req,res) => {
	res.status(200).render('admin', {
		 title:'admin'
	})
});

router.get('/admin', (req,res) => {
	res.status(200).render('adminLogin',{
		title:'login'
	})
})


module.exports = router;