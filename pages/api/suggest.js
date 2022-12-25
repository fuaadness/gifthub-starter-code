const { Configuration, OpenAIApi } =
require("openai");

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new
OpenAIApi(configuration);

async function getSuggestions(prompt){  const response = await 
    openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.50,
        //davinci-003 model can do max 4000
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });

    //const choices = response.data.choices[0].text;
    //var res = JSON.parse(choices);
    var res = response.data.choices[0].text;
    return res;
}

export default async function handler(req, res) {
    const { interests, type } = req.body;
    const prompt = `Write a 500 word cover letter for a candidate who has the following background: ${interests} and wants to apply for the following job: ${type}. Link the candidate's background to key requirements mentioned in the job vacancy. Return the result only in a string format.`;
    
    var choices = await getSuggestions(prompt);
    return res.status(200).json({ data: choices});
}