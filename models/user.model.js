const mongoose = require('mongoose')

const userSchema  = new mongoose.Schema(
    {
      username:{
        type:String,
        require:[true,'username is required']
      },
      email:{
        type:String,
        require:[true,'email is required']
      },
      password:{
        type:String,
        require:[true,'password is required']
      },
    },
{timestamps:true})

const User = mongoose.model("User",userSchema);

module.exports = User;