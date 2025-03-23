import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, IconButton  } from "@mui/material";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

type props = {
  files: File[];
  setFiles: (files: File[]) => void;
};
const FileUpload = ({ files, setFiles }: props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [duplicateFiles, setDuplicateFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles: File[] = [];
    const duplicates: File[] = [];

    if (acceptedFiles.length === 0) {
      setFileDialogOpen(true);
      return;
    }

    acceptedFiles.forEach((file) => {
      const isDuplicate = files.some((existingFile) => existingFile.name === file.name);
      if (isDuplicate) {
        duplicates.push(file);
      } else {
        newFiles.push(file);
      }
    });

    if (duplicates.length > 0) {
      setDuplicateFiles(duplicates);
      setDialogOpen(true);
    }

    if (newFiles.length > 0) {
      setFiles([...files, ...newFiles]);
    }
  };

  const handleOverwrite = () => {
    const updatedFiles = files.filter((existingFile) =>
      !duplicateFiles.some(dupFile => dupFile.name === existingFile.name)
    );
    setFiles([...updatedFiles, ...duplicateFiles]);
    setDialogOpen(false);
    setDuplicateFiles([]);
  };

    const handleCancel = () => {
      setDialogOpen(false);
      setDuplicateFiles([]);
    };
    const uploadFileCancel = () => {
      setFileDialogOpen(false);
    };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: true, // 複数ファイルを許可
  });

  return (
    <>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #cccccc",
          borderRadius: 2,
          padding: 3,
          textAlign: "center",
          backgroundColor: isDragActive ? "#e8f4ff" : "#fafafa",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
          color: "#1976d2",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? <Typography variant="subtitle1">ファイルをドロップしてください</Typography> : <Typography>ファイルをドラッグ&ドロップするか、クリックして選択してください
        <br></br>PDF Only </Typography>}
        {files.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <p>選択されたファイル: {files.length}件</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {files.map((file, index) => (
                <li key={index} style={{ margin: "8px 0" }}>
                    <IconButton onClick={() => setFiles(files.filter((_, i) => i !== index))}>
                      <RemoveCircleOutlineIcon color="error" />
                    </IconButton>
                  {file.name}
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
      <Dialog open={dialogOpen} onClose={handleCancel}>
        <DialogTitle>ファイルの上書き確認</DialogTitle>
        <DialogContent>
          <Typography>{duplicateFiles?.map((file) => file.name).join("\n")}は既にアップロードされています。上書きしますか？</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={handleCancel}>
            キャンセル
          </Button>
          <Button onClick={handleOverwrite} color="info">
            上書き
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={fileDialogOpen} onClose={uploadFileCancel}>
        <DialogTitle>PDFのみupload可能です。</DialogTitle>
        <DialogActions>
          <Button color="info" onClick={uploadFileCancel}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FileUpload;
