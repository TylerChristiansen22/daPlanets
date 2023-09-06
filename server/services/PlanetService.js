import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"


class PlanetService {
    async createPlanet(body) {
        const newPlanet = await dbContext.Planets.create(body)
        await newPlanet.populate('galaxy')
        return newPlanet
    }
    async getPlanets(query) {
        const planets = await dbContext.Planets.find(query).populate('galaxy')
        return planets
    }
    async editPlanet(planetId, update) {
        const originalPlanet = await dbContext.Planets.findById(planetId)
        if (!originalPlanet) throw new BadRequest(`No planet at id ${planetId}`)
        originalPlanet.name = update.name || originalPlanet.name
        originalPlanet.biome = update.biome || originalPlanet.biome
        originalPlanet.atmosphere = update.atmosphere != undefined ? update.atmosphere : originalPlanet.atmosphere

        await originalPlanet.save()
        return originalPlanet
    }
    async deletePlanet(planetId) {
        const planetToDelete = await dbContext.Planets.findById(planetId)
        if (!planetToDelete) {
            throw new BadRequest(`No planet at id ${planetId}`)
        }
        await planetToDelete.remove()
        return `Removed planet at id ${planetId}. SHE GONE`
    }
    async getPlanetsByGalaxy(galaxyId) {
        const planets = await dbContext.Planets.find({ galaxyId }).populate('galaxy')
        return planets
    }
}


export const planetService = new PlanetService()