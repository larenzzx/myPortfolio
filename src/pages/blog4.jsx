import BlogHeader from "../components/blogs/BlogHeader";
import { BlogTitle } from "../components/blogs/BlogTitle";
import { BlogPost } from "../components/blogs/BlogPost";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import blog4 from "../assets/blog4.png";

const blogData = [
  {
    title: "Industry & Innovation Exposure",
    img: blog4,
    date: "April 10, 2025",
    location: "Hytec Power, Inc., Manila",
    tags: ["travel", "EducationalTrip", "HytecPowerInc", "InnovationExposure"],
    content: [
      "Today, we stepped into the fast-paced world of industry and innovation with a visit to Hytec Power, Inc., a leading partner in technical training and industrial solutions.",

      "Our tour gave us an up-close look at state-of-the-art training equipment, technical systems, and simulation environments. From hands-on robotics demonstrations to virtual reality training tools, it was an eye-opener to see how advanced technology is shaping the future of education and industry.",

      "We also explored Amatrol learning systems, mechatronics labs, and real-world tools used to upskill future engineers and technicians. The experience not only enhanced our understanding of how theory meets practice but also inspired us to pursue excellence in our own technical fields.",

      "This exposure gave us valuable insight into how innovation is applied in real industrial settings — and reminded us of the limitless possibilities when learning meets technology.",
    ],
  },
];

export const Blog4 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <BlogHeader />
      <div className="container min-h-screen py-8">
        {/* Blog Navigation */}

        <BlogTitle id={"blog4"} title={"Day 4"} />

        {blogData.map((blog, index) => (
          <BlogPost key={index} blog={blog} />
        ))}

        {/* Navigation between blog posts */}
        <div className="mt-12 flex justify-between border-t pt-8">
          <div>
            <Link
              to="/blog3"
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
              Previous: Day 3
            </Link>
          </div>
          <div>
            <Link
              to="/blog5"
              className="flex items-center text-gray-600 hover:text-primary"
            >
              Next: Day 5
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
        <div className="bg-base-200 py-6 text-base-content">
          <div className="container text-center">
            <p>© 2025 Travel Blog by Mark Larenz Tabotabo</p>
          </div>
        </div>
      </div>
    </>
  );
};
