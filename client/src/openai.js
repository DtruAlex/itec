import axios from "axios";

const apiKey="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"

export async function sendMsgToOpenAI(message) {
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 256,
      temperature: 1,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
  }
}
