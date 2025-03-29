import { Box, Typography } from "@mui/material";
import Promptare from "./component/Promptare";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession(authOptions);

  // 未認証の場合はサインインページへ
  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: 40 }}>What can I help you ship?</Typography>
      </Box>
      <Promptare />
    </Box>
  );
};
export default Home;
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
