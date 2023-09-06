import { galaxyService } from "../services/GalaxyService.js";
import { planetService } from "../services/PlanetService.js";
import BaseController from "../utils/BaseController.js";



export class GalaxyController extends BaseController {
    constructor() {
        super('api/galaxies')
        this.router
            .post('', this.createGalaxy)
            .get('', this.getGalaxies)
            .put('/:galaxyId', this.editGalaxy)
            .delete('/:galaxyId', this.deleteGalaxy)
            .get('/:galaxyId/planets', this.getPlanetsByGalaxy)
    }
    async createGalaxy(request, response, next) {
        try {
            const body = request.body
            const newGalaxy = await galaxyService.createGalaxy(body)
            response.send(newGalaxy)
        } catch (error) {
            next(error)
        }
    }
    async getGalaxies(request, response, next) {
        try {
            const query = request.query
            const galaxies = await galaxyService.getGalaxies(query)
            response.send(galaxies)
        } catch (error) {
            next(error)
        }
    }
    async editGalaxy(request, response, next) {
        try {
            const update = request.body
            const galaxyId = request.params.galaxyId
            const editedGalaxy = await galaxyService.editGalaxy(galaxyId, update)
            response.send(editedGalaxy)
        } catch (error) {
            next(error)
        }
    }
    async deleteGalaxy(request, response, next) {
        try {
            const galaxyId = request.params.galaxyId
            const message = await galaxyService.deleteGalaxy(galaxyId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
    async getPlanetsByGalaxy(request, response, next) {
        try {
            const galaxyId = request.params.galaxyId
            const planets = await planetService.getPlanetsByGalaxy(galaxyId)
            response.send(planets)
        } catch (error) {
            next(error)
        }
    }
}