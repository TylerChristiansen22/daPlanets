import mongoose from "mongoose";
const Schema = mongoose.Schema


export const MoonSchema = new Schema(
    {
        name: { type: String, required: true, maxLength: 50 },
        planetId: { type: String, required: true, maxLength: 200 }
    }
)

MoonSchema.virtual('planet', {
    localField: 'planetId',
    ref: 'Planet',
    foreignField: '_id',
    justOne: true
})