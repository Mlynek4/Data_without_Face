
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# definiujesz model danych
class TextRequest(BaseModel):
    text: str  # FastAPI wie, że "text" musi być stringiem

@app.post("/api/anonymize")
def anonymize_text(req: TextRequest):
    text = req.text  # bezpieczne, zawsze string
    return {"text": text.upper()}
