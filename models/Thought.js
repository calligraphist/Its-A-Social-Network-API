const {Schema, Types, model}=require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
    // Default value is set to a new ObjectId   
        default:()=> new Types.ObjectId()
    },
    reactionBody:{ type:String, required:true, maxlength:280},
    username:{type:String, required:true},
    //todo: add created at
},
{ 
    toJSON:{virtuals: true, getters:true},
     id:false
});


const thoughtSchema =new Schema({
    thoughtText: {type:String, required:true, minlength: 1, maxlength:280},
    username:{type:String, required:true},
    reactions:[reactionSchema]
      //todo: add created at
},
{
    toJSON:{virtuals: true, getters: true},
    id:false
});

thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
});

const Thought= model("Thought", thoughtSchema)

module.exports = Thought;