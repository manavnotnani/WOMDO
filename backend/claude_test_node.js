import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";
dotenv.config();

const anthropic = new Anthropic({
  apiKey:
    process.env["ANTHROPIC_API_KEY"], // This is the default and can be omitted
});

export async function getRating(content) {
    try {
      const message = await anthropic.messages.create({
        max_tokens: 1024,
        messages: [{ role: "user", content: content }],
        model: "claude-3-opus-20240229",
      });
  
      console.log(message.content);
    } catch (error) {
      console.error("Error getting rating:", error);
    }
  }
  

let content = "can you tell on the scale of 10 how the person in this text is rating product named Growth School:\n `Firstly, how you can use LinkedIn. Not just to get a job but to generate leads for your business. Also making your personal brand. Second is AI and ChatGPT. You can do your work 10x faster by mastering it. And for that I will personally recommend you three hour paid workshop of Growth School. On mastering LinkedIn and ChatGPT. This workshop is paid but it is absolutely free for the first 1000 people. Registration link is in the description. I have myself attended this workshop and I will give it 5 out of 5`. I just want rating on the scale of 10 from you. The result should be only this -> `Rating: {Rating}`"

getRating(content);
