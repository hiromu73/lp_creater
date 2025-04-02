
from typing import List
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
import os
from dotenv import load_dotenv
import logging

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

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# 実行確認
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.on_event("startup")
async def startup_event():
    logger.debug("Application startup")

@app.get("/health-check")
async def health_check():
    return {"status": "ok"}

# LangChainを使ったLP生成
async def generate_lp_with_langchain(prompt: str, files: list, urls: list):

    llm = OpenAI(temperature=0.2, model="gpt-3.5-turbo-instruct", openai_api_key=os.getenv("OPENAI_API_KEY"),max_tokens=2000 )

    # プロンプトテンプレートの作成
    template = """
    You are a front-end developer specializing in the creation of landing pages.
    Please create a modern and professional landing page using HTML, CSS and ui libraries based on the following requirements.
    Also, please consider directory structure.
    Use {urls} as a reference URL if it exists.
    {files} must be included if present

    Requirements: {prompt}
    Reference URLs: {urls}
    Files to include: {files}

    Important Guidelines:
    1. Use semantic HTML5 elements
    2. Make the design responsive
    3. Follow modern CSS best practices
    4. Ensure accessibility standards
    5. Optimize for performance
    6.

    Required Sections:
    - Header with navigation
    - Hero section
    - Main content area
    - Call to action
    - Footer

    You must provide both HTML and CSS code separately, strictly following this format:

    HTML CODE:
    ```html
    [Your HTML code here]
    ```

    CSS CODE:
    ```css
    [Your CSS code here]
    ```

    Ensure that:
    1. Both HTML and CSS are complete and well-formatted
    2. CSS selectors match the HTML elements
    3. All sections are properly styled
    4. The design is modern and professional
    """

    prompt_template = PromptTemplate(
        input_variables=["prompt", "urls", "files"],
        template=template
    )

    # チェーンの作成と実行
    chain = LLMChain(llm=llm, prompt=prompt_template)
    result = chain.run(prompt=prompt, urls=urls, files=files)

    print("--result--")
    print(result)
    print("------resultEnd------")
    # print(result)
    try:
        # 結果の解析を改善
        html_css_split = result.split("HTML CODE:")
        if len(html_css_split) > 1:
            print(len(html_css_split))
            print("--html_css_split[1].split()[0]---")
            print(html_css_split[1].split("CSS CODE:")[0])
            print("------------")
            print("-------html_css_split[1].split()[1]-----")
            print(html_css_split[1].split("CSS CODE:")[1])
            print("------------")

            html_part = html_css_split[1].split("CSS CODE:")[0]
            css_part = html_css_split[1].split("CSS CODE:")[1]

            # コードブロックの抽出を改善
            html_content = html_part.split("```html")[1].split("```")[0].strip()
            css_content = css_part.split("```css")[1].split("```")[0].strip()
        else:
            # バックアップパース方法
            html_content = result.split("```html")[1].split("```")[0].strip()
            css_content = result.split("```css")[1].split("```")[0].strip()

        # 結果の検証
        if not html_content or not css_content:
            raise ValueError("HTML or CSS content is missing")

        return {
            "html": html_content,
            "css": css_content
        }

    except Exception as e:
            logger.error(f"Error parsing LLM response: {e}")
            logger.debug(f"Raw LLM response: {result}")
            raise HTTPException(
                status_code=500,
                detail="Failed to generate valid HTML and CSS"
            )

@app.post("/api/generate-lp", response_model=LPResponse)
async def generate_lp(
    prompt: str = Form(...),
    files: List[UploadFile] = File(None),
    urls: List[str] = Form(None)):

    logger.debug("Received generate-lp request")

    try:
        logger.debug("Processing complete")

        # LangChainでLP生成
        result = await generate_lp_with_langchain(
            prompt,
            files,
            urls
        )

        print("------------")
        print("--html--")
        print(result["html"])
        print("------------")
        print("--css--")
        print(result["css"])
        print("------------")

        return LPResponse(
            html=result["html"],
            css=result["css"]
        )

    except Exception as e:
        logger.error(f"Error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
