from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
import json
import os
from dotenv import load_dotenv

load_dotenv()

def flow_generator(prompt: str):
    system_instruction = """
Você é um gerador de fluxos de automação para WhatsApp. Com base no prompt do usuário, gere um JSON com:
- name
- description
- message_template
- target_type (client, group ou custom_number)
- schedule_time (formato ISO)
- pdf_path (opcional)
"""

    llm = ChatOpenAI(
        model="google/gemma-7b-it",
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_KEY")
    )

    response = llm.invoke([
        HumanMessage(content=system_instruction + "\n\nUsuário: " + prompt)
    ])

    try:
        return json.loads(response.content)
    except Exception as e:
        raise ValueError(f"Erro ao interpretar resposta da IA: {e}")