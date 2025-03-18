"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { Box, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";

const PropmtTextfield = () => {
  // const formRef = useRef<HTMLFormElement>(null);
  // const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // // const [isPending, startTransition] = useTransition();
  // const { title, setTitle, option } = useChatContext();
  // const actionMessageWithOptions = async (state: State, formData: FormData) => {
  //   if (title == "") {
  //     return actionMessage(state, formData, option);
  //   } else {
  //     return actionMessage(state, formData);
  //   }
  // };
  // const [state, dispatch] = useActionState(actionMessageWithOptions, inisialState);

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
    // setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // const { isOpen } = useChatContext();
  // useEffect(() => {
  //   const trimmedValue = input.replace(/\r?\n/g, "").trim();
  //   setIsButtonDisabled(trimmedValue === "");
  // }, [input]);

  // const handleSubmit = async (formData: FormData) => {
  //   const userMessage = formData.get("userMessage") as string;

  //   startTransition(async () => {
  //     try {
  //       setMessages((prev: string[]) => [...prev, userMessage]);
  //       const result = await actionMessageWithOptions(state, formData);
  //       if (result.message) {
  //         setMessages((prev: string[]) => [...prev, result.message!]);
  //       }
  //       if (formRef.current) {
  //         formRef.current.reset();
  //       }
  //       setInput("");
  //       if (title == "") {
  //         setTitle(userMessage);
  //       }
  //     } catch (e) {
  //       console.error("送信エラー:", e);
  //     }
  //   });
  // };

  // console.log(placeholder);

  return (
    <form style={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", overflow: "hidden", minHeight: "56px", borderRadius: "40px", width: "100%", transition: "height 0.2s ease" }}>
        <TextField sx={textformstyle} placeholder="For example, an LP that presents a portfolio" multiline fullWidth onChange={adjustHeight} />
        <Box sx={{ display: "flex", mr: 1, mb: 1, flexShrink: 0 }}>
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </form>
  );
};

export default PropmtTextfield;
