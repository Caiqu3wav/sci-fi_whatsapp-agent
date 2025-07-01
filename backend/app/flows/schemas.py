# schemas.py
from pydantic import BaseModel
from typing import Optional

class FlowPromptRequest(BaseModel):
    user_id: str
    prompt: str

class FlowResponse(BaseModel):
    id: str
    name: str
    description: str
    message_template: Optional[str]
    target_type: Optional[str]
    schedule_time: Optional[str]
    pdf_path: Optional[str]
