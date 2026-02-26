const jwt = require ( 'jsonwebtoken' );

const generateToken = async ( userId ) => {
    return jwt.sign ( {id: userId}, process.env.JWT_SECRET, {expiresIn: '3h'} );
};
module.exports = generateToken;