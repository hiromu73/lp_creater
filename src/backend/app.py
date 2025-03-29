
from typing import List
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8000",
    "http://localhost:3000",
]

# CORSの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Next.jsのデフォルトポート
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# レスポンスモデルの定義
class LPResponse(BaseModel):
    html: str
    css: str
    preview_image: str = ""

# LangChainを使ったLP生成
def generate_lp_with_langchain(prompt: str, files: list, urls: list):

    llm = OpenAI(temperature=0.7, model="gpt-3.5-turbo-instruct", openai_api_key=os.getenv("OPENAI_API_KEY"))

    # プロンプトテンプレートの作成
    template = """
    あなたはLPデザイナーです。以下の要件に基づいてランディングページのHTMLとCSSを生成してください。

    requirement: {prompt}
    Reference URL: {urls}
    File to be included: {files}

    以下の形式でHTMLとCSSを返してください:

    HTML:
    ```html
    (ここにHTML)
    ```

    CSS:
    ```css
    (ここにCSS)
    ```
    """

    prompt_template = PromptTemplate(
        input_variables=["prompt", "urls", "files"],
        template=template
    )

    # チェーンの作成と実行
    chain = LLMChain(llm=llm, prompt=prompt_template)
    result = chain.run(prompt=prompt, urls=urls, files=files)
    print("result")
    print(result)
    # 結果の解析
    html_part = result.split("HTML:")[0].split("```html")[0].split("```")[0].strip()
    css_part = result.split("CSS:")[0].split("```css")[0].split("```")[0].strip()

    print("html_part")
    print(result.split("HTML:")[0])
    print(result.split("CSS:")[0])
    return {
        "html": html_part,
        "css": css_part
    }

@app.post("/api/generate-lp", response_model=LPResponse)
async def generate_lp(
    prompt: str = Form(...),
    files: List[UploadFile] = File(None),
    urls: List[str] = Form(None)):

    try:
        # LangChainでLP生成
        result = generate_lp_with_langchain(
            prompt,
            files,
            urls
        )

        print("------------")
        print("--html--")
        print(result["html"])
        print("--css--")
        print(result["css"])

        return LPResponse(
            html=result["html"],
            css=result["css"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
