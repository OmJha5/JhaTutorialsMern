import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../../Images/logo.jpg"
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "@/redux/postSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const keyDownHandler = (e) => {
    if (e.key == "Enter") {
      dispatch(setQuery(input));
      navigate("/browse");
      setInput("");
    }
  };

  return (
    <nav className="!bg-white">

      <div className="sm:max-w-[85%] mx-auto sm:py-3 max-sm:py-1 px-4 sm:px-6 lg:px-8">
        <div className="flex lg:justify-between lg:items-center relative">
          {/* Logo , input(disabled for >= large screens) , nav items */}
          <div className="max-lg:flex-col max-lg:gap-5 lg:gap-10 flex xl:gap-20  items-center max-lg:w-full">
            <img src={logo} alt="Jha Tutorials" className="w-[75px] h-[75px] rounded-full cursor-pointer" onClick={() => navigate("/")} />
            <div className="relative lg:hidden max-lg:w-[80%]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Filter by Job name."
                className="pl-10 pr-4 py-2 rounded-lg border-gray-300 focus-visible:ring-0 text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={keyDownHandler}
              />
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex space-x-7 xl:space-x-9 text-sm xl:text-base">
              <Link to="/">Home</Link>
              <Link to="/posts">Jobs</Link> 
              <Link to="/admitcards">Admit Cards</Link> 
              <Link to="/answerkeys">Answer Keys</Link> 

              <Link to="#" onClick={() => navigate("/donate")}>Donate Us</Link>
              <Link to="#" onClick={() => navigate("/about")}>About Us</Link>
            </div>
          </div>

          {/* Input element(visible for >= large screens)  */}
          <div className="relative w-52 hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer" size={18} />
            <Input
              type="text"
              placeholder="Filter by Job name."
              className="pl-10 pr-4 py-2 rounded-lg border-gray-300 focus-visible:ring-0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={keyDownHandler}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden max-lg:absolute right-3">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} > {isOpen ? <X size={24} /> : <Menu size={24} />}  </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`lg:hidden shadow-md ${isOpen ? "block" : "hidden"}`}
      >
        <div className="flex flex-col items-center space-y-4 py-4 text-sm">
          <Link to="/">Home</Link>
          <Link to="/posts">Jobs</Link>
          <Link to="/admitcards">Admit Cards</Link> 
          <Link to="/answerkeys">Answer Keys</Link> 
          <Link to="/donate">Donate Us</Link>
          <Link to="/about">About Us</Link>
        </div>
      </motion.div>
    </nav>
  );
}