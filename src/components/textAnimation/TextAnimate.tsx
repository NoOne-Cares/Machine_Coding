import { TextEncrypted } from "./EncriptionTextAnimation";
// import TextSkeleton from "./filler";

const TextAnimate = () => {

  return (


    <div className="flex items-center h-screen justify-center bg-black">
      <div className="bg-gray-900 p-10 w-4xl h-80 text-2xl rounded-md">
        <TextEncrypted
          text="SYSTEM ONLINE. INITIALIZING SECURE PROTOCOLS...
                ACCESSING MAINFRAME DATA.
                ENCRYPTION SEQUENCE ACTIVE.
                WELCOME, AUTHORIZED USER."
          scrambleSpeed={0.04}
          className="text-[#41FF00]"
        />

      </div>
      {/* <div className="min-h-screen ">
        <TextSkeleton
          text="Any word"
          fontUrl="./fonts2.ttf"
        />
      </div> */}
    </div>

  );
};

export default TextAnimate;
