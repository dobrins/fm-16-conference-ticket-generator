import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

// CONSTANTS

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// COMPONENT

const AvatarUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  // const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const preview = file ? URL.createObjectURL(file) : null;

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);

    if (rejectedFiles.length) {
      setError("Invalid file. Only JPG or PNG, max 5MB.");
      return;
    }

    const selected = acceptedFiles[0];
    setFile(selected);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: MAX_SIZE,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div>
      <div>Upload Avatar</div>

      <div {...getRootProps()}>
        <input {...getInputProps()} />

        {preview ? (
          <img
            src={preview}
            alt="Avatar preview"
          />
        ) : (
          <div>Drag and drop or click to upload</div>
        )}
      </div>

      <div>Upload your photo (JPG or PNG, max size: 5MB)</div>

      {error && <div>{error}</div>}
    </div>
  );
};

// EXPORT

export default AvatarUploader;
