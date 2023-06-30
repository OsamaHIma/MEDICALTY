"use client";
import { usePhoto } from "@/context/PhotoContext";
import { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import {Translate} from "translate-easy";

const styles = {
  focused: {
    borderColor: "#2196f3",
  },
  accept: {
    borderColor: "#00e676",
    backgroundColor: "rgb(59 130 246 / 0.3)",
  },
  reject: {
    borderColor: "#ff1744",
    backgroundColor: "rgb(220 38 38 / 0.3)",
  },
};

const DragAndDrop = () => {
  const { uploadedPhoto, setUploadedPhoto } = usePhoto();
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: { "image/*": [] } });

  const style = useMemo(
    () => ({
      ...(isFocused && styles.focused),
      ...(isDragAccept && styles.accept),
      ...(isDragReject && styles.reject),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const fileUrl = URL.createObjectURL(acceptedFiles[0]);
      setUploadedPhoto(fileUrl);
    }
  }, [acceptedFiles, setUploadedPhoto]);

  const handleRemoveFiles = () => {
    if (uploadedPhoto) {
      URL.revokeObjectURL(uploadedPhoto);
    }
    setUploadedPhoto(null);
    acceptedFiles.splice(0, acceptedFiles.length);
  };
  return (
    <section className="w-64 text-center">
      <div
        {...getRootProps({ className: "dropzone", style })}
        className="rounded-tl-lg rounded-tr-lg border border-dashed border-gray-400 px-4 py-5 transition-all"
      >
        <input {...getInputProps()} />
        <img
          src="/assets/image.svg"
          className="inline w-5"
          alt="image icon"
        />
        <p className="text-gray-400">
          <Translate>
            Drag an image, or select from the file explorer,
          </Translate>
          &nbsp;
          <span className="cursor-pointer font-semibold text-gray-500">
            <Translate>click to browse</Translate>
          </span>
        </p>
      </div>
      <p className="mt-2 text-gray-400">
        <Translate>Attach an image or file</Translate>
      </p>
      <aside>
        {files.length > 0 && (
          <>
            <h4>
              <Translate>All Files</Translate>
            </h4>
            <ul>{files}</ul>
            <button
              onClick={handleRemoveFiles}
              className="mt-2 rounded bg-red-500 px-4 py-2 text-white"
            >
              <Translate>Remove Files</Translate>
            </button>
          </>
        )}
      </aside>
    </section>
  );
};

export default DragAndDrop;
