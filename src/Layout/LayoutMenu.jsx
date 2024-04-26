import { Outlet } from "react-router-dom";

const LayoutMenu = () => { 
    return (
        <>
            <nav>Navbar</nav>
            <main>
                <Outlet/>
            </main>
            <footer>footer</footer>
        </>
    )

}

export default LayoutMenu;