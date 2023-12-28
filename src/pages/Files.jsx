import { Button, Dropdown, Spinner, Table } from "flowbite-react";
import { FiEdit3 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import UploadFIle from "../components/UploadFIle";
import CreateFolder from "../components/CreateFolder";
import axios from "../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import DownloadButton from "../hooks/DownloadButton";
import EditFIle from "../components/EditFIle";
import { useFileContext } from "../context/FileContext";
import Select from "react-select";

const Files = () => {
  const [openModal, setOpenModal] = useState(false);
  const [makeFolder, setMakeFolder] = useState(false);
  const [files, setFiles] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const { searchValue } = useFileContext();
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("latest");

  const filterBy = [
    {
      label: "By SIze",
      value: "size",
    },
    {
      label: "Latest",
      value: "latest",
    },
  ];

  const searchFile = useCallback((value) => {
    setIsLoading(true);
    if (value !== "" && value.length > 2) {
      axios.get(`/file/search/${value}`).then((res) => {
        if (res?.data?.status == 200) {
          setFiles(res?.data?.files);
          setIsLoading(false);
        } else {
          toast.error(res?.data?.error?.message);
        }
      });
    }
  }, []);

  useEffect(() => {
    searchFile(searchValue);
  }, [searchFile, searchValue]);

  const getFiles = useCallback(() => {
    setIsLoading(true);
    axios.get(`/file/files?sortBy=${filterValue}`).then((res) => {
      if (res?.data?.status == 200) {
        setFiles(res?.data?.files);
        setIsLoading(false);
      } else {
        toast.error(res?.data?.error?.message);
      }
    });
  }, [filterValue]);

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  const handleEdit = (data) => {
    setOpenEditModal(true);
    setEditData(data);
  };

  const deleteFile = (id) => {
    axios.delete(`/file/delete/${id}`).then((res) => {
      if (res?.data?.status == 200) {
        toast.success("File Deleted");
        getFiles();
      } else {
        toast.error(res?.data?.error?.message);
      }
    });
  };

  return (
    <div className="px-5 my-5">
      <ToastContainer />
      <div className="md:flex justify-between items-center">
        <div className="flex justify-between gap-5 items-center">
          <h2 className="font-bold text-[20px]">Recent Documents</h2>
          <Button onClick={() => setMakeFolder(true)} color="dark">
            Make Folder
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Select
            options={filterBy}
            onChange={(selectedOption) => {
              setFilterValue(selectedOption.value); // Update the form value when Select changes
            }}
          />
          <Button onClick={() => setOpenModal(true)} color="dark">
            Upload
          </Button>
        </div>
        <UploadFIle
          openModal={openModal}
          setOpenModal={setOpenModal}
          getFiles={getFiles}
        />
        <CreateFolder makeFolder={makeFolder} setMakeFolder={setMakeFolder} />
        {editData && (
          <EditFIle
            openEditModal={openEditModal}
            setOpenEditModal={setOpenEditModal}
            data={editData}
            getFiles={getFiles}
          />
        )}
      </div>
      <div className="overflow-x-auto my-5">
        <Table>
          <Table.Head>
            <Table.HeadCell>Folder</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Created #</Table.HeadCell>
            <Table.HeadCell>Download</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {files.map((file, idx) => (
              <Table.Row
                key={idx}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="flex gap-3 items-center">
                  <svg
                    width="28"
                    height="27"
                    viewBox="0 0 28 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_3_692)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M25.9074 9.12351H24.6016V6.59546C24.6016 5.89835 24.016 5.33144 23.2958 5.33144H14.8082C14.6554 5.33144 14.5078 5.27961 14.3903 5.18544L10.6545 2.17137H3.05604C2.3359 2.17137 1.75025 2.73829 1.75025 3.4354V7.85949H25.9074V9.12351H1.75025H0.444458V3.4354C0.444458 2.04118 1.61575 0.907349 3.05604 0.907349H10.8908C11.0436 0.907349 11.1911 0.959174 11.3087 1.05334L15.0445 4.06741H23.2958C24.7361 4.06741 25.9074 5.20124 25.9074 6.59546V9.12351Z"
                        fill="#808080"
                      />
                      <path
                        d="M25.9074 9.12351H24.6016V6.59546C24.6016 5.89835 24.016 5.33144 23.2958 5.33144H14.8082C14.6554 5.33144 14.5078 5.27961 14.3903 5.18544L10.6545 2.17137H3.05604C2.3359 2.17137 1.75025 2.73829 1.75025 3.4354V7.85949H25.9074V9.12351H1.75025H0.444458V3.4354C0.444458 2.04118 1.61575 0.907349 3.05604 0.907349H10.8908C11.0436 0.907349 11.1911 0.959174 11.3087 1.05334L15.0445 4.06741H23.2958C24.7361 4.06741 25.9074 5.20124 25.9074 6.59546V9.12351Z"
                        stroke="white"
                        strokeWidth="0.203704"
                      />
                      <rect
                        x="0.444458"
                        y="7.01855"
                        width="27.5"
                        height="18.3333"
                        rx="2.03704"
                        fill="#E3E3E3"
                        stroke="#565656"
                        strokeWidth="1.01852"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3_692">
                        <rect
                          width="27.5"
                          height="25.463"
                          fill="white"
                          transform="translate(0.444458 0.907349)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <p>{file?.folder?.name}</p>
                </Table.Cell>
                <Table.Cell>{file?.filename}</Table.Cell>
                <Table.Cell>{moment(file?.createdAt).format("l")}</Table.Cell>
                <Table.Cell>
                  <DownloadButton
                    base64Data={file?.content}
                    fileName={file?.filename}
                  />
                </Table.Cell>
                <Table.Cell className="">
                  <div className="bg-[#3d67dd44] w-fit p-2 rounded-full">
                    <FiEdit3
                      className="text-[#4676FB] cursor-pointer"
                      onClick={() => handleEdit(file)}
                    />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="bg-[#ff00003d] w-fit p-2 rounded-full">
                    <MdDelete
                      className="text-[#FF0000] cursor-pointer"
                      onClick={() => deleteFile(file?._id)}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {isLoading && (
        <div className="flex justify-center mx-auto w-full">
          <Spinner aria-label="Default status example" />
        </div>
      )}
    </div>
  );
};

export default Files;
