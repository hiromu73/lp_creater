import { Box, TextField, IconButton, Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";


type Props = {
  urls: string[],
  setUrls: (urls: string[]) => void,
}
const Urlfield = ({ urls, setUrls }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // const [urls, setUrls] = useState<string[]>([]);
  const [target, setTarget] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);
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
    setTarget(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleAddUrl = () => {
    if (target.toLowerCase().startsWith("http")) {
      setUrls([...urls, target]);
      setTarget("");
    } else {
      setDialogOpen(true);
    }
  };
  const handleOk = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", mr: 1, mb: 1, flexShrink: 0 }}>
        <IconButton onClick={() => handleAddUrl()}>
          <AddIcon />
        </IconButton>
        <TextField sx={textformstyle} placeholder="https://nextjs.org/test/test/test/test/test/test/test" multiline fullWidth onChange={adjustHeight}
        value={target}  />
      </Box>
      <Dialog open={dialogOpen} onClose={handleOk}>
        <DialogContent>
          <Typography>urlを入力して下さい</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={handleOk}>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Urlfield;
