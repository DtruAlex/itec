import axios from "axios";
const apiKey = process.env.OPENAI_API_KEY;

let conversation = [];

export async function sendMsgToOpenAI(message) {
  try {
    conversation.push({ role: "system", content: "You are a helpful assistant." });
    conversation.push({ role: "user", content: message });

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: conversation,
        model: "gpt-3.5-turbo",
        max_tokens: 2000,
        temperature: 1
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply =
      response.data.choices[0].message.content ||
      "I'm sorry, I couldn't understand your request.";

    conversation.push({ role: "assistant", content: reply });

    console.log(reply);
    return reply;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
  }
}
