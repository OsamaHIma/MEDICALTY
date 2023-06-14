"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import {Input} from "@/components/Input";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { GiVirus } from "react-icons/gi";
import { MdCake, MdConfirmationNumber, MdDescription } from "react-icons/md";
import { BiImageAdd, BiVideo } from "react-icons/bi";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

const AddDiseasePage = () => {
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

  const useDropzoneHook = (fileType) => {
    const [uploadedFile, setUploadedFile] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUploadedFile(reader.result);
      };
    }, []);

    const {
      getRootProps,
      getInputProps,
      isFocused,
      isDragActive,
      isDragReject,
      isDragAccept,
    } = useDropzone({ accept: { [`${fileType}/*`]: [] }, onDrop });

    return {
      uploadedFile,
      setUploadedFile,
      getRootProps,
      isFocused,
      getInputProps,
      isDragActive,
      isDragReject,
      isDragAccept,
    };
  };

  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const defaultProps = {
    diseaseNumber: "",
    name: "",
    description: "",
    resultImage: null,
    video: null,
    date: "",
  };

  const [formFields, setFormFields] = useState(defaultProps);
  const { diseaseNumber, name, description, resultImage, video, date } =
    formFields;

  const {
    uploadedFile: uploadedPhoto,
    setUploadedFile: setUploadedPhoto,
    getRootProps: getPhotoRootProps,
    getInputProps: getPhotoInputProps,
    isDragActive: isPhotoDragActive,
    isDragReject: isPhotoDragReject,
    isFocused: isPhotoDragFocused,
    isDragAccept: isPhotoDragAccept,
  } = useDropzoneHook("image");

  const {
    uploadedFile: uploadedVideo,
    setUploadedFile: setUploadedVideo,
    getRootProps: getVideoRootProps,
    getInputProps: getVideoInputProps,
    isDragActive: isVideoDragActive,
    isDragReject: isVideoDragReject,
    isFocused: isVideoDragFocused,
    isDragAccept: isVideoDragAccept,
  } = useDropzoneHook("video");
  const videoStyle = useMemo(
    () => ({
      ...(isVideoDragFocused && styles.focused),
      ...(isVideoDragAccept && styles.accept),
      ...(isVideoDragReject && styles.reject),
    }),
    [isVideoDragFocused, isVideoDragAccept, isVideoDragReject]
  );
  const photoStyle = useMemo(
    () => ({
      ...(isPhotoDragFocused && styles.focused),
      ...(isPhotoDragAccept && styles.accept),
      ...(isPhotoDragReject && styles.reject),
    }),
    [isPhotoDragFocused, isPhotoDragAccept, isPhotoDragReject]
  );
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
    setUploadedPhoto(null);
    setUploadedVideo(null);
  };

  const handlePostRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("diseaseNumber", diseaseNumber);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("resultImage", resultImage);
      formData.append("video", video);
      formData.append("date", date);
      formData.append("image", uploadedPhoto);
      formData.append("videoFile", uploadedVideo);

      const response = await fetch("/api/disease", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Data successfully sent");
        resetFormFields();
      } else {
        toast.error("Failed to send data");
      }
    } catch (error) {
      toast.error(`${error.name}: ${error.message}`);
    }
  };

  const [isValid, setIsValid] = useState("");
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity() || !uploadedPhoto || !uploadedVideo) {
      setIsValid("not-validated");
      toast.error("Please fill in all required fields");
      return;
    }

    setIsValid("validated");
    handlePostRequest();
  };

  return (
    <section>
      <Header headerText="Add new disease" />
      <form
        className={`px-10 ${isValid}`}
        onSubmit={handleFormSubmit}
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px] mb-14">
          <div className="flex flex-col gap-6 flex-1 md:w-full">
            <Input
              ClassesForTheInput="h-12"
              ClassesForTheLabel="h-12 !text-center !py-3"
              labelText="Disease Number"
              placeHolder="Disease Number"
              icon={<MdConfirmationNumber  size={23} />}
              name="diseaseNumber"
              value={diseaseNumber}
              onChange={onChange}
              required
            />
            <Input
              ClassesForTheInput="h-12"
              ClassesForTheLabel="h-12 !text-center !py-3"
              labelText="Disease Name"
              placeHolder="Disease Name"
              icon={<GiVirus  ngCart size={23} />}
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="flex flex-col gap-6 flex-1 md:w-full">
            <Input
              ClassesForTheInput="h-11 "
              ClassesForTheLabel="h-12 !text-center w-[20%] !py-3"
              labelText="Disease Description"
              placeHolder="Disease Description"
              icon={<MdDescription size={23} />}
              name="description"
              value={description}
              onChange={onChange}
              required
            />
            <Input
              ClassesForTheInput="h-12"
              ClassesForTheLabel="h-12 !text-center w-[20%] !py-3"
              labelText="Date"
              placeHolder="Date of diagnosis"
              icon={<MdCake  size={23} />}
              name="date"
              value={date}
              onChange={onChange}
              type="date"
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px] mb-14">
          <div
            {...getPhotoRootProps({ className: "dropzone", style: photoStyle })}
            className={`h-48 flex flex-col items-center justify-center border-2 border-dashed dark:border-slate-100 border-slate-800 rounded-lg cursor-pointer${
              isPhotoDragActive ? "border-green-500" : ""
            } ${isPhotoDragReject ? "border-red-500" : ""}`}
          >
            <input {...getPhotoInputProps()} accept="image/*" />
            {uploadedPhoto ? (
              <img
                src={uploadedPhoto}
                alt="Uploaded Result Image"
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <>
                <BiImageAdd size={50} />
                <p className="text-sm">Drag and drop or click to upload</p>
              </>
            )}
          </div>
          <div
            {...getVideoRootProps({ className: "dropzone", style: videoStyle })}
            className={`h-48 flex flex-col items-center justify-center border-2 border-dashed dark:border-slate-100 border-slate-800 rounded-lg cursor-pointer ${
              isVideoDragActive ? "border-green-500" : ""
            } ${isVideoDragReject ? "border-red-500" : ""}`}
          >
            <input {...getVideoInputProps()} />
            {uploadedVideo ? (
              <video
                src={uploadedVideo}
                alt="Uploaded Video"
                className="h-full w-full object-cover rounded-lg"
                controls
              />
            ) : (
              <>
                <BiVideo size={50} />
                <p className="text-sm">Drag and drop or click to upload</p>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            buttonStyle="outline"
            content="Cancel"
            type="button"
            onClick={resetFormFields}
          />
          <Button type="submit" content="Submit" filled />
        </div>
      </form>
    </section>
  );
};
export default AddDiseasePage;
