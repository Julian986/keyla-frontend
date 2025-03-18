import axios from "axios";

// Cuenta con el gmail js70...
// Averiguar esto:
/* Estás usando una cuenta gratuita de Cohere.
El uso de las claves API y las aplicaciones de Cohere es gratuito, pero limitado. 
Para usar la API y las aplicaciones de Cohere sin limitaciones de prueba, solo tienes que completar un breve formulario de solicitud 
(lo que nos ayuda a garantizar la seguridad de nuestra comunidad y de los usuarios finales afectados por los modelos de Cohere). */

const API_KEY = "2AfcHZe7VC9qV8LgN0D6Ta4GVQc2Mxsd8EmOvasW"; // Reemplaza con tu API Key de Cohere
const API_URL = "https://api.cohere.com/v1/generate";

interface CohereResponse {
  generations: { text: string }[];
}

export const sendMessageToCohere = async (message: string): Promise<string> => {
  const requestBody = {
    model: "command",
    prompt: message,
    max_tokens: 100,
    temperature: 0.7,
  };

  try {
    const response = await axios.post<CohereResponse>(API_URL, requestBody, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.generations[0].text;
  } catch (error) {
    console.error("Error al enviar mensaje a Cohere:", error);
    return "Ocurrió un error al procesar la respuesta.";
  }
};
