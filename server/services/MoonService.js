import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"



class MoonService {
    async createMoon(body) {
        const newMoon = await dbContext.Moons.create(body)
        await newMoon.populate('planet')
        return newMoon
    }
    async getMoons(query) {
        const moons = await dbContext.Moons.find(query).populate('planet')
        return moons
    }
    async editMoon(moonId, update) {
        const originalMoon = await dbContext.Moons.findById(moonId)
        if (!originalMoon) throw new BadRequest(`No planet at id ${moonId}`)
        originalMoon.name = update.name || originalMoon.name

        await originalMoon.save()
        return originalMoon
    }
    async deleteMoon(moonId) {
        const moonToDelete = await dbContext.Planets.findById(moonId)
        if (!moonToDelete) {
            throw new BadRequest(`No planet at id ${moonId}`)
        }
        await moonToDelete.remove()
        return `Removed planet at id ${moonId}. SHE GONE`
    }
    async getMoonsByPlanet(planetId) {
        const moons = await dbContext.Moons.find({ planetId }).populate('planet')
        return moons
    }
}


export const moonService = new MoonService()