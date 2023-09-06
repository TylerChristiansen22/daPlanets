import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"



class GalaxyService {
    async createGalaxy(body) {
        const newGalaxy = await dbContext.Galaxies.create(body)
        return newGalaxy
    }
    async getGalaxies(query) {
        const galaxies = await dbContext.Galaxies.find(query).populate('planetCount')
        return galaxies
    }
    async editGalaxy(galaxyId, update) {
        const originalGalaxy = await dbContext.Galaxies.findById(galaxyId)
        if (!originalGalaxy) throw new BadRequest(`No Galaxy by the id ${galaxyId}`)

        originalGalaxy.name = update.name || originalGalaxy.name
        originalGalaxy.stars = update.stars != undefined ? update.stars : originalGalaxy.stars

        await originalGalaxy.save()
        return originalGalaxy
    }
    async deleteGalaxy(galaxyId) {
        const galaxyToDelete = await dbContext.Galaxies.findById(galaxyId)
        if (!galaxyToDelete) {
            throw new BadRequest(`No galaxy at id ${galaxyId}`)
        }
        await galaxyToDelete.remove()
        return `removed the galaxy at id ${galaxyId}. SHE GONE`
    }

}


export const galaxyService = new GalaxyService()