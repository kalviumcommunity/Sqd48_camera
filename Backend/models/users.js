const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:{ type: String,required:true,unique:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add any other fields you need for the user model
});


// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

const UsersModal = mongoose.model('users', UserSchema);

module.exports = UsersModal;

