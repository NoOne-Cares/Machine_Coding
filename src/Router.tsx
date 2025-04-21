import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Pagination from "./components/Pagination/Pagination";
import FileExplorer from "./components/FileExplorer/FileExplorer";

const Router = () => {
    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pagination" element={<Pagination />} />
            <Route path="/file" element={<FileExplorer />} />

        </Routes>

    );
};

export default Router;
