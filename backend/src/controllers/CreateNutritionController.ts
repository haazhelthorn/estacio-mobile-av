import {FastifyRequest, FastifyReply} from 'fastify';
import {CreateNutritionService} from '../services/CreateNutritionService'


class  CreateNutritionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    
    const createNutrition = new CreateNutritionService();

    const nutrition = await createNutrition.execute();

    return reply.send(nutrition);
    
  }
}

export { CreateNutritionController }