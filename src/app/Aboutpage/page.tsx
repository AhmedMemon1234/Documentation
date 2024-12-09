import Image from "next/image";

export default function Aboutpage() {
    return (
        <div className="bg-white py-20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Text section */}
                    <div className="md:w-1/2 lg:w-2/3">
                        {/* "ABOUT COMPANY" is smaller and above "ABOUT US" */}
                        <h1 className="text-1xl md:text-2xl lg:text-xl text-black font-bold mb-2 text-center md:text-left">
                            {/* "ABOUT COMPANY" is small on larger screens */}
                            <span className="text-sm md:text-base text-gray-500 block mb-2 sm:block">ABOUT COMPANY</span>
                            <span className="text-black text-4xl md:text-5xl lg:text-6xl">ABOUT US</span>
                        </h1>
                        {/* Adjust text size for smaller screens */}
                        <p className="text-lg md:text-xl lg:text-xl text-black mb-8 text-center md:text-left">
                            We know how large objects will act, but things on a small scale.
                        </p>
                        <div className="flex justify-center md:justify-start gap-2">
                            <a
                                href="#"
                                className="bg-blue-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-md"
                            >
                                Get Quote Now
                            </a>
                        </div>
                    </div>

                    {/* Image section */}
                    <div className="md:w-1/3 lg:w-full mt-8 md:mt-0 flex justify-center">
                        <Image
                            src="/background.png"
                            alt="Hero Image"
                            width={1200}
                            height={800}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
