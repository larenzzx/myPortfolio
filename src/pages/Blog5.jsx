import BlogHeader from "../components/blogs/BlogHeader";
import { BlogTitle } from "../components/blogs/BlogTitle";
import { BlogPost } from "../components/blogs/BlogPost";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import blog5 from "../assets/blog5.png";

const blogData = [
  {
    title: "Urban Mobility & Transport Systems Tour",
    img: blog5,
    date: "April 11, 2025",
    location: "Metro Manila, Philippines",
    tags: ["travel", "EducationalTrip", "UrbanTransport", "TrafficEngineering", "LRTLine2"],
    content: [
      "Day 5 offered a fascinating behind-the-scenes look at how Metro Manila keeps its people moving efficiently amidst the hustle and bustle of city life.",

      "We began our day at the Traffic Engineering Center, where we learned how traffic flow is monitored and managed across the metro. From traffic light coordination to real-time traffic data, it was insightful to see the level of planning and technology involved in minimizing congestion and ensuring road safety.",

      "In the second half of the day, we explored the inner workings of the LRT Line 2. This gave us a deeper understanding of how public transportation systems operate—from train scheduling to infrastructure design and maintenance. Witnessing how such a large-scale transit system is planned and managed helped us appreciate the complexities of urban mobility and how crucial efficient transport systems are to the daily lives of millions.",

      "This day not only broadened our knowledge of transportation engineering and urban planning but also gave us a greater appreciation for the invisible systems that keep cities running smoothly.",
    ],
  },
];

export const Blog5 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <BlogHeader />
      <div className="container min-h-screen py-8">
        {/* Blog Navigation */}

        <BlogTitle id={"blog5"} title={"Day 5"} />

        {blogData.map((blog, index) => (
          <BlogPost key={index} blog={blog} />
        ))}

        {/* Navigation between blog posts */}
        <div className="mt-12 flex justify-between border-t pt-8">
          <div>
            <Link
              to="/blog4"
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
              Previous: Day 4
            </Link>
          </div>
          <div>
            <Link
              to="/blog6"
              className="flex items-center text-gray-600 hover:text-primary"
            >
              Next: Day 6
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
