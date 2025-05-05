import { Link } from "react-router-dom";

function Header () {

    return(
        <header className="w-full h-[55px] relative top-0 left-0 bg-amber-600 flex ">
            <Link className="ml-[10%] text-[200%] " to="/">
                EnEnglish
            </Link>
            <nav className="mt-[16px] ml-[30%]">
                <Link className="ml-[5%] hover:text-blue-200" to="/serth">Serth</Link>
                <Link className="ml-[5%] hover:text-blue-200" to="/recom">Recommendations</Link>
            </nav>
        </header>
    )
}
export default Header;