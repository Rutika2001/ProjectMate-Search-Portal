import { useCallback, useState } from "react";
import { SiGithub } from "react-icons/si";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import "./SignupPage.css";
import { useFormik } from "formik";
import * as yup from "yup";
import Toast from "../../../Components/Toast/Toast";
import Input from "../../../Components/Input";
import { FaGoogle } from "react-icons/fa";

const SignupPage = () => {
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const { errors, touched, handleReset, getFieldProps, isValid } = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Name is required")
        .matches(
          /^[aA-zZ\s]+$/,
          "Numbers or special characters are not allowed."
        ),

      email: yup.string().required("email is required").email(),

      password: yup.string().required("password is required").max(20).min(8),
    }),
    onSubmit: (data) => {
      console.log(data);
      setShowToast(true);
    },
  });

  const handleSignUp = useCallback(async (event) => {
    event.preventDefault();
    setError("");
    setShowToast(false);
    const { email, password, name } = event.target.elements;
    console.log(name.value);
    try {
      await auth.createUserWithEmailAndPassword(email.value, password.value);
      // console.log("User Created ");
    } catch (error) {
      // console.log(error.code);
      if (error.code === "auth/email-already-in-use")
        setError("The email address is already in use by another account.");
      else setError(error.message);
      setShowToast(true);
    }
  }, []);

  return (
    <div className=" bgImage flex justify-center items-center h-screen">
      <Toast type="Error" show={showToast} message={error} />
      <div className="md:mx-12 lg:mx-32 xl:mx-52  flex h-4/5 w-full ">
        <div className="side-container flex-col justify-center items-center md:flex hidden h-full rounded-l-xl md:w-1/2 p-5 space-y-16">

          <div className="text-5xl font-bold text-center text-white font-Sora">
            Hello, Friend!
            <p className="text-base pt-5 text-blue-200">
              Enter your personal details and start a journey with us.
            </p>
          </div>
        </div>

        <div className="bg-white md:w-1/2 p-5 w-full rounded-r-xl mx-6 sm:mx-20 md:mx-0 text-center flex-col justify-center ">
          <h1 className="text-4xl font-Sora text-gray-800  font-extrabold">
            Sign Up
            <p className="text-sm font-bold pt-2">
              Already Have an Account?{" "}
              <Link className="text-blue-800 font-Sora" to="/login">
                Login Now
              </Link>
            </p>
          </h1>

          <form
            onSubmit={handleSignUp}
            onReset={handleReset}
            className="w-full md:px-8 xl:px-10 space-y-6"
          >
            <div className="w-full pt-4 ">
            

              <Input
                id="email"
                placeholder="Email Address"
                touched={touched.email}
                error={errors.email}
                {...getFieldProps("email")}
              />

              <Input
                id="password"
                placeholder="Password"
                touched={touched.password}
                error={errors.password}
                type="Password"
                {...getFieldProps("password")}
              />
            </div>

            <div className="">
              <button
                type="submit"
                className={`bg-purple-500 rounded-3xl px-7 w-full py-2 font-Sora font-bold text-white  ${
                  !isValid && "cursor-not-allowed"
                } `}
                disabled={!isValid}
              >
                Sign Up
              </button>
            </div>
            <h1 className="text-base font-Sora font-semibold">
              or Connect with Social Media
            </h1>

            <div className="space-y-3 font-Sora ">
              <div className="bg-red-400 flex rounded-3xl text-white px-7 md:px-4 lg:px-7 w-full py-2 cursor-pointer">
                <FaGoogle className="w-7 h-7" />
                <div className="w-full flex items-center justify-center">
                  Sign Up with Google
                </div>
              </div>
              {/* <div className="bg-blue-500 flex rounded-3xl text-white px-7 md:px-4 lg:px-7 w-full py-2 cursor-pointer">
                <SiLinkedin className="w-7 h-7" />
                <div className="w-full flex items-center justify-center">
                  Sign Up with LinkedIn
                </div>
              </div> */}
              <div className="bg-gray-900 flex  rounded-3xl text-white px-7 md:px-4 lg:px-7 w-full py-2 cursor-pointer">
                <SiGithub className="w-7 h-7" />
                <div className="w-full flex items-center justify-center">
                  Sign Up with Github
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
