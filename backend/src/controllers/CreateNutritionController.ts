import {FastifyRequest, FastifyReply} from 'fastify';

class  CreateNutritionController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    
    
    reply.send({ ok: true });
  }
}

export { CreateNutritionController }