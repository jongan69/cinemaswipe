import React from "react";

export default function Banner({ title, subtitle, description, img }) {
    return (
        <div className="flex flex-col w-full overflow-hidden bg-white rounded-lg sahdow-lg md:flex-row">
            <div className="w-full md:w-2/5 h-80">
                <img
                    className="object-cover object-center w-full h-full"
                    src={img}
                    alt="photo"
                />
            </div>
            <div className="w-full p-6 space-y-2 text-left md:w-3/5 md:p-4">
                <p className="text-xl font-bold text-gray-700">{title}</p>
                <p className="text-base font-normal text-gray-400">{subtitle}</p>
                <p className="text-base font-normal leading-relaxed text-gray-500">
                    {description}
                </p>
                <div className="flex justify-start space-x-2">
                    {/* Social media icons */}
                    {/* ... */}
                </div>
            </div>
        </div>
    );
}