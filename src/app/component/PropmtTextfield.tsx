"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";
import { useLpContext } from "./LpProvider";

const PropmtTextfield = () => {
  const { urls, files, setLoading, setResult, setActiveTab } = useLpContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [prompt, setPrompt] = useState<string>();

  /* <Button variant="contained" color="primary" fullWidth size="large" onClick={generateLP} disabled={loading || !prompt} sx={{ mt: 3 }}>
            {loading ? "生成中..." : "Create"}
          </Button> */

  const textformstyle: object = {
    p: 1,
    flexGrow: 1,
    "& .MuiOutlinedInput-root": {
      height: "auto",
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },

    // TextFieldの高さ調整
    "& .MuiInputBase-root": {
      alignItems: "center", // 中央寄せ
      padding: "1px 14px",
    },

    // テキストエリアの高さ調整
    "& .MuiInputBase-input": {
      padding: "0",
      "&::placeholder": {
        textAlign: "left", // placeholderを中央寄せ
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // 完全な中央寄せ
        width: "100%",
      },
    },
    // テキストが入力されたときのスタイル
    "& .MuiInputBase-input:not(:placeholder-shown)": {
      textAlign: "left",
    },
  };

  const adjustHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const generateLP = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("prompt", prompt!);
      urls.forEach((url, index) => {
        formData.append(`urls${index}`, url);
      });
      files.forEach((file, index) => {
        formData.append(`files${index}`, file);
      });
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      console.log("http://localhost");
      console.log(apiUrl);

      const response = await fetch(`${apiUrl}/api/generate-lp`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // FormDataを使用する場合はContent-Typeヘッダーを設定しない
        body: formData,
      });
      signal: AbortSignal.timeout(30000);
      const data = await response.json();
      console.log(data);

      setResult(data);
      setActiveTab(0);
    } catch (error) {
      console.error("Error generating LP:", error);
      alert("LP生成中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", overflow: "hidden", minHeight: "56px", borderRadius: "40px", width: "100%", transition: "height 0.2s ease" }}>
      <TextField sx={textformstyle} placeholder="For example, an LP that presents a portfolio" multiline fullWidth onChange={adjustHeight} />
      <Box sx={{ display: "flex", mr: 1, mb: 1, flexShrink: 0 }}>
        <IconButton onClick={() => generateLP()}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PropmtTextfield;
