import requests

def enviar_mensagem_whatsapp(integration, numero_destino, mensagem, pdf_path=None):
    url = f"https://graph.facebook.com/v19.0/{integration.phone_number_id}/messages"
    headers = {
        "Authorization": f"Bearer {integration.whatsapp_token}",
        "Content-Type": "application/json"
    }

    if pdf_path:
        data = {
            "messaging_product": "whatsapp",
            "to": numero_destino,
            "type": "document",
            "document": {
                "link": pdf_path,
                "caption": mensagem
            }
        }
    else:
        data = {
            "messaging_product": "whatsapp",
            "to": numero_destino,
            "type": "text",
            "text": {
                "body": mensagem
            }
        }

    response = requests.post(url, headers=headers, json=data)
    return response.json()
