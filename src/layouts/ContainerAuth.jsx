
const ContainerAuth = ({children}) => {
  return (
    <main className="bg-dark min-h-screen flex flex-col justify-center p-7 bg-[url('/bgImg/bgMobile.png')] sm:bg-[url('/bgImg/bgDesktop.png')] bg-no-repeat bg-right-bottom transition-all">
    <section className=" sm:grid sm:grid-cols-2 sm:gap-10 md:gap-20 max-w-[900px] mx-auto transition-all">
      {children}
    </section>
  </main>
  )
}
export default ContainerAuth