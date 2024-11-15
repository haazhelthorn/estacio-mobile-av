import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";

import { CreateNutritionController } from "./controllers/CreateNutritionController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
    let responseText =
      '```json\n{\n  "nome": "Alisson",\n  "sexo": "Masculino",\n  "idade": 31,\n  "altura": 180,\n  "peso": 85,\n  "objetivo": "Hipertrofia",\n  "refeicoes": [\n    {\n      "horario": "7:00",\n      "nome": "Cafe da manha",\n      "alimentos": [\n        "Aveia (50g)",\n        "Leite desnatado (200ml)",\n        "Banana (1 unidade)",\n        "Nozes (1 punhado)",\n        "Proteina de soro do leite (30g)"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da manha",\n      "alimentos": [\n        "Iogurte desnatado (1 unidade)",\n        "Frutas vermelhas (1 concha)"\n      ]\n    },\n    {\n      "horario": "13:00",\n      "nome": "Almoco",\n      "alimentos": [\n        "Arroz integral (1 concha)",\n        "Frango grelhado (150g)",\n        "Salada verde (1 concha)",\n        "Feijao (1 concha)"\n      ]\n    },\n    {\n      "horario": "16:00",\n      "nome": "Lanche da tarde",\n      "alimentos": [\n        "Batata doce (1 unidade media)",\n        "Queijo cottage (100g)"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "Carne vermelha magra (150g)",\n        "Batata doce (150g)",\n        "Brócolis (1 concha)"\n      ]\n    },\n    {\n      "horario": "21:00",\n      "nome": "Lanche antes de dormir",\n      "alimentos": [\n        "Caseina (30g)",\n        "Leite desnatado (100ml)"\n      ]\n    }\n  ],\n  "suplementos": [\n    "Proteina de soro do leite",\n    "Creatina",\n    "BCAA",\n    "Multivitaminico"\n  ]\n}\n```';

    try {
      let jsonString = responseText
        .replace(/```\w*\n/g, "")
        .replace(/\n```/g, "")
        .trim();

      let jsonObject = JSON.parse(jsonString);

      return reply.send({ data: jsonObject });
    } catch (err) {
      console.log("err", err);
    }
  });

  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutritionController().handle(request, reply);
    }
  );
}
