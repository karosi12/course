import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new mongoose.Schema(
  {
    course_name: { type: String },
    registration_date: { type: Date, default: Date.now },
    student_id: {  
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

courseSchema.index({ '$**': 'text' });


const courseModel = mongoose.model("course", courseSchema);

export default courseModel;
