const Express = require('express');
// import Express from 'express';
const router = Express.Router();

router.get('/', (req, res, next) => {
  res.send('hi');
});

export default router;
