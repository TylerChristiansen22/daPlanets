import { moonService } from "../services/MoonService.js";
import BaseController from "../utils/BaseController.js";



export class MoonController extends BaseController {
    constructor() {
        super('api/moons')
        this.router
            .post('', this.createMoon)
            .get('', this.getMoons)
            .put('/:moonId', this.editMoon)
            .delete('/:moonId', this.deleteMoon)
    }
    async createMoon(request, response, next) {
        try {
            const body = request.body
            const newMoon = await moonService.createMoon(body)
            response.send(newMoon)
        } catch (error) {
            next(error)
        }
    }
    async getMoons(request, response, next) {
        try {
            const query = request.query
            const moons = await moonService.getMoons(query)
            response.send(moons)
        } catch (error) {
            next(error)
        }
    }
    async editMoon(request, response, next) {
        try {
            const update = request.body
            const moonId = request.params.moonId
            const editedMoon = await moonService.editMoon(moonId, update)
            response.send(editedMoon)
        } catch (error) {
            next(error)
        }
    }
    async deleteMoon(request, response, next) {
        try {
            const moonId = request.params.moonId
            const message = await moonService.deleteMoon(moonId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
}