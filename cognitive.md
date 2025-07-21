# Step-by-Step Guide: Configuring Azure Cognitive Service in the Azure Portal

## 1. Sign In and Prepare

- Go to [portal.azure.com](https://portal.azure.com) and sign in with your Azure account.
- Ensure you have the right permissions (Contributor role or higher), and you know your preferred **Subscription** and **Resource Group**.
  - If you don’t have a resource group, you can create one during the process.

## 2. Create a New Azure Cognitive Services (AI Services) Resource

1. **Start Resource Creation**
   - In the left sidebar, select **Create a resource**.

2. **Find Cognitive Services**
   - In the search bar, type **Cognitive Services** and select **Azure AI services** (formerly Cognitive Services) from the Marketplace results[1][2].

3. **Begin Configuration**
   - Click **Create** to launch the creation wizard.

4. **Configure the Basics**
   - **Subscription**: Choose the Azure subscription to use.
   - **Resource Group**: Select an existing resource group or create a new one.
   - **Region**: Pick the Azure region (choose the one closest to your users).
   - **Name**: Enter a unique resource name, e.g., `MyAIServicesResource`.

5. **Pricing Tier**
   - Choose a pricing tier. For development, the **Standard S0** tier is commonly used, offering access to most services.

6. **Select Resource Type**
   - For broad access, ensure you select the **Multi-Service** (sometimes called “AI Foundry” or “AIServices”) resource. This will let you use Speech, Translator, Vision, and Language services under one resource[2][3].

7. **Review & Create**
   - Review your configuration.
   - Click **Review + create**.
   - After validation completes, click **Create** to deploy the resource.

## 3. Retrieve Keys and Endpoints

- Once deployment finishes, go to your new Cognitive Services resource.
- In the resource overview, find the **Keys and Endpoint** section (in the sidebar or overview blade).
- You will see:
  - **Endpoint** (URI): The base URL for service API calls.
  - **Key1** and **Key2**: Use either key for authenticating your application[1][4].

**Tip:** Store these secrets securely (Azure Key Vault, app config).

## 4. Enable Specific AI Capabilities

The multi-service resource covers most needs, but for certain features, you may need to enable or configure them individually.

- **Speech Services**: No extra setup needed—use existing keys and endpoints.
- **Translator**: Use the same keys and endpoints for text translation.
- **Language Understanding (LUIS)**: Either attach LUIS to this resource or create separately if you need advanced intent/extraction support.
- **OpenAI GPT**: If required, create an Azure OpenAI resource separately from the portal, following the same steps.

## 5. Networking and Security (Optional)

- If you need to restrict access to your services (for compliance/security):
  - Go to **Networking** in your Cognitive Services resource and configure **Virtual Networks**, firewalls, and access rules[5].
- Always use HTTPS endpoints.
- Limit access with role-based access control and Managed Identities as needed.

## 6. Test Your Cognitive Service

- Use the **Quickstart** section in your Cognitive Services resource for sample code.
- You can send REST API requests or use SDKs for supported programming languages (Python, C#, Node.js).

## 7. Next Steps

- Integrate your keys and endpoints into your backend functions.
- Use the Speech, Translator, and Language APIs for your solution’s AI workflows.

By following these steps, you will have a fully configured, production-ready Azure Cognitive Services resource supporting all necessary AI-powered features for your project[2][1][3].

Sources
[1] How to get started with Azure Cognitive Services - Accessible AI https://accessibleai.dev/post/azure_cognitive_services/
[2] Create an AI Foundry resource - Azure AI services - Learn Microsoft https://learn.microsoft.com/en-us/azure/ai-services/multi-service-resource
[3] Quickstart: Create an Azure AI services resource https://docs.azure.cn/en-us/ai-services/multi-service-resource
[4] Set up Cognitive Services | SynapseML - Microsoft Open Source https://microsoft.github.io/SynapseML/docs/Get%20Started/Set%20up%20Cognitive%20Services/
[5] Configure Virtual Networks for Azure AI services - Learn Microsoft https://learn.microsoft.com/en-us/azure/ai-services/cognitive-services-virtual-networks
[6] Creating an Azure Cognitive Services Account - Pluralsight https://www.pluralsight.com/resources/blog/guides/azure-cognitive-services-account-creating
[7] Create an Azure AI Search service in the Azure portal - Learn Microsoft https://learn.microsoft.com/en-us/azure/search/search-create-service-portal
[8] Part 4:- How to Create Azure Cognitive or Azure AI Search Service ... https://www.youtube.com/watch?v=spbWx1DP3F8
[9] Walkthrough: Configure Azure Cognitive Search https://doc.sitecore.com/xp/en/developers/93/platform-administration-and-architecture/walkthrough--configure-azure-cognitive-search.html
[10] Build a computer vision app with Azure Cognitive Services - Coursera https://www.coursera.org/projects/build-a-computer-vision-app-with-azure-cognitive-services
