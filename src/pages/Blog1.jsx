import BlogHeader from "../components/blogs/BlogHeader";
import { BlogTitle } from "../components/blogs/BlogTitle";
import { BlogPost } from "../components/blogs/BlogPost";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import blog1 from "../assets/blog1.png";

const blogData = [
  {
    title: "Arrival in Manila & Historical City Tour",
    img: blog1,
    date: "April 7, 2025",
    location: "Manila, Philippines",
    tags: ["travel", "EducationalTrip", "history", "manila"],
    content: [
      "Our journey began with an early morning arrival at Manila's Ninoy Aquino International Airport. After a smooth immigration process, we headed straight to DJM Dormitory to drop off our luggage before embarking on our first day of exploration.",

      "The historical city tour started at Rizal Park, a sprawling urban park dedicated to the Philippine national hero, José Rizal. The park features a monument marking the spot where Rizal was executed, which played a pivotal role in inspiring the Philippine revolution against Spanish colonization.",

      "Next, we visited the nearby walled city of Intramuros, a well-preserved Spanish colonial settlement. The stone architecture and cobblestone streets transported us back in time as we explored San Agustin Church, the oldest stone church in the Philippines and a UNESCO World Heritage site.",

      "As the day wound down, we made our way to SM MOA and witness its famous sunset. The vibrant hues of orange and purple stretching across the horizon created a perfect ending to our first day in the Philippines. We enjoyed a seafood dinner at one of the local restaurants along the bay, savoring fresh Filipino cuisine while watching the city lights come alive.",
    ],
  },
];

export const Blog1 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BlogHeader />
      <div className="container min-h-screen py-8">
        {/* Blog Navigation */}

        <BlogTitle id={"blog1"} title={"Day 1"} />

        {blogData.map((blog, index) => (
          <BlogPost key={index} blog={blog} />
        ))}

        {/* Navigation between blog posts */}
        <div className="mt-12 flex justify-between border-t pt-8">
          <div>
            <Link
              to="/#blogs"
              className="flex items-center text-gray-600 hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous: Introduction
            </Link>
          </div>
          <div>
            <Link
              to="/blog2"
              className="flex items-center text-gray-600 hover:text-primary"
            >
              Next: Day 2
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="">
        {/* Simple Footer */}
        <div className="bg-base-200 py-6 text-base-content">
          <div className="container text-center">
            <p>© 2025 Travel Blog by Mark Larenz Tabotabo</p>
          </div>
        </div>
      </div>
    </>
  );
};
