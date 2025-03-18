"use client";
// import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Promptare from "./component/Promptare";


// LPリクエストの型定義
// interface LPRequest {
//   prompt: string;
//   style: string;
//   elements: string[];
// }

// // LPレスポンスの型定義
// interface LPResponse {
//   html: string;
//   css: string;
//   preview_image?: string;
// }

export default function Home() {
  // const [prompt, setPrompt] = useState("");
  // const [style, setStyle] = useState("modern");
  // const [elements, setElements] = useState(["header", "hero", "features", "testimonials", "cta", "footer"]);
  // const [loading, setLoading] = useState(false);
  // const [result, setResult] = useState<LPResponse | null>(null);
  // const [activeTab, setActiveTab] = useState(0);

  // // 利用可能なスタイル一覧
  // const availableStyles = ["modern", "minimalist", "corporate", "creative", "bold"];

  // // 利用可能な要素一覧
  // const availableElements = ["header", "hero", "features", "benefits", "testimonials", "pricing", "cta", "faq", "about", "contact", "footer"];

  // LP生成リクエスト
  // const generateLP = async () => {
  //   setLoading(true);
  //   console.log("生成実行");
  //   console.log(prompt);
  //   console.log(style);
  //   console.log(elements);

  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/api/generate-lp", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         prompt,
  //         style,
  //         elements,
  //       } as LPRequest),
  //     });
  //     const data = await response.json();
  //     console.log(`data = ${data}`);

  //     setResult(data);
  //     setActiveTab(1);
  //   } catch (error) {
  //     console.error("Error generating LP:", error);
  //     alert("LP生成中にエラーが発生しました。");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // HTML編集用のハンドラー
  // const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   if (result) {
  //     setResult({
  //       ...result,
  //       html: e.target.value,
  //     });
  //   }
  // };

  // CSS編集用のハンドラー
  // const handleCssChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   if (result) {
  //     setResult({
  //       ...result,
  //       css: e.target.value,
  //     });
  //   }
  // };

  // // タブ変更ハンドラー
  // const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
  //   setActiveTab(newValue);
  // };

  // LPをダウンロード
  // const handleDownload = () => {
  //   if (!result) return;

  //   const htmlContent = `
  //     <!DOCTYPE html>
  //     <html lang="ja">
  //     <head>
  //       <meta charset="UTF-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <title>Generated Landing Page</title>
  //       <style>${result.css}</style>
  //     </head>
  //     <body>
  //       ${result.html}
  //     </body>
  //     </html>
  //   `;

  // console.log(htmlContent);

  // const blob = new Blob([htmlContent], { type: "text/html" });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "landing-page.html";
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // };

  // console.log(result?.html);
  // console.log(result?.css);

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: 40 }}>What can I help you ship?</Typography>
      </Box>
      <Promptare />
    </Box>
  );
}

/* <Header /> */

/* <Paper sx={{ m: 2, p: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="生成" />
            <Tab label="プレビュー" disabled={!result} />
            <Tab label="コード編集" disabled={!result} />
          </Tabs>

          {activeTab === 0 && (
            <Box sx={{ mt: 3 }}>
              <TextField label="ランディングページの内容を詳しく説明してください" multiline rows={6} fullWidth variant="outlined" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="例: 革新的なAIチャットボットサービスのランディングページ。主な機能は24時間対応、多言語サポート、カスタマイズ可能なUI。ターゲットは中小企業。" />

              <Box sx={{ mt: 3, mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>デザインスタイル</InputLabel>
                  <Select value={style} onChange={(e) => setStyle(e.target.value)} label="デザインスタイル">
                    {availableStyles.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mt: 3, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  含める要素:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {availableElements.map((elem) => (
                    <Chip
                      key={elem}
                      label={elem}
                      clickable
                      color={elements.includes(elem) ? "primary" : "default"}
                      onClick={() => {
                        if (elements.includes(elem)) {
                          setElements(elements.filter((e) => e !== elem));
                        } else {
                          setElements([...elements, elem]);
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Button variant="contained" color="primary" fullWidth size="large" onClick={generateLP} disabled={loading || !prompt} sx={{ mt: 3 }}>
                {loading ? "生成中..." : "ランディングページを生成"}
              </Button>
            </Box>
          )}

          {activeTab === 1 && result && (
            <Box sx={{ mt: 3 }}>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Button variant="outlined" onClick={handleDownload}>
                  HTMLをダウンロード
                </Button>
              </Paper>

              <Paper sx={{ p: 0, border: "1px solid #eee", borderRadius: 2, overflow: "hidden" }}>
                <Box sx={{ width: "100%", height: "600px" }}>
                  <iframe
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <style>${result.css}</style>
                        </head>
                        <body>
                          ${result.html}
                        </body>
                      </html>
                    `}
                    style={{ width: "100%", height: "100%", border: "none" }}
                    title="LP Preview"
                  />
                </Box>
              </Paper>
            </Box>
          )}

          {activeTab === 2 && result && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                HTMLコード
              </Typography>
              <TextField multiline rows={10} fullWidth variant="outlined" value={result.html} onChange={handleHtmlChange} />

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                CSSコード
              </Typography>
              <TextField multiline rows={10} fullWidth variant="outlined" value={result.css} onChange={handleCssChange} />

              <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => setActiveTab(1)}>
                プレビューで確認
              </Button>
            </Box>
          )}
        // </Paper> */
