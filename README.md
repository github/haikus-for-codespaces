
# Haikus for Codespaces

This is a quick node project template for demoing Codespaces. It is based on the [Azure node sample](https://github.com/Azure-Samples/nodejs-docs-hello-world). It's great!!!

Point your browser to [Quickstart for GitHub Codespaces](https://docs.github.com/en/codespaces/getting-started/quickstart) for a tour of using Codespaces with this repo.
export GITHUB_TOKEN="<your-github-token-goes-here>"
$Env:GITHUB_TOKEN="<your-github-token-goes-here>"
set GITHUB_TOKEN=<your-github-token-goes-here>
{
  "type": "module",
  "dependencies": {
    "@azure-rest/ai-inference": "latest",
    "@azure/core-auth": "latest",
    "@azure/core-sse": "latest"
  }
}
import ModelClient from "@azure-rest/ai-inference";
import { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "cohere-embed-v3-multilingual";

export async function main() {

  const client = new ModelClient(endpoint, new AzureKeyCredential(token));

  const response = await client.path("/embeddings").post({
    body: {
      input: ["first phrase", "second phrase", "third phrase"],
      model: modelName
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  for (const item of response.body.data) {
    let length = item.embedding.length;
    console.log(
	  `data[${item.index}]: length=${length}, ` +
	  `[${item.embedding[0]}, ${item.embedding[1]}, ` +
	  `..., ${item.embedding[length - 2]}, ${item.embedding[length -1]}]`);
  }
  console.log(response.body.usage);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
