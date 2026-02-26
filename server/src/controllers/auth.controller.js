const User = require ( '../models/User.model' );
const generateToken = require ( '../utils/GenerateToken' );
const jwt = require ( 'jsonwebtoken' );

exports.register = async ( req, res ) => {
    try {
        const {nome, email, password} = req.body;

        //controllo se l'utente c'è già
        const userExists = await User.findOne ( {email} );
        if ( userExists ) {
            return res.status ( 400 ).json ( {
                success: false,
                message: 'Utente già registrato'
            } );
        }
        //creo l'utente:

        const newUser = await User.create ( {
            nome,
            email,
            password,
        } );
        const token = generateToken ( newUser._id );
        res.status ( 201 ).json ( {
            success: true,
            message: "Utente creato con successo!",
            user: {id: newUser._id, email: newUser.email},
            token
        } );
    } catch (error) {
        res.status ( 500 ).json ( {
            success: false,
            message: error.message
        } );
    }
}

exports.login = async ( req, res ) => {
    try {
        const {email, password} = req.body;
        //cerco l'utente:
        const user = await User.findOne ( {email} );
        if ( !user ) {
            return res.status ( 401 ).json ( {
                success: false,
                message: "Email errata"
            } );
        }
        //confronto la password inserita con quella su db:
        const isMatch = await user.comparePassword ( password );
        if ( !isMatch ) {
            return res.status ( 401 ).json ( {
                success: false,
                message: "Password errata"
            } );
        }
        const token = await generateToken ( user._id );
        console.log ("token generato", token);
        //risposta di successo:
        res.json ( {
            success: true,
            message: "Login riuscito!",
            user: {
                id: user._id,
                nome: user.nome,
                email: user.email
            },
            token
        } );
    } catch (error) {
        res.status ( 500 ).json ( {
            success: false,
            message: error.message
        } );
    }
}