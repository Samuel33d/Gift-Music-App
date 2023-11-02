import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import ContainerAuth from "../layouts/ContainerAuth";
import { axiosMusic } from "../utils/configAxios";
import { useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    axiosMusic
      .post("/api/auth/register", data)
      .then(() => {
        toast.success(
          "Usuario creado con éxito, serás redireccionado al login"
        );
        setIsLoading(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        setIsLoading(true);
        console.log(err);
        toast.error(err.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <ContainerAuth>
        <div className="hidden sm:block h-full">
          <img
            className="h-full object-ver"
            src="/bgImg/registerImg.png"
            alt=""
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="[&>label]:grid [&>label]:gap-11 [&>label]focus:border-red-500  font-medium  grid gap-7 text-white font-urbanist text-sm sm:text-md md:py-8 transition-all min-w-[270px]"
        >
          <h1 className="text-3xl uppercase font-semibold text-white md:mb-3 transition-all">
            Cuenta nueva
          </h1>
          <label>
            <span className="text-[#CCCC]">E-mail</span>
            <input
              required
              className="text-white outline-none bg-transparent border-b border-b-yellow-600 transition-colors focus:border-secondary"
              type="email"
              name="email"
            />
          </label>
          <label>
            <span className="text-[#CCCC]">Nombre de usuario</span>
            <input
              minLength="8"
              maxLength="200"
              required
              className="text-white outline-none bg-transparent border-b border-b-yellow-600 transition-colors focus:border-secondary"
              type="text"
              name="name"
            />
          </label>
          <label>
            <span className="text-[#CCCC]">Contraseña</span>
            <input
              minLength="8"
              maxLength="50"
              required
              className="text-white outline-none bg-transparent border-b border-b-yellow-600 transition-colors focus:border-secondary text-2xl"
              type="password"
              name="password"
            />
          </label>
          <button
            className="flex justify-center items-center text-white uppercase font-semibold  bg-primary-light w-[40%] mx-auto rounded-full shadow-lg hover:tracking-widest transition-all shadow-purple-950 md:mt-5 sm:w-[35%] px-2 py-2  md:py-2"
            type="submit"
          >
            {isLoading ? (
              <IconLoader2 className="animate-spin w-full" />
            ) : (
              "crear"
            )}
          </button>
          <Link
            className="text-[#CCCC] text-center underline hover:text-white transition-all "
            to="/login"
          >
            O iniciar sesión
          </Link>
        </form>
      </ContainerAuth>
      <Toaster className="absolute" richColors />
    </>
  );
};
export default Register;
