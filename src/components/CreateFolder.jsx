import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage } from "@hookform/error-message";

const CreateFolder = ({ makeFolder, setMakeFolder }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios.post("/file/folder", data).then((res) => {
      if (res?.data?.status == 200) {
        toast.success("Folder Created");
        setTimeout(() => {
          setMakeFolder(false);
        }, 2000);
      } else {
        toast.error(res?.data?.error?.message);
      }
      reset();
    });
  };

  return (
    <Modal
      show={makeFolder}
      position="center"
      onClose={() => setMakeFolder(false)}
      popup
    >
      <ToastContainer />
      <Modal.Header />
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="folder" value="Folder Name *" />
            </div>
            <TextInput
              id="folder"
              type="text"
              placeholder="Folder Name"
              {...register("name", { required: true })}
              required
            />
            <ErrorMessage errors={errors} name="name" />
          </div>

          <Button
            type="submit"
            color="dark"
            className="bg-[#1C2434] hover:bg-[#1C2434]"
          >
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateFolder;
