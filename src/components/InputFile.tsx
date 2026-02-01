import { useCallback, useEffect, useMemo } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import InputError from "./InputError";
import ExclamationIcon from "./ExclamationIcon";
import styles from "./InputFile.module.scss";

// CONSTANTS

const MAX_SIZE = 500 * 1024; // 500KB

// TYPINGS

interface PassedProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  setError: (name: "avatar", error: { type: string; message: string }) => void;
  clearErrors: (name: "avatar") => void;
}

// COMPONENT

const InputFile = ({
  value,
  onChange,
  error,
  setError,
  clearErrors,
}: PassedProps) => {
  const preview = useMemo(
    () => (value ? URL.createObjectURL(value) : null),
    [value],
  );

  const onDrop = useCallback(
    (_accepted: File[], rejected: FileRejection[]) => {
      if (rejected.length) {
        const message = rejected[0].errors
          .map((e) => {
            if (e.code === "file-too-large") return "File must be under 500KB";
            if (e.code === "file-invalid-type")
              return "Only JPG or PNG allowed";
            return e.message;
          })
          .join(", ");

        setError("avatar", {
          type: "manual",
          message,
        });
        return;
      }
      clearErrors("avatar");
      onChange(_accepted[0] ?? null);
    },
    [onChange, setError, clearErrors],
  );

  const { getRootProps, getInputProps, inputRef, open } = useDropzone({
    onDrop,
    maxSize: MAX_SIZE,
    multiple: false,
    noKeyboard: true,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const removeFile = () => {
    onChange(null);
    clearErrors("avatar");
    const inputEl = inputRef.current;
    if (inputEl) inputEl.value = "";
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const uploadStyleCss = error ? "upload-error" : "upload";

  return (
    <div className={styles["form-control"]}>
      <label
        className={styles["label"]}
        htmlFor="avatar-upload">
        Upload Avatar
      </label>
      {preview ? (
        <div
          {...getRootProps()}
          className={styles["upload-processed"]}>
          <img
            src={preview}
            alt="Avatar preview"
            className={styles["preview"]}
          />
          <div className={styles["buttons"]}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFile();
              }}
              className={styles["button"]}>
              Remove image
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                open();
              }}
              className={styles["button-change"]}>
              Change image
            </button>
          </div>
        </div>
      ) : (
        <div {...getRootProps()}>
          <div
            className={styles[uploadStyleCss]}
            id="avatar-upload"
            aria-describedby={error ? "avatar-error" : undefined}
            aria-invalid={!!error}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open();
              }
            }}>
            <div className={styles["icon"]} />
            Drag and drop or click to upload
          </div>
        </div>
      )}

      <input {...getInputProps()} />

      {error ? (
        <InputError id="avatar-error">{error}</InputError>
      ) : (
        <div className={styles["explanation"]}>
          <ExclamationIcon />
          Upload your photo (JPG or PNG, max size: 500KB).
        </div>
      )}
    </div>
  );
};

// EXPORT

export default InputFile;
