import { IconLoader2 } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import ContainerAuth from "../layouts/ContainerAuth";
import { loginThunk } from "../store/slices/user.slice";

const Login = () => {
  const { isLoading, token } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    dispatch(loginThunk(data, navigate));
  };

  return (
    <>
      <ContainerAuth>
        <div className="hidden sm:block h-full">
          <img className="h-full object-ver" src="/bgImg/loginImg.png" alt="" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="[&>label]:grid [&>label]:gap-11 [&>label]focus:border-red-500 text-[#CCCC] font-medium  grid gap-7 text-white font-urbanist text-sm sm:text-md md:py-8 transition-all min-w-[270px]"
        >
          <h1 className="text-3xl uppercase font-semibold text-white md:mb-3 transition-all">
            Iniciar sesión
          </h1>
          <label>
            <span className="text-[#CCCC]">E-mail</span>
            <input
              required
              className="outline-none bg-transparent border-b border-b-yellow-600 transition-colors focus:border-secondary text-white"
              type="text"
              name="email"
            />
          </label>
          <label>
            <span className="text-[#CCCC]">Contraseña</span>
            <input
              required
              className="outline-none bg-transparent border-b border-b-yellow-600 transition-colors focus:border-secondary text-white text-2xl"
              type="password"
              name="password"
              minLength="8"
            />
          </label>
          <button
            className="relative text-white uppercase font-semibold px-2 py-2  md:py-1 bg-primary-light w-[35%] mx-auto rounded-full shadow-lg hover:tracking-widest transition-all shadow-purple-950 md:mt-5 sm:w-[50%]flex justify-center items-center"
            type="submit"
          >
            {isLoading ? (
              <IconLoader2 className="animate-spin w-full " />
            ) : token ? (
              <IconLoader2 className="animate-spin w-full " />
            ) : (
              "Entrar"
            )}
          </button>
          <Link
            className="text-[#CCCC] text-center underline hover:text-white transition-all "
            to="/register"
          >
            O crear una nueva cuenta
          </Link>
        </form>
      </ContainerAuth>
      <Toaster className="absolute" richColors />
    </>
  );
};
export default Login;
