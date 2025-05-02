import BlogHeader from "../components/blogs/BlogHeader";
import { BlogTitle } from "../components/blogs/BlogTitle";
import { BlogPost } from "../components/blogs/BlogPost";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import blog2 from "../assets/blog2.png";

const blogData = [
  {
    title: "Subic Tour & SBMA Site Visits",
    img: blog2,
    date: "April 8, 2025",
    location: "Subic Bay, Philippines",
    tags: ["travel", "EducationalTrip ", "SubicTour2025 ", "SBMAVisit "],
    content: [
      "Our second day was filled with learning and exploration as we headed to Subic for a tour and official site visits at the Subic Bay Metropolitan Authority (SBMA). We kicked off the day with a briefing session and system demonstrations that gave us insights into how SBMA operates and monitors activities within the Freeport Zone. From real-time surveillance to advanced command centers, the experience was eye-opening.",

      "We then had the opportunity to tour various facilities, interact with the personnel, and observe their daily operations. It was especially exciting to see how technology, security, and administration converge to manage such a dynamic economic zone.",

      "The breathtaking coastal views of Subic and the warm hospitality of the people made the experience even more memorable. This trip not only broadened our understanding of port and zone management but also strengthened our teamwork and appreciation for public service operations.",

      "A big thank you to our guides and the SBMA officials who welcomed us with open arms and shared their knowledge generously.",
    ],
  },
];

export const Blog2 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <BlogHeader />
      <div className="container min-h-screen py-8">
        {/* Blog Navigation */}

        <BlogTitle id={"blog2"} title={"Day 2"} />

        {blogData.map((blog, index) => (
          <BlogPost key={index} blog={blog} />
        ))}

        {/* Navigation between blog posts */}
        <div className="mt-12 flex justify-between border-t pt-8">
          <div>
            <Link
              to="/blog1"
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
              Previous: Day 1
            </Link>
          </div>
          <div>
            <Link
              to="/blog3"
              className="flex items-center text-gray-600 hover:text-primary"
            >
              Next: Day 3
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
