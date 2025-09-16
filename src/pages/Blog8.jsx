import BlogHeader from "../components/blogs/BlogHeader";
import { BlogTitle } from "../components/blogs/BlogTitle";
import { BlogPost } from "../components/blogs/BlogPost";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import blog8 from "../assets/blog8.png";

const blogData = [
  {
    title: "Departure Day - Farewell Manila",
    img: blog8,
    date: "April 14, 2025",
    location: "Manila, Philippines",
    tags: ["travel", "EducationalTrip", "Day8Farewell ", "ThankYouManila"],
    content: [
      "Our final day arrived, and with it, the bittersweet feeling of saying goodbye.",

      "After checking out from DJM Dormitory, we packed our things for the last time and headed to the airport. The past week had been a whirlwind of discovery—from museums and tech centers to scenic views and cultural insights.",

      "Boarding our Philippine Airlines flight back to Zamboanga, we carried with us not just luggage, but stories, experiences, and friendships that made this journey truly unforgettable.",

      "This wasn’t just the end of a trip—it was the beginning of a lifetime of memories.",
    ],
  },
];

export const Blog8 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <BlogHeader />
      <div className="container min-h-screen py-8">
        {/* Blog Navigation */}

        <BlogTitle id={"blog8"} title={"Day 8"} />

        {blogData.map((blog, index) => (
          <BlogPost key={index} blog={blog} />
        ))}

        {/* Navigation between blog posts */}
        <div className="mt-12 flex justify-between border-t pt-8">
          <div>
            <Link
              to="/blog7"
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
              Previous: Day 7
            </Link>
          </div>
          
        </div>
      </div>
      <div className="">
        <div className="bg-base-200 py-6 text-base-content">
          <div className="container text-center">
            <p>© 2025 Travel Blog by Mark Larenz Tabotabo</p>
          </div>
        </div>
      </div>
    </>
  );
};
