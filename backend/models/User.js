/* MODEL DE DONNEES UTILISATEUR */

// import de mongoose
const mongoose = require('mongoose');

// import du package unique validator
const uniqueValidator = require('mongoose-unique-validator');

// création du schéma
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }
});

// pour qu'il n'y est pas plusieurs utilisateurs avec la même adresse mail
userSchema.plugin(uniqueValidator);

// export du schéma
module.exports = mongoose.model('User', userSchema);