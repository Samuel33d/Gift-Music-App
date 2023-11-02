import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <section className="h-screen bg-black flex justify-center items-center flex-col text-white">
      <h2 className="font-urbanist font-bold text-[10vh]">Error 404</h2>
      <span className="mb-5">
        La página a la que intentas acceder no existe!
      </span>
      <Link to={"/"} className="relative hover:rotate-6  transition-all">
        <img className="transition-all" src="/cassette.png" alt="" />
        <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-white w-[200px] rounded-lg text-black font-bold text-center py-1">
          Volver a home
        </span>
      </Link>
    </section>
  );
};
export default Page404;
