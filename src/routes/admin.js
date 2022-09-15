const express = require('express');
const Questions = require('../models/Questions');
const router = express.Router();

router.post('/setQuestion', async (req,res) => {
  try{
  	const question = new Questions({
  		department:req.body.department,
  		questionAndAnswer:req.body.questionAndAnswer
  	});
  	const setQuestions = await question.save();
  	res.status(200).json(setQuestions);
  }catch(err){
  	res.status(500).json(err.message);
  }
});

router.get('/questions', async (req,res) => {
  try{
  	const qs = await Questions.find();
  	res.status(200).json(qs);
  }catch(err){
  	res.status(500).json(err.message);
  }
})

module.exports = router;