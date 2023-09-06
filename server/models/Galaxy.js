import mongoose from "mongoose";
const Schema = mongoose.Schema

export const GalaxySchema = new Schema(
    {
        name: { type: String, required: true, maxLength: 50 },
        stars: { type: Number, required: true, max: 1000000000 }
    },
    {
        timestamps: true, toJSON: { virtuals: true }
    }
)

GalaxySchema.virtual("planetCount", {
    localField: "_id",
    ref: "Planet",
    foreignField: "galaxyId",
    count: true
})