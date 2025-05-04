import BlogHeader from "../components/blogs/BlogHeader";
import { BlogTitle } from "../components/blogs/BlogTitle";
import { BlogPost } from "../components/blogs/BlogPost";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import blog3 from "../assets/blog3.png";

const blogData = [
  {
    title: "Museum Exploration",
    img: blog3,
    date: "April 9, 2025",
    location: "National Museum of Natural History, Manila",
    tags: ["travel", "EducationalTrip", "NationalMuseumPH ", "NaturalHistory"],
    content: [
      "Day 3 brought us to the heart of Manila for an immersive and eye-opening tour at the National Museum of Natural History. The museum's grand architecture and intricate interiors made a stunning first impression from the Tree of Life atrium to the beautifully preserved natural exhibits.",

      "We explored a wide range of displays, from ancient fossils and preserved wildlife to marine biodiversity and Philippine ecosystems. Each exhibit gave us a deeper appreciation for our natural heritage and the importance of conservation and education.",

      "The museum visit wasn't just informative, it was also inspiring. Walking through the galleries, we saw how history, science, and culture are interconnected, and how important it is to preserve them for future generations. Plus, we had fun capturing memories and learning new things along the way!",

      "It was a meaningful and memorable experience that truly added value to our tour.",
    ],
  },
];

export const Blog3 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <BlogHeader />
      <div className="container min-h-screen py-8">
        {/* Blog Navigation */}

        <BlogTitle id={"blog3"} title={"Day 3"} />

        {blogData.map((blog, index) => (
          <BlogPost key={index} blog={blog} />
        ))}

        {/* Navigation between blog posts */}
        <div className="mt-12 flex justify-between border-t pt-8">
          <div>
            <Link
              to="/blog2"
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
              Previous: Day 2
            </Link>
          </div>
          <div>
            <Link
              to="/blog4"
              className="flex items-center text-gray-600 hover:text-primary"
            >
              Next: Day 4
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
