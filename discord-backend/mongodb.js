import mongoose from 'mongoose'

const discordschema=mongoose.Schema({
    channelName:String,
    conversation:[
        {  
            message: String,
            timestamp: String,
            user:{
                displayname: String,
                email: String,
                photo: String,
                uid: String
            }
        }
    ]
})
 
export default mongoose.model('conversations',discordschema) 