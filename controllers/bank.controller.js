const User = require('../models/bank.model.js');
const {v4: uuidv4}=require('uuid')

exports.create = async(req, res) => {
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Details can not be empty"
    //     });
    // }
    if(req.body.balance<500) {
        return res.status(400).send({
            message: "Require minimum 500 to create a bank account"
        });
    }
    const user = new User({
        name:  req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password:req.body.password,
        balance:req.body.balance,
        account:Date.now(),
    });
    console.log(req);
    try {
        const data= await user.save()
        res.send(data)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the account."
        });
    }
};

exports.findAll = async(req, res) => {
    try {
        const data=await User.find()
        res.send(data)
        console.log(req.body);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
            });
    }
};

exports.findOne = async (req, res) => {
    try {
        const data = await User.findById(req.params.userID)
        if(!data) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userID
            });   };
        res.send(data)
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving user with id " + req.params.userID
        });
    }
};

exports.update = async (req, res) => {
    try {
        const data=await User.findByIdAndUpdate(req.params.userID, {
            name:  req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password:req.body.password,
            balance:req.body.balance
        }, {new: true})
        res.send(data)
    } catch (error) {
        return res.status(500).send({
            message: "Error updating your account details " 
        });
    }
};

exports.update_bal = async (req, res) => {
    try {
        const data=await User.findByIdAndUpdate(req.params.userID, {
            balance:req.body.balance
        }, {new: true})
        res.send(data)
    } catch (error) {
        return res.status(500).send({
            message: "Error faced during transaction " 
        });
    }
};

exports.delete =async (req, res) => {
    
    try {
        const data= await User.findByIdAndRemove(req.params.userID)
        if(!data) {
            res.status(404).send(
            ` message: "User not found with id " + ${req.params.userID}`
            );
        }
        res.send({"message" : "deleted your account successfully"})
    } catch (error) {
        res.status(500).send({
            message: "Could not delete account with id " + req.params.userID
        });
    }
};