import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import mongoData from './mongodb.js'

//app config
const app=express()
const port=process.env.PORT || 8002
//middleware
app.use(express.json())
app.use(cors())
//db config

const mongoURI='mongodb+srv://admin:4hUjki1tw3UyaBSz@cluster0.xg91w.mongodb.net/discordDB?retryWrites=true&w=majority'
mongoose.connect(mongoURI,{
    userCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
//API
app.get('/',(req,res)=>res.status(200).send('hello everyone'))

app.post('/new/channel',(req,res)=>{
    const dbdata= req.body

    mongoData.create(dbdata,(err,data)=> {
        if(err){
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
})
app.get('/get/channelList',(req,res)=>{
    mongoData.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        } else{
            let channels=[]
            data.map(channelData =>{
                const channelInfo={
                    id:channelData._id,
                    name:channelData.channelName
                }
                channels.push(channelInfo)
            })
            res.status(200).send(channels)
        }

    })
}
)
app.post('/new/message',(req,res) => {
    
    const newmessage = req.body

    mongoData.update(
        {id : req.query.id},
        {$push :{conversation : req.body}},
        (err,data)=>{
            if (err){
                console.log("error saving message")
                console.log(err)

                res.status(501).send(err)
            }else{
                res.status(201).send(data)

            }
        }
    )
})
app.get('/get/data',(req,res)=>{
    mongoData.find((err,data)=>{
        if (err){
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
})

app.get('/get/conversation',(req,res)=>{
    const id=req.query.id
    

    mongoData.find({_id : id},(err,data)=>{
        if (err){
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
})
//listener
app.listen(port,()=> console.log(`listening on localhost: ${ port }`))