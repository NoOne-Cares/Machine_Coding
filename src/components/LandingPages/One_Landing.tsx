import React from "react";

const Landing = () => {
    return (
        <div className="flex h-screen justify-center bg-neutral-800">
            <div className="flex w-full flex-col items-center justify-center">
                <h1 className="max-w-2xl bg-gradient-to-b from-neutral-50 to-neutral-500 bg-clip-text text-center text-7xl leading-tight font-bold tracking-tight text-transparent">
                    Unleash the power of intutive finance
                </h1>
                <p className="mx-auto mt-10 max-w-xl text-center text-neutral-300 selection:bg-amber-50">
                    Say goodbye to the outdated financial tools. Every small
                    business owner can help and call out, regardless of the
                    background, can now manage their pro. Simple. Intuitive. And
                    never boring.
                </p>
                <div className="mt-8 flex w-full max-w-2xl justify-center">
                    <input
                        type="text"
                        placeholder="Enter Your Email"
                        className="mr-4 flex-1 rounded-xl border border-neutral-500 px-4 text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                    <button className="relative cursor-pointer rounded-xl border border-neutral-700 px-4 py-2 text-white">
                        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent"></div>
                        Join Wiatlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Landing;
