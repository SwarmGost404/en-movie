import { Link } from "react-router-dom";

function Header () {

    return(
        <header className="flex w-full  h-[55px] relative top-0 left-0 bg-amber-600 ">
            <Link className="text-center w-full  text-[200%] " to="/">
                EnEnglish
            </Link>
            {/* <nav className="w-full mt-[16px] flex sm:ml-[30%] sm:block">
                <Link className="ml-[5%] w-[100%] sm:w-[30%] hover:text-blue-200" to="/serth">Serth</Link>
                <Link className="ml-[5%] w-[100%] sm:w-[30%] hover:text-blue-200" to="/recom">Recommendations</Link>
            </nav> */}
        </header>
    )
}
export default Header;