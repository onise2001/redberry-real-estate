import { useState, forwardRef, useImperativeHandle } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

// Custom type for the ref
export interface DragAndDropRef {
  reset: () => void;
}

interface DragAndDropProps {
  onDrop: (acceptedFiles: File) => void;
  $hasError: boolean;
}

const DragAndDrop = forwardRef<DragAndDropRef, DragAndDropProps>(
  ({ onDrop, $hasError }, ref) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setUploadedFile(null);
      },
    }));

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          setUploadedFile(file);
          onDrop(file);
        }
      },
      accept: { "image/*": [] },
      multiple: false,
      noClick: true,
    });

    return (
      <Container>
        <DropArea $hasError={$hasError} {...getRootProps()} onClick={open}>
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
  }
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

const DropArea = styled.div<{ $hasError: boolean }>`
  width: 100%;
  height: 12rem;
  border: ${({ $hasError }) =>
    $hasError ? "2px dashed red" : "2px dashed #cccccc"};
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
