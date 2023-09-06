import mongoose from "mongoose";
const Schema = mongoose.Schema


export const PlanetSchema = new Schema(
    {
        name: { type: String, required: true, maxLength: 50 },
        biome: { type: String, required: true, maxLength: 50 },
        atmosphere: { type: Boolean, required: true, default: true },
        galaxyId: { type: Schema.Types.ObjectId, ref: 'Galaxy', required: true }
    },
    { toJSON: { virtuals: true } }
)

PlanetSchema.virtual('galaxy', {
    localField: 'galaxyId',
    ref: 'Galaxy',
    foreignField: '_id',
    justOne: true
})