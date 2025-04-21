import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Pagination from "./components/Pagination/Pagination";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import Search from "./components/AutoComplteSeacrhBar/Search";

const Router = () => {
    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pagination" element={<Pagination />} />
            <Route path="/file" element={<FileExplorer />} />
            <Route path="/search" element={<Search />} />

        </Routes>

    );
};

export default Router;
