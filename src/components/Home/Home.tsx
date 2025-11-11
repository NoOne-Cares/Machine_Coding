import { Link } from "react-router-dom";

interface ComponentItem {
    name: string;
    path: string;
    label: string;
}

const components: ComponentItem[] = [
    { name: "Pagination", path: "/pagination", label: "Pagination" },
    { name: "FileExplorer", path: "/file", label: "File Explorer" },
    { name: "Auto Complete Search Bar", path: "/search", label: "Search" },
    { name: "Modal", path: "/modal", label: "Pop-up Modal" },
    { name: "TextAnimation", path: "/textanimate", label: "Text Animate" },
    { name: "Accordion", path: "/accordian", label: "Accordion" },
    { name: "ScreenShot", path: "/shot", label: "screenShot" },
    { name: "landing", path: "/landing", label: "landing" },
];

const Home: React.FC = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="mb-6 text-xl font-semibold">
                    The List of Components
                </div>

                <table className="border-black-300 mx-auto table-auto border-collapse border">
                    <thead>
                        <tr>
                            <th className="border-black-300 border px-4 py-2">
                                Name of the component
                            </th>
                            <th className="border-black-300 border px-4 py-2">
                                Link
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {components.map((item) => (
                            <tr key={item.path}>
                                <td className="border-black-300 border px-4 py-2">
                                    {item.name}
                                </td>
                                <td className="border-black-300 border px-4 py-2">
                                    <Link
                                        to={item.path}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {item.label}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
