import { AnimatePresence, motion } from "motion/react";
import { JSX, useState } from "react";
import { FaPlus, FaMinus, FaQuestion, FaInfoCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
type AccordianType = {
    id: number;
    heading: string;
    body: string;
    symbol: JSX.Element;
};

const ListOfAccordian: AccordianType[] = [
    {
        id: 1,
        heading: "What is React?",
        body: "React is a JavaScript library for building user interfaces developed by Facebook.",
        symbol: <FaQuestion />,
    },
    {
        id: 2,
        heading: "How do I install React?",
        body: "You can install React using npm or yarn with `npm install react react-dom`.",
        symbol: <FaPlus />,
    },
    {
        id: 3,
        heading: "What is JSX?",
        body: "JSX stands for JavaScript XML, allowing you to write HTML in React components.",
        symbol: <FaInfoCircle />,
    },
    {
        id: 4,
        heading: "How do I collapse or expand items?",
        body: "You can toggle visibility by tracking state in your component and switching icons.",
        symbol: <FaMinus />,
    },
];

// const Accordian = () => {
//     const [activeAccordian, setActiveAccordain] = useState<number | null>();
//     return (
//         <div className="flex h-screen items-center justify-center bg-gray-700">
//             <motion.div className="bg-gray-50 p-30">
//                 {ListOfAccordian.map((item) => (
//                     <motion.div
//                         className="w-md cursor-pointer border-x-2 border-gray-400 bg-gray-100"
//                         onClick={() => setActiveAccordain(item.id)}
//                         layout
//                         transition={{
//                             type: "spring",
//                             visualDuration: 0.2,
//                             bounce: 0.2,
//                         }}
//                     >
//                         <div className="flex w-full flex-row items-center space-x-3 p-3 pb-0">
//                             <div>{item.symbol}</div>
//                             <div className="flex w-full flex-row justify-between">
//                                 <div>{item.heading}</div>
//                                 <motion.div
//                                     whileTap={{
//                                         rotate: 180,
//                                     }}
//                                 >
//                                     <FiChevronDown />
//                                 </motion.div>
//                             </div>
//                         </div>
//                         <AnimatePresence>
//                             {activeAccordian === item.id && (
//                                 <motion.div
//                                     animate={{
//                                         opacity: 1,
//                                     }}
//                                     className="text-md pl-10 font-sans"
//                                 >
//                                     {item.body}
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>
//                     </motion.div>
//                 ))}
//             </motion.div>
//         </div>
//     );
// };

const Accordian = () => {
    const [activeAccordian, setActiveAccordian] = useState<number | null>(null);

    return (
        <div className="flex h-screen items-center justify-center bg-gray-700">
            <motion.div
                layout
                className="w-[400px] overflow-hidden rounded-md border border-gray-300 bg-gray-100 shadow-sm"
            >
                {ListOfAccordian.map((item, index) => {
                    const isActive = activeAccordian === item.id;

                    return (
                        <motion.div
                            key={item.id}
                            layout
                            transition={{
                                type: "spring",
                                duration: 0.3,
                                bounce: 0.4,
                            }}
                            onClick={() =>
                                setActiveAccordian(isActive ? null : item.id)
                            }
                            className={`cursor-pointer border-b border-gray-300 bg-white transition-all duration-300 ${isActive ? "relative z-10 my-2 scale-[1.03] rounded-md border border-blue-500 shadow-lg" : ""} ${index === ListOfAccordian.length - 1 ? "border-b-0" : ""} `}
                        >
                            <div className="flex items-center justify-between p-3">
                                <div className="flex items-center space-x-3">
                                    <span className="text-xl">
                                        {item.symbol}
                                    </span>
                                    <span className="font-semibold text-gray-800">
                                        {item.heading}
                                    </span>
                                </div>
                                <motion.div
                                    animate={{ rotate: isActive ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FiChevronDown />
                                </motion.div>
                            </div>

                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{
                                            opacity: [0, 0.25, 0.5, 0.75, 1],
                                            height: "auto",
                                        }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="px-6 pb-3 text-gray-600"
                                    >
                                        {item.body}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default Accordian;
