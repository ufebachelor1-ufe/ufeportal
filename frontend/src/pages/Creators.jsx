// src/pages/Creators.jsx
import React from "react";

const creators = [
  {
    name: "Бямбабаяр Атарбаяр",
    role: "Frontend Developer",
    image: "/raya.jpg",
    bio: "Focused on clean interfaces, accessibility, and user experience.",
  },
  {
    name: "Г.Нинжинболд",
    role: "Backend Developer",
    image: "/nb.jpg",
    bio: "Responsible for system architecture, frontend, and backend development.",
  },
  
];

const Creators = () => {
  return (
    <section className="px-6 py-16 mx-auto max-w-7xl">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Meet the Creators
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-gray-600">
          This website is built and maintained by a small team passionate about
          quality, performance, and user-focused design.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 ">
        {creators.map((creator, index) => (
          <div
            key={index}
            className="p-6 text-center transition bg-white shadow-md rounded-2xl hover:shadow-xl"
          >
            <img
              src={creator.image}
              alt={creator.name}
              className="object-cover w-32 h-32 mx-auto mb-4 rounded-full"
            />

            <h3 className="text-xl font-semibold text-gray-900">
              {creator.name}
            </h3>
            <p className="mt-1 font-medium text-primary">
              {creator.role}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              {creator.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Creators;
