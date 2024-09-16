import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

interface DragAndDropProps {
  onDrop: (acceptedFiles: File) => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ onDrop }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]; // Only accept a single file
      if (file) {
        setUploadedFile(file);
        onDrop(file); // Pass the single file to the parent via onDrop
      }
    }, // Call handleDrop when files are dropped
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <Container>
      <DropArea {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text>Drop the file here ...</Text>
        ) : uploadedFile ? (
          <ImagePreview>
            <img
              src={URL.createObjectURL(uploadedFile)}
              alt="Preview"
              width="100%"
            />
            <p>{uploadedFile.name}</p>
          </ImagePreview>
        ) : (
          <PlusIcon src="/images/upload.png" />
        )}
      </DropArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

const DropArea = styled.div`
  width: 100%;
  height: 12rem;
  border: 2px dashed #cccccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 1.2rem;
  color: #666666;
`;

const ImagePreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  img {
    border-radius: 5px;
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;

const PlusIcon = styled.img``;

export default DragAndDrop;
