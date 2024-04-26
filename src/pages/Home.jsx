import TopBar from "../components/TopBar";
// import finger from "../media/finger.svg";
// import click from "../media/click.svg";

export default function Home() {
  return (
    <>
      <div className="box-content h-dvh w-full">
        <TopBar />
        <div className="box-border h-2/5 w-full p-4 border-4">
          <div className="text-5xl">Bienvenido a</div>
          <h1 className="text-6xl font-bold text-indigo-500">KOMALLI (Logo)</h1>
          <div className="text-5xl">Ordena Aquí </div>
        </div>
        <div className="flex justify-center box-border  h-57 w-full p-4 border-4">
          <button className="h-24 p-4 text-5xl text-white-100 bg-indigo-500 rounded-full">
            <svg
              className="h-14 w-14 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
              />
            </svg>
            <span className=""> Toca para comenzar</span>
          </button>
        </div>
      </div>
    </>
  );
}

{
  /* <img
              className="inline-block h-14 w-14 fill-white-100"
              src={click}
              alt=""
            /> */
}
