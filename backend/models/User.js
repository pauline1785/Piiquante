/* MODEL DE DONNEES UTILISATEUR */

// import de mongoose
const mongoose = require('mongoose');

// import du package unique validator
const uniqueValidator = require('mongoose-unique-validator');

// création du schéma
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // unique pour qu'il n'y est pass plusieurs utilisateurs avec la même adresse mail
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

// export du schéma
module.exports = mongoose.model('User', userSchema);