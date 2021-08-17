module.exports = (app) => {
    const bank = require('../controllers/bank.controller.js');


    app.post('/users/create', bank.create);

    app.get('/users', bank.findAll);

    app.get('/users/:userID', bank.findOne);

    app.put('/users/:userID', bank.update);

    app.put('/user/:userID', bank.update_bal);

    app.delete('/users/:userID', bank.delete);
    
}