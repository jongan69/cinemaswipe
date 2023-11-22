import React from "react";

import * as appData from '../../../app.json'

export default function WebHeader({ title, subTitle }) {
    return (
        <div className="text-center">
            <h2 className="text-base font-bold text-indigo-600">
              {title}
            </h2>
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl font-heading">
              {subTitle}
            </h1>
            <img
                className="w-auto h-10 pt-5 mx-auto sm:h-20"
                src={`${appData.expo.githubUrl}/blob/master/assets/images/icon.png?raw=true`}
                alt={appData.expo.name}
              />
          </div>
    )
}