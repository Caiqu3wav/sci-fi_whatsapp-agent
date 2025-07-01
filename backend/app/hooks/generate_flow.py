from typing import Dict
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

load_dotenv()


def gerar_flow_customizado(prompt_usuario: str) -> Dict:
    llm = ChatOpenAI(
        model="google/gemma-7b-it",
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_KEY")
    )

    system_instruction = """
Você é um agente que cria estruturas de automações de WhatsApp.
Retorne um dicionário com os campos: name, description, message_template, target_type, schedule_time (em ISO8601), pdf_path (se tiver).
Se não souber algum valor, use null.
"""

    full_prompt = f"{system_instruction}\n\nUsuário: {prompt_usuario}"

    resposta = llm.invoke([
        HumanMessage(content=full_prompt)
    ])

    try:
        # Força o retorno em JSON
        import json
        return json.loads(resposta.content)
    except Exception as e:
        print("Erro ao interpretar a resposta do LLM:", e)
        return {}
