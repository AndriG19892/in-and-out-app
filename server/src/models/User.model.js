const mongoose = require ( 'mongoose' );
const bcrypt = require ( 'bcrypt' );

const userSchema = new mongoose.Schema ( {
    nome: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, minlength: 6},
}, {timestamps: true} );

//middleware pre-save per l'hashing della password
userSchema.pre ( 'save', async function ( next ) {
    //Esegui l'hashing solo se la password è stata modificata (o è nuova)
    if ( !this.isModified ( 'password' ) ) return;

    try {
        const salt = await bcrypt.genSalt ( 12 );
        this.password = await bcrypt.hash ( this.password, salt );
    } catch (err) {
        throw err;
    }
} );

//metodo di confronto per il login:
userSchema.methods.comparePassword = async function ( candidatePassword ) {
    return await bcrypt.compare ( candidatePassword, this.password );
};

module.exports = mongoose.model ( 'User', userSchema );