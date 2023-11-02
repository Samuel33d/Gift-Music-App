import { Link } from "react-router-dom";

const PublicLayout = ({ children }) => {
  return (
    <section className="bg-dark h-screen grid grid-rows-[auto,1fr] bg-[url('/bgImg/bgMobile.png')] sm:bg-[url('/bgImg/bgDesktop.png')] bg-no-repeat bg-right-bottom transition-all font-urbanist text-white overflow-hidden">
      <header className=" flex justify-center py-4 px-3  uppercase bg-primary-dark items-center font-semibold sm:px- md:px-20 transition-all">
        <Link to={"/"}>
          <h1 className="font-semibold sm:text-xl hover:text-secondary transition-all ">
            Gift Music
          </h1>
        </Link>
      </header>

      <section className="py-14 px-2 overflow-y-auto">
        <main className="relative mx-auto bg-primary-dark py-8 sm:px-10 px-3 rounded-[30px] max-w-[560px] transition-all ">
          {children}
        </main>
      </section>
    </section>
  );
};
export default PublicLayout;
