import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true,
    maxLength : 150,
    trim : true
  },
  description : {
    type : String,    
  },
  status:{
    type : String,
    enum : ['TODO', 'IN_PROGRESS', 'DONE'],
    default : 'TODO',
    index : true 
  },
  priority : {
    type : String,
    enum : ['LOW', 'MEDIUM', 'HIGH'],
    default : 'MEDIUM',
    index : true
  },
  assignedTo : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required : true,
    index : true
  },
  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref:'User',
    required : true,
    index : true
  },
  dueDate : {
    type : Date,
    index : true
  },
  isDeleted : {
    type : Boolean,
    default : false,
    index : true
  },
   deletedAt: {
    type: Date
  },

}, {timestamps : true});


taskSchema.index({
  assignedTo : 1,
  isDeleted : 1,
  status : 1,
  priority : 1,
  dueDelete : 1
})

const Task = mongoose.model("Task", taskSchema);
export default Task;