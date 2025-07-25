import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import reactLogo from "../assets/react.svg";

const Header=()=>{
    return(
        <div className="border-b-2 border-b-orange-500 py-6">
            <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center">
                <div className="w-full flex justify-center mb-4 md:mb-0">
                    <Link to="/" className="flex items-center gap-3 group text-3xl font-bold tracking-tight text-orange-500 transition-colors duration-200 hover:text-orange-600">
                        <img src={reactLogo} alt="Logo" className="w-10 h-10 transition-transform duration-200 group-hover:scale-110" />
                        MERNeats.com
                    </Link>
                </div>
                <div className="w-full flex justify-between md:justify-end items-center">
                    <div className="md:hidden">
                        <MobileNav></MobileNav>
                    </div>
                    <div className="hidden md:block">
                        <MainNav></MainNav>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;