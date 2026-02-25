const userModel = require('../models/User.model');

exports.getUserProfile = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await userModel.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({
                success: false,
                message:"Utente non trovato"
            });
        }
        res.status(200).json ({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status ( 500 ).json ( {
            success: false,
            message: error.message
        });
    }
};