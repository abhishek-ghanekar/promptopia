// get request 
import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';
export const GET = async (request,{params}) => {
    try {
      await connectToDB();
      const prompt = await Prompt.findById(params.id).populate('creator');
      if(!prompt) return new Response("prompt not found", {status:404})
      return new Response(JSON.stringify(prompt), {status : 200})
    }catch(error) {
        return new Response("Failed To Fetch All the prompts", {status : 500})
    }
}
// patch to update
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
      await connectToDB();

      // Find the existing prompt by ID
      const existingPrompt = await Prompt.findById(params.id);

      if (!existingPrompt) {
          return new Response("Prompt not found", { status: 404 });
      }

      // Update the prompt with new data
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;

      await existingPrompt.save();

      return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
      return new Response("Error Updating Prompt", { status: 500 });
  }
};
// delete to delete
export const DELETE = async (request, {params}) => {
    try {
       await connectToDB();
       await Prompt.findByIdAndRemove(params.id);
       return new Response("Prompt Deleted Succesfully" , {status : 200});
    }catch(error) {
       return new Response("failed To delete prompt", {status : 500});
    }
}