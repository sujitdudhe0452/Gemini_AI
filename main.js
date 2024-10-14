const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const express = require('express'); 
const app = express();
app.use(express.json()); 

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});
app.get('/', (req, res) => {
    res.send("Kya..Developer banega re tuuu..");
});

const generate = async (prompt) => {
    try 
    {
      const result = await model.generateContent(prompt);
      console.log(result.response.text());
      return result.response.text();   
    } catch (err) {
        console.log(err);
    }
}
// generate();

app.get('/api/content',async(req,res)=>
{
    try
    {
        const data = req.body.questions;
        const result = await generate(data);
        res.send({
            "result":result
        })
    }
    catch(err)
    {
        console.log(err);
    }
})
app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
})
