import { moonService } from "../services/MoonService.js";
import { planetService } from "../services/PlanetService.js";
import BaseController from "../utils/BaseController.js";


export class PlanetController extends BaseController {
    constructor() {
        super('api/planets')
        this.router
            .post('', this.createPlanet)
            .get('', this.getPlanets)
            .put('/:planetId', this.editPlanet)
            .delete('/:planetId', this.deletePlanet)
            .get('/:planetId/moons', this.getMoonsByPlanet)
    }
    async createPlanet(request, response, next) {
        try {
            const body = request.body
            const newPlanet = await planetService.createPlanet(body)
            response.send(newPlanet)
        } catch (error) {
            next(error)
        }
    }
    async getPlanets(request, response, next) {
        try {
            const query = request.query
            const planets = await planetService.getPlanets(query)
            response.send(planets)
        } catch (error) {
            next(error)
        }
    }
    async editPlanet(request, response, next) {
        try {
            const update = request.body
            const planetId = request.params.planetId
            const editedPlanet = await planetService.editPlanet(planetId, update)
            response.send(editedPlanet)
        } catch (error) {
            next(error)
        }
    }
    async deletePlanet(request, response, next) {
        try {
            const planetId = request.params.planetId
            const message = await planetService.deletePlanet(planetId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
    async getMoonsByPlanet(request, response, next) {
        try {
            const planetId = request.params.planetId
            const moons = await moonService.getMoonsByPlanet(planetId)
            response.send(moons)
        } catch (error) {
            next(error)
        }
    }
}