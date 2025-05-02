import BlogHeader from "../components/blogs/BlogHeader";
import { BlogTitle } from "../components/blogs/BlogTitle";
import { BlogPost } from "../components/blogs/BlogPost";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import blog7 from "../assets/blog7.png";

const blogData = [
  {
    title: "Free Time & Return to Manila",
    img: blog7,
    date: "April 13, 2025",
    location: "Baguio City & Manila, Philippines",
    tags: ["travel", "EducationalTrip", "SummerCapital", "GoodTasteRestaurant", "BurnhamPark"],
    content: [
      "Our final morning in Baguio gave us the freedom to explore at our own pace. Some of us took leisurely walks around Burnham Park, enjoying the crisp mountain air and calm atmosphere. Others took the opportunity for last-minute souvenir shopping—searching for the perfect pasalubong to bring home.",

      "A satisfying lunch awaited us at the well-loved Good Taste Restaurant, where we enjoyed hearty meals that warmed both stomach and soul.",

      "After checking out from Prince Plaza Hotel, we made our way down from the highlands and started our return journey to Manila. The long drive gave us time to reflect on the week behind us—filled with unforgettable sights, new learnings, and shared laughs.",
    ],
  },
];

export const Blog7 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <BlogHeader />
      <div className="container min-h-screen py-8">
        {/* Blog Navigation */}

        <BlogTitle id={"blog7"} title={"Day 7"} />

        {blogData.map((blog, index) => (
          <BlogPost key={index} blog={blog} />
        ))}

        {/* Navigation between blog posts */}
        <div className="mt-12 flex justify-between border-t pt-8">
          <div>
            <Link
              to="/blog6"
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
              Previous: Day 6
            </Link>
          </div>
          <div>
            <Link
              to="/blog8"
              className="flex items-center text-gray-600 hover:text-primary"
            >
              Next: Day 8
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
