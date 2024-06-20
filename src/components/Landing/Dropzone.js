import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@mui/material";

const Dropzone = ({ onUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append("images", file);
      });
      onUpload(formData, acceptedFiles);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography>Drop the images here...</Typography>
      ) : (
        <Typography>
          Drag & drop some images here, or click to select files
        </Typography>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #ff7100",
  borderRadius: "5px",
  padding: "20px",
  width: "80%",
  textAlign: "center",
  marginBottom: "20px",
  margin: "auto",
};

export default Dropzone;
