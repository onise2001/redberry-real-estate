import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const DragAndDrop = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <Container>
      <DropArea {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text>Drop the files here ...</Text>
        ) : (
          <PlusIcon src="/images/upload.png" />
        )}
      </DropArea>

      {uploadedFiles.length > 0 && (
        <UploadedImages>
          {uploadedFiles.map((file, index) => (
            <ImagePreview key={index}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                width="100%"
              />
              <p>{file.name}</p>
            </ImagePreview>
          ))}
        </UploadedImages>
      )}
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

const UploadedImages = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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
