from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="google/gemma-7b-it",
    base_url="https://openrouter.ai/api/v1",
    api_key="YOUR_OPENROUTER_API_KEY"
)

response = llm.invoke([
    HumanMessage(content="Crie um flow de WhatsApp para enviar lembrete de pagamento automático toda segunda-feira.")
])

print(response.content)