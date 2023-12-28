import { ErrorMessage } from "@hookform/error-message";
import axios from "../axios/axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios.post("/auth/sign-up", data).then((res) => {
      if (res?.data?.status == 200) {
        toast.success("Sign Up Success");
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      } else {
        toast.error(res?.data?.error?.message);
      }
      reset();
    });
  };

  return (
    <div className="flex flex-col items-center my-10">
      <h2 className="text-[30px] font-bold">Create a account</h2>
      <p className="text-[20px] text-gray-500">
        Start your journey with our product
      </p>
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
          />
          <ErrorMessage errors={errors} name="email" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Password *" />
          </div>
          <TextInput
            id="password1"
            type="password"
            required
            {...register("password", { required: true })}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <div>
            <h2 className="text-[#4C22C5] font-semibold cursor-pointer">
              Forgot your password?
            </h2>
          </div>
        </div>
        <Button
          type="submit"
          color="dark"
          className="bg-[#1C2434] hover:bg-[#1C2434]"
        >
          Submit
        </Button>
        <h2 className="text-center">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-[#4C22C5] ">
            Sign up
          </Link>
        </h2>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
