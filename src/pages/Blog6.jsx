import BlogHeader from "../components/blogs/BlogHeader";
import { BlogTitle } from "../components/blogs/BlogTitle";
import { BlogPost } from "../components/blogs/BlogPost";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import blog6 from "../assets/blog6.png";

const blogData = [
  {
    title: "Journey to Baguio & Scenic City Tour",
    img: blog6,
    date: "April 12, 2025",
    location: "Baguio City, Philippines",
    tags: ["travel", "EducationalTrip", "SummerCapital", "StrawberryFarm", "PhilippineMilitaryAcademy ", "WrightPark", "BurnhamPark"],
    content: [
      "Our adventure took a refreshing turn as we made our way to Baguio, the Summer Capital of the Philippines. The journey itself was a treat—winding roads, cool weather, and breathtaking mountain views set the tone for a memorable day.",

      "We kicked off our city tour at the Strawberry Farm, where we witnessed local agriculture in action and enjoyed the cool breeze of La Trinidad. Next, we visited the peaceful Chinese Bell Church, a quiet and spiritual stop that contrasted beautifully with the bustling city vibe.",

      "One of the highlights of the day was our visit to the prestigious Philippine Military Academy. Seeing the cadets and learning about the discipline and values upheld there was both inspiring and eye-opening.",

      "As the sun set, we capped the day with a visit to SM Baguio for a bit of leisure and sightseeing, followed by a stroll through Baguio’s Night Market, where vibrant local culture, street food, and bargain shopping came alive. Day 6 was a perfect mix of nature, culture, and discovery a true highlight of the trip",
    ],
  },
];

export const Blog6 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <BlogHeader />
      <div className="container min-h-screen py-8">
        {/* Blog Navigation */}

        <BlogTitle id={"blog6"} title={"Day 6"} />

        {blogData.map((blog, index) => (
          <BlogPost key={index} blog={blog} />
        ))}

        {/* Navigation between blog posts */}
        <div className="mt-12 flex justify-between border-t pt-8">
          <div>
            <Link
              to="/blog5"
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
              Previous: Day 5
            </Link>
          </div>
          <div>
            <Link
              to="/blog7"
              className="flex items-center text-gray-600 hover:text-primary"
            >
              Next: Day 7
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
