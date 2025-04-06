import axios from "axios";

let conversation = [];

export async function sendMsgToAI(message) {
  try {
    conversation.push({ question: message });

    const response = await axios.post(
        "http://testbed-gpu.info.uvt.ro:1234/ask",
        {
          question: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
    );

    const reply = response.data.response || "I'm sorry, I couldn't understand your request.";


    console.log(reply);
    return reply;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}