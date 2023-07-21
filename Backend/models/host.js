const mongoose=require("mongoose")

const propertySchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    years:{
        type:Date.now,
    },
    active:{
        type:Boolean,
        default:true
    },
    host:{
        
    }
})

const PropertyModel=mongoose.model("Property", propertySchema)

module.exports={PropertyModel}