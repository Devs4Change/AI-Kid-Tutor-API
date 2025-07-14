import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const courseSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: String, required: true },
    lessons: { type: Number, required: true },
    description: { type: String, required: true },
}, {timestamps: true});

courseSchema.plugin(toJSON);

export const CourseModel = model("Course", courseSchema);