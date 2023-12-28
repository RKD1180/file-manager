/* eslint-disable react/prop-types */
import { FileInput, Label, Modal, Progress } from "flowbite-react";
import { Button } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import axios from "../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import Select from "react-select";

const EditFIle = ({ openEditModal, setOpenEditModal, data,getFiles }) => {
  const { handleSubmit, control, setValue, reset } = useForm();

  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedBytes, setUploadedBytes] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    reset({
      ...data,
      folderId: data?.folder?._id,
      filename: data?.filename,
    });
    setFileName(data?.filename)
  }, [data, reset]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    handleFileUpload(event);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setValue("content", base64);
    setValue("filename", file.name);
    setFileName(file.name);
    
  };

  useEffect(() => {
    const simulateFileUpload = () => {
      if (selectedFile) {
        const simulatedTotalSize = selectedFile.size;

        const intervalId = setInterval(() => {
          setUploadedBytes((prevBytes) =>
            Math.min(prevBytes + 1024 * 1024, simulatedTotalSize)
          );
        }, 1000);

        setTotalSize(simulatedTotalSize);

        setTimeout(() => {
          clearInterval(intervalId);
        }, 5000);
      }
    };

    simulateFileUpload();
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) {
      const percentage = ((uploadedBytes / totalSize) * 100).toFixed(2);
      setUploadPercentage(percentage);
    }
  }, [uploadedBytes, totalSize, selectedFile]);

  useEffect(() => {
    axios.get(`/file/folders`).then((res) => {
      if (res?.data?.status == 200) {
        const options = res?.data?.folders?.map((folder) => ({
          label: folder.name,
          value: folder._id,
        }));

        setFolders(options);
      } else {
        toast.error(res?.data?.error?.message);
      }
    });
  }, []);

  const onSubmit = (data) => {
    setIsLoading(true);
    axios.put(`/file/edit/${data?._id}`, data).then((res) => {
        console.log("🚀 ~ file: EditFIle.jsx:103 ~ axios.post ~ res?.data:", res?.data)
      if (res?.data?.status == 200) {
        toast.success("File Uploaded Success");
        setTimeout(() => {
          setOpenEditModal(false);
          setTotalSize(0);
          setUploadPercentage(0);
          setSelectedFile(null);
        }, 2000);
        getFiles();
        setIsLoading(false);
      } else {
        toast.error(res?.data?.error?.message);
      }
      reset();
    });
  };

  return (
    <Modal
      show={openEditModal}
      position="center-right"
      onClose={() => setOpenEditModal(false)}
      popup
    >
      <ToastContainer />
      <Modal.Header />
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="w-full">
            <Controller
              name="folderId"
              control={control}
              render={({ field }) => (
                <Select
                  options={folders}
                  onChange={(selectedOption) => {
                    setValue("folderId", selectedOption.value); // Update the form value when Select changes
                  }}
                  value={folders.find((option) => option.value === field.value)}
                />
              )}
            />
          </div>

          <div className="flex w-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="dark:hover:bg-bray-800 flex h-30 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {selectedFile || fileName ? (
                <p>
                  File: {fileName}
                </p>
              ) : (
                <div className="flex items-center justify-center pb-6 pt-5 gap-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <div>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                </div>
              )}
              <FileInput
                onChange={handleFileChange}
                id="dropzone-file"
                className="hidden"
              />
            </Label>
          </div>

          <div>
            <Progress className="w-full mt-4" progress={uploadPercentage} />
          </div>

          {isLoading ? (
            <Button
              type="submit"
              color="light"
              className="bg-[#1C2434] hover:bg-[#1C2434]"
              disabled
            >
              Uploading .....
            </Button>
          ) : (
            <Button
              type="submit"
              color="dark"
              className="bg-[#1C2434] hover:bg-[#1C2434]"
            >
              Submit
            </Button>
          )}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditFIle;
