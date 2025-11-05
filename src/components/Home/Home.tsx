import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <div className="text-xl font-semibold mb-6">The List Of Components</div>
                <table className="table-auto border-collapse border border-black-300 mx-auto">
                    <thead>
                        <tr>
                            <th className="border border-black-300 px-4 py-2">Name of the component</th>
                            <th className="border border-black-300 px-4 py-2">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-black-300 px-4 py-2">
                                Pagination
                            </td>
                            <td className="border border-black-300 px-4 py-2">
                                <Link to='/pagination'>Pagination</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black-300 px-4 py-2">
                                FileExplorer
                            </td>
                            <td className="border border-black-300 px-4 py-2">
                                <Link to='/file'>FileExplorer</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black-300 px-4 py-2">
                                Auto Complete Search Bar
                            </td>
                            <td className="border border-black-300 px-4 py-2">
                                <Link to='/search'>Search</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black-300 px-4 py-2">
                                Modal
                            </td>
                            <td className="border border-black-300 px-4 py-2">
                                <Link to='/modal'>Pop up modal</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black-300 px-4 py-2">
                                TextAnimation
                            </td>
                            <td className="border border-black-300 px-4 py-2">
                                <Link to='/textanimate'>Text Animate</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black-300 px-4 py-2">
                                Fun
                            </td>
                            <td className="border border-black-300 px-4 py-2">
                                <Link to='/fun'>Fun</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
