import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessage } from "@hookform/error-message";
import { useAuth } from "../Authentication/AuthProvider/AuthProvider";

const SigninForm = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios.post("/auth/login", data).then((res) => {
      if (res?.data?.status == 200) {
        const user = { user: res.data.userData };
        const token = { token: res.data.token };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
        login();
      } else {
        toast.error(res?.data?.error?.message);
      }
      reset();
    });
  };

  return (
    <div className="flex flex-col items-center my-10">
      <ToastContainer />
      <h2 className="text-[30px] font-bold">Sign in to your account</h2>
      <p className="text-[20px] text-gray-500">Start your demo version</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-md flex-col gap-4 w-1/2"
      >
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
            {...register("password", { required: true })}
            id="password1"
            type="password"
            required
          />
          <ErrorMessage errors={errors} name="password" />
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
    </div>
  );
};

export default SigninForm;
