import React from "react";

export default function Header({ title, subTitle }) {
    return (
        <div className="pb-12 text-center">
            <h2 className="text-base font-bold text-indigo-600">
              {title}
            </h2>
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl font-heading">
              {subTitle}
            </h1>
          </div>
    )
}