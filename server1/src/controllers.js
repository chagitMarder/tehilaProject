const { User } = require("./model");
const moment = require('moment');



exports.getAll =  async(req, res, next) => {
    const users = await User.find({});
    res.send(users);
};


exports.graph = async (req, res, next) => {
    try {
        // Get the start and end date of the last month
        const lastMonthStartDate = moment().subtract(1, 'months').startOf('month').toDate();
        const lastMonthEndDate = moment().subtract(1, 'months').endOf('month').toDate();

        // Find users who were sick within the last month
        const users = await User.find({
            $and: [
                { sickDate: { $gte: lastMonthStartDate } }, // Sick date is on or after the start of last month
                { recoveryDate: { $lte: lastMonthEndDate } } // Recovery date is on or before the end of last month
            ]
        });

        // Group users by sick date and count the number of users for each date
        const sickUsersByDate = {};
        users.forEach(user => {
            const sickDate = moment(user.sickDate).format('YYYY-MM-DD');
            if (!sickUsersByDate[sickDate]) {
                sickUsersByDate[sickDate] = 0;
            }
            sickUsersByDate[sickDate]++;
        });
        console.log(sickUserByDate);
        
        res.send(sickUsersByDate);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}


exports.addUser = async(req, res, next) => {
    const body = req.body;
    console.log(body);
    try {
    console.log("new!!!!!!!!!!!!")
            const newUser = new User(body);
            if (isValidUser(newUser.sickDate, newUser.recoveryDate)){
            await newUser.save();
            res.status(201).send(newUser);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

exports.deleteUser = async(req, res, next) =>{
    try {
        let data = await User.deleteOne({id: req.params.id});        
        res.json(data);
        //res.status(200).send(data);
    } catch (error) {
        console.log(error);
        
        res.status(400).send(error);
    }
}



exports.editUser = async(req, res, next) =>{
    try {
    console.log("in fun!!!!!!!!!!!!!")
        const { body } = req.body;
        console.log("in fun!!!!!!!!!!!!!",req.params.id)
        const newUser = req.body;
        if (isValidUser(newUser.sickDate, newUser.recoveryDate)) {
             let data = await User.updateOne({id: req.params.id}, req.body);
            res.json(data);
        }
    } catch (error) {
        console.log(error);
        
        res.status(400).send(error);
    }
}

function isValidUser (date1, date2) {
    // if (typeof date1 === 'string') {
    //     date1 = new Date(date1);
    // }
    // if (typeof date2 === 'string') {
    //     date2 = new Date(date2);
    // }
    // console.log(date1 < date2)
    // return date1 < date2;
    return true;
}