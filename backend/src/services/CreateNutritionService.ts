import { DataProps } from "../controllers/CreateNutritionController";
import { GoogleGenerativeAI } from "@google/generative-ai";

class CreateNutritionService {
  async execute({
    name,
    weight,
    height,
    age,
    gender,
    objective,
    level,
  }: DataProps) {
    try {
      const apiKey = process.env.API_KEY!;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // gemini-1.5-flash or gemini-1.5-pro

      const response = await model.generateContent(
        `Crie uma dieta completa para uma pessoa com nome: ${name}, ${age} anos, ${height}cm, ${weight}kg, 
        ${gender} e com o foco e objetivo ${objective}, atualmente nível de atividade ${level} e ignore 
        qualquer outro parametro que não seja passados, retorne um json com as respectivas propriedades, 
        propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, 
        propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array 
        contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade 
        horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array 
        contendo os alimentos dessa refeição e pode incluir uma propriedade com suplementos contendo array 
        com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne 
        nenhuma observação além das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`
      );

      console.log(JSON.stringify(response, null, 2));

      if (response.response && response.response.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0]
          .text as string;

        let jsonString = jsonText
          .replace(/```\w*\n/g, "")
          .replace(/\n```/g, "")
          .trim();

        let jsonObject = JSON.parse(jsonString);

        return { data: jsonObject };
      }
    } catch (err) {
      console.error("Erro JSON: ", err);
      throw new Error("Erro ao criar nutrição");
    }
  }
}
export { CreateNutritionService };
