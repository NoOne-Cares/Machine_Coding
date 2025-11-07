import { motion } from "motion/react"
import { JSX, useState } from "react"
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


const Accordian = () => {
    const [activeAccordian, setActiveAccordain] = useState<number | null>()
    return (
        <div className="h-screen flex justify-center items-center bg-gray-700">
            <motion.div className="bg-gray-50 p-30">
                {
                    ListOfAccordian.map(item => (
                        <motion.div className="border-gray-400 bg-gray-100 border-x-2 cursor-pointer w-md"
                            onClick={() => setActiveAccordain(item.id)}
                            layout
                            transition={{
                                type: "spring",
                                visualDuration: 0.2,
                                bounce: 0.2,
                            }}
                        >
                            <div className="flex flex-row w-full items-center space-x-3 p-3 pb-0">
                                <div >
                                    {item.symbol}
                                </div>
                                <div className="flex flex-row justify-between w-full">
                                    <div>
                                        {item.heading}
                                    </div>
                                    <motion.div whileTap={{ rotate: 180 }}>
                                        <FiChevronDown />
                                    </motion.div >
                                </div>
                            </div>
                            <AnimatePresence>
                                {
                                    activeAccordian === item.id &&

                                    <motion.div animate={{ opacity: 1 }} className="pl-10 font-sans text-md">
                                        {item.body}
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </motion.div>
                    ))
                }
            </motion.div>
        </div>

    )
}

export default Accordian