import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Pagination from "./components/Pagination/Pagination";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import Search from "./components/AutoComplteSeacrhBar/Search";
import Modal from "./components/Modal/Modal";
import TextAnimate from "./components/textAnimation/TextAnimate";
import Accordian from "./components/Accordian/Accordian";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pagination" element={<Pagination />} />
            <Route path="/file" element={<FileExplorer />} />
            <Route path="/search" element={<Search />} />
            <Route path="/modal" element={<Modal />} />
            <Route path="/textanimate" element={<TextAnimate />} />
            <Route path="/accordian" element={<Accordian />} />
        </Routes>
    );
};

export default Router;
