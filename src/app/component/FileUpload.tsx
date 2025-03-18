import {  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [duplicateFile, setDuplicateFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const isDuplicate = files.some((existingFile) => existingFile.name === file.name);
      if (isDuplicate) {
        setDuplicateFile(file);
        setDialogOpen(true);
      } else {
        setFiles(n => [...n, file]);
      }
    });
  };

  const handleOverwrite = () => {
    if (duplicateFile) {
      const newFiles = files.filter((f) => f.name !== duplicateFile.name);
      setFiles([...newFiles, duplicateFile]);
    }
    setDialogOpen(false);
    setDuplicateFile(null);
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setDuplicateFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"], // PDFファイルのみ許可
    },
    multiple: true, // 複数ファイルを許可
  });

  return (
    <><Box
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
      {isDragActive ? <Typography variant="subtitle1">ファイルをドロップしてください</Typography> : <Typography>ファイルをドラッグ&ドロップするか、クリックして選択してください</Typography>}
      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <p>選択されたファイル: {files.length}件</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {files.map((file, index) => (
              <li key={index} style={{ margin: "8px 0" }}>
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
          <Typography >
            {duplicateFile?.name}は既にアップロードされています。上書きしますか？
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={handleCancel}>キャンセル</Button>
          <Button onClick={handleOverwrite} color="info">
            上書き
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FileUpload;
