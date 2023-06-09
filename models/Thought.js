const {Schema, Types, model}=require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
    // Default value is set to a new ObjectId   
        default:()=> new Types.ObjectId()
    },
    reactionBody:{ type:String, required:true, maxlength:280},
    username:{type:String, required:true},
     // Use built in date method to get current date
    lastReacted: { type: Date, default: Date.now },
},
{ 
    toJSON:{virtuals: true, getters:true},
     id:false
});


const thoughtSchema =new Schema({
    thoughtText: {type:String, required:true, minlength: 1, maxlength:280},
    username:{type:String, required:true},
    reactions:[reactionSchema],
    // Use built in date method to get current date
    timeOfThought: { type: Date, default: Date.now },
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