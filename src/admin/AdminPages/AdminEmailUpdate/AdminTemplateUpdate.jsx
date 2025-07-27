import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  Container,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AdminEmailupdate.css";
import CloseIcon from "@mui/icons-material/Close";

export default function AdminTemplateUpdate({ value, close }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // ✅ This enables heading dropdown
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const [title, setTitle] = useState(value.title);
  const [content, setContent] = useState(value.content);

  const handleSave = () => {
    console.log("Title:", title);
    console.log("Content:", content);
    alert("Saved!");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      className="container"
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Edit Blog Post
        </Typography>

        {/* Editable Title */}
        <TextField
          fullWidth
          variant="outlined"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Rich Text Editor */}
        <Typography variant="subtitle1" gutterBottom>
          Content
        </Typography>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: 1,
            mb: 3,
            "& .ql-container": {
              minHeight: "200px",
              backgroundColor: "#000", // ✅ Background black
            },
            "& .ql-editor": {
              color: "#fff", // ✅ Text white
            },
            "& .ql-toolbar": {
              backgroundColor: "#111", // Optional: dark toolbar
              borderBottom: "1px solid #444",
            },
            "& .ql-picker": {
              color: "#fff", // ✅ Picker dropdown text white
            },
            "& .ql-picker-options": {
              backgroundColor: "#111", // ✅ Dropdown background
              color: "#fff",
            },
          }}
        >
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
          />
        </Box>

        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Post
        </Button>
      </Paper>
      <CloseIcon
        sx={{
          position: "absolute",
          right: "140px",
          top: "40px ",
          fontWeight: "bold",
          color: "red",
          cursor: "pointer",
          fontSize: "30px",
        }}
        onClick={() => {
          close(false);
          // You can setState(false) or call props.onClose() here
        }}
      />
    </Container>
  );
}
