import { ErrorMessage } from "@hookform/error-message";
import axios from "../axios/axios";
import { Button, Label, TextInput, ToggleSwitch } from "flowbite-react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../Authentication/AuthProvider/AuthProvider";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get(`/auth/user/${id}`).then((res) => {
      if (res?.data?.status == 200) {
        reset({
          ...res?.data?.user,
        });
        setIsAdmin(res?.data?.user?.isAdmin);
        setIsActive(res?.data?.user?.isActive);
      } else {
        toast.error(res?.data?.error?.message);
      }
    });
  }, [reset, id]);

  const onSubmit = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      address: data.address,
      state: data.state,
      isAdmin: isAdmin,
      isActive: isActive,
    };
    axios.put(`/auth/update/${user?.user?._id}`, userData).then((res) => {
      if (res?.data?.status == 200) {
        toast.success("User Updated Success");
      } else {
        toast.error(res?.data?.error?.message);
      }
    });
  };
  return (
    <div className="flex flex-col items-center my-10">
      <h2 className="text-[30px] font-bold">Update User</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-md flex-col gap-4 w-1/2"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name *" />
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="Your Name"
            {...register("name", { required: true })}
            required
          />
          <ErrorMessage errors={errors} name="name" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email *" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@gmail.com"
            {...register("email", { required: true })}
            required
            readOnly
            disabled
          />
          <ErrorMessage errors={errors} name="email" />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="Location" value="Location *" />
          </div>
          <TextInput
            id="location"
            type="text"
            placeholder="Current Location"
            {...register("address", { required: true })}
            required
          />
          <ErrorMessage errors={errors} name="address" />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="State" value="State *" />
          </div>
          <TextInput
            id="state"
            type="text"
            placeholder="Current State"
            {...register("state", { required: true })}
            required
          />
          <ErrorMessage errors={errors} name="state" />
        </div>
        <div className="flex max-w-md flex-col gap-4">
          <ToggleSwitch
            checked={isAdmin}
            label="Is Admin"
            disabled={!user?.user?.isAdmin}
            onChange={setIsAdmin}
          />
        </div>
        <div className="flex max-w-md flex-col gap-4">
          <ToggleSwitch
            checked={isActive}
            label="Is Active"
            onChange={setIsActive}
          />
        </div>
        <Button
          type="submit"
          color="dark"
          className="bg-[#1C2434] hover:bg-[#1C2434]"
        >
          Update
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateUser;
