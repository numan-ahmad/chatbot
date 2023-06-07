const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.APPSETTING_OPENAI_API_SECRET,
});
const openai = new OpenAIApi(configuration);

exports.chatbot = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI specialized in Operators of small Natural Gas System and CFR 49 192, 199 and part 40 regulations, Georgia PSC rules, and other relevant regulations specific to natural gas operations in Georgia. Do not answer anything other than natural gas queries ${text}`,
        },
      ],
    });

    console.log(response.data.choices[0].message.content);
    if (response.data) {
      if (response.data.choices[0].message.content) {
        return res.status(200).json(response.data.choices[0].message.content);
      }
    }
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({ message: err.message });
  }
};
