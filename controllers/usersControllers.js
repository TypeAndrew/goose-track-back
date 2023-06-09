const { catchAsync } = require('../utils');
const User = require('../models/usersModel');
const ImageService = require('../services/imageService');


/**
 * Get contacts list 
 */
const getUsers = catchAsync(async(req, res) => {

    const users = await User.find().lean();

    res.status(200).json({
        users,
    }, );

})

/**
 * post user/logout 
 */
const logOutUsers = catchAsync(async(req, res, next) => {

    const user = req.user;

    user.token = null;

    const updatedUser = await user.save();

    user.password = undefined;

    res.status(201).json({

        updatedUser,
    });
})

/**
 * get user/current 
 */
const currentUsers = catchAsync(async(req, res, next) => {

    const user = req.user;
    user.password = null;

    res.status(201).json({
        user,
    });
})

/**
 * update user picture
 */
const updateUsersAvatars = catchAsync(async(req, res) => {
    const { file, user } = req;

    if (file) {
        user.avatarURL = await ImageService.save(file, { width: 600, height: 600 }, 'images', 'users', user.id);
    }

    const updatedUser = await user.save();

    res.status(200).json({
        user: updatedUser,
    });
});

/**
 * patch user/info
 */
const updateUserData = async(req, res, next) => {

    const { user } = req;



    Object.keys(req.body).forEach((key) => {

        if (key !== "avatarURL") {
            user[key] = req.body[key];
        }
    });

    user.save();

    res.status(200).json({
        user: user,
    });

}


const sortColumnsUser = async(req, res, next) => {
    const { name } = req.body;
    const { user  } = req;
    const columnsBar = user.columns;
   // const names = columnsBar.map(el => el);
    const Index1 = columnsBar.indexOf("To do");
    const Index2 = Index1 + 1;
    
    
    
    const valueFirst = columnsBar[Index1];
    const valueSecond = columnsBar[Index2] ;
    
    if (columnsBar.length > Index2) {
        columnsBar[Index1] = valueSecond;
        columnsBar[Index2] = valueFirst;
    }
    console.log(name)

    console.log(columnsBar)

    user.columns = columnsBar;
    
    user.save();

    res.status(200).json({
        user: user,
    });

}

module.exports = {
    getUsers,
    logOutUsers,
    currentUsers,
    updateUsersAvatars,
    updateUserData,
    sortColumnsUser,

}