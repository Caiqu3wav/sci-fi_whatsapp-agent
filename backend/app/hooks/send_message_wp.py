import requests

def send_message_wp(integration, numero_destino, mensagem, pdf_path=None):
    url = f"https://graph.facebook.com/v19.0/{integration.phone_number_id}/messages"
    headers = {
        "Authorization": f"Bearer {integration.whatsapp_token}",
        "Content-Type": "application/json"
    }

    data = {
        "messaging_product": "whatsapp",
        "to": numero_destino,
        "type": "text",
        "text": {
            "body": mensagem
        }
    }

    """
    if pdf_path:
        # Você precisa hospedar o arquivo em um link público
        link_arquivo = hospedar_pdf_temporariamente(pdf_path)  # função que faz isso
        data = {
            "messaging_product": "whatsapp",
            "to": numero_destino,
            "type": "document",
            "document": {
                "link": link_arquivo,
                "caption": mensagem
            }
        }
    """

    response = requests.post(url, headers=headers, json=data)
    return response.json()
