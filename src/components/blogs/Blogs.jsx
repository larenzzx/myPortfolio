import { SectionTitle } from "../SectionTitle";
import { BlogsBtn } from "./BlogsBtn";
import { Link } from "react-router-dom";
import me from "../../assets/hero.jpg";
import day2 from "../../assets/day2.png";
import day3 from "../../assets/day3.png";
import day4 from "../../assets/day4.png";
import day5 from "../../assets/day5.png";
import day6 from "../../assets/day6.png";
import day7 from "../../assets/day7.png";
import day8 from "../../assets/day8.png";

export const Blogs = () => {
  return (
    <>
      <div className="container min-h-screen">
        <SectionTitle id="blogs" title="Blogs" />
        <div>
          <ul className="timeline timeline-vertical timeline-snap-icon mt-4 max-md:timeline-compact">
            <li>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <time className="font-mono italic">Day 1 - April 7, 2025</time>
                <div className="my-4 md:flex md:justify-end">
                  <img
                    src={me}
                    className="max-w-56 rounded-xl border border-gray-200 object-cover shadow-lg duration-300 hover:scale-105 sm:max-w-xs"
                    alt=""
                  />
                </div>
                <div className="text-lg font-black">
                  Arrival in Manila & Historical City Tour
                </div>
                <div className="mb-2">
                  Our first day in Manila was a deep dive into the heart of the
                  Philippines' heritage. From the cobblestone streets of
                  Intramuros to the grandeur of Manila Cathedral and the solemn
                  beauty of Rizal Park, every stop offered a glimpse into the
                  nation's rich past. We capped the day with a stunning sunset
                  view at the Mall of Asia.
                </div>
                <Link to="/blog1">
                  <BlogsBtn />
                </Link>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end md:mb-10">
                <time className="font-mono italic">Day 2 - April 8, 2025</time>
                <div className="my-4 md:flex md:justify-start">
                  <img
                    src={day2}
                    className="max-w-56 rounded-xl border border-gray-200 object-cover shadow-lg duration-300 hover:scale-105 sm:max-w-xs"
                    alt=""
                  />
                </div>
                <div className="text-lg font-black">
                  Subic Tour & SBMA Site Visits
                </div>
                <div className="mb-2">
                  Day 2 took us to Subic Bay Freeport Zone, where we gained
                  firsthand insights into security and maritime operations. We
                  visited the SBMA Law Enforcement Communication Branch and
                  learned how the Seaport Department manages vessel traffic
                  through advanced systems. The SBMA Base Tour gave us a deeper
                  appreciation of the area's strategic role.
                </div>
                <Link to="/blog2">
                  <BlogsBtn />
                </Link>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <time className="font-mono italic">Day 3 - April 9, 2025</time>
                <div className="my-4 md:flex md:justify-end">
                  <img
                    src={day3}
                    className="max-w-56 rounded-xl border border-gray-200 object-cover shadow-lg duration-300 hover:scale-105 sm:max-w-xs"
                    alt=""
                  />
                </div>
                <div className="text-lg font-black">
                  Museum Exploration & Philippine Heritage
                </div>
                <div className="mb-2">
                  Day 3 was all about appreciating the nation's roots and
                  natural wonders. We explored the life and legacy of a great
                  Filipino leader at the Museo ni Manuel Quezon, then marveled
                  at the country's biodiversity and preserved ecosystems at the
                  National Museum of Natural History.
                </div>
                <Link to="/blog3">
                  <BlogsBtn />
                </Link>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end md:mb-10">
                <time className="font-mono italic">Day 4 - April 10, 2025</time>
                <div className="my-4 md:flex md:justify-start">
                  <img
                    src={day4}
                    className="max-w-56 rounded-xl border border-gray-200 object-cover shadow-lg duration-300 hover:scale-105 sm:max-w-xs"
                    alt=""
                  />
                </div>
                <div className="text-lg font-black">
                  Industry & Innovation Exposure
                </div>
                <div className="mb-2">
                  On Day 4, we witnessed the inner workings of national finance
                  and modern technology. At Bangko Sentral ng Pilipinas, we
                  learned about the country’s monetary system and security
                  features in currency. Later, Hytec Power Inc. gave us a
                  glimpse into cutting-edge industrial solutions and tech
                  innovations.
                </div>
                <Link to="/blog4">
                  <BlogsBtn />
                </Link>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <time className="font-mono italic">Day 5 - April 11, 2025</time>
                <div className="my-4 md:flex md:justify-end">
                  <img
                    src={day5}
                    className="max-w-56 rounded-xl border border-gray-200 object-cover shadow-lg duration-300 hover:scale-105 sm:max-w-xs"
                    alt=""
                  />
                </div>
                <div className="text-lg font-black">
                  Urban Mobility & Transport Systems Tour
                </div>
                <div className="mb-2">
                  Day 5 offered a behind-the-scenes look at how Metro Manila
                  keeps people moving. We visited the Traffic Engineering Center
                  to understand how the city manages traffic flow, then explored
                  the operations of the LRT Line 2, gaining insights into public
                  transit systems and infrastructure planning.
                </div>
                <Link to="/blog5">
                  <BlogsBtn />
                </Link>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end md:mb-10">
                <time className="font-mono italic">Day 6 - April 12, 2025</time>
                <div className="my-4 md:flex md:justify-start">
                  <img
                    src={day6}
                    className="max-w-56 rounded-xl border border-gray-200 object-cover shadow-lg duration-300 hover:scale-105 sm:max-w-xs"
                    alt=""
                  />
                </div>
                <div className="text-lg font-black">
                  Journey to Baguio & Scenic City Tour
                </div>
                <div className="mb-2">
                  Our journey to the Summer Capital of the Philippines was
                  packed with scenic views and enriching visits. Visiting the
                  Strawberry farm and the serene Chinese Bell Church to
                  witnessing the discipline at the Philippine Military Academy,
                  Day 6 was unforgettable. We also explored iconic spots like
                  Mines View Park, Wright Park, The Mansion, Burnham Park, and
                  ended the day at SM Baguio and Baguio's Night Market.
                </div>
                <Link to="/">
                  <BlogsBtn />
                </Link>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <time className="font-mono italic">Day 7 - April 13, 2025</time>
                <div className="my-4 md:flex md:justify-end">
                  <img
                    src={day7}
                    className="max-w-56 rounded-xl border border-gray-200 object-cover shadow-lg duration-300 hover:scale-105 sm:max-w-xs"
                    alt=""
                  />
                </div>
                <div className="text-lg font-black">
                  Free Time, Souvenir Shopping & Return to Manila
                </div>
                <div className="mb-2">
                  Day 7 was all about enjoying Baguio at our own pace. We
                  strolled through Burnham Park, had a satisfying meal at the
                  famous Good Taste Restaurant, and did some last-minute
                  pasalubong shopping. After checking out from Prince Plaza
                  Hotel, we began our trip back to Manila with hearts (and bags)
                  full.
                </div>
                <Link to="/">
                  <BlogsBtn />
                </Link>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end md:mb-10">
                <time className="font-mono italic">Day 8 - April 14, 2025</time>
                <div className="my-4 md:flex md:justify-start">
                  <img
                    src={day8}
                    className="max-w-56 rounded-xl border border-gray-200 object-cover shadow-lg duration-300 hover:scale-105 sm:max-w-xs"
                    alt=""
                  />
                </div>
                <div className="text-lg font-black">
                  Departure Day - Farewell Manila
                </div>
                <div className="mb-2">
                  Our final day marked the end of an unforgettable journey.
                  After checking out from DJM Dormitory, we headed to the
                  airport with lasting memories and new knowledge in tow. We
                  boarded our flight back to Zamboanga via PAL, bringing home
                  stories, experiences, and friendships made along the way.
                </div>
                <Link to="/">
                  <BlogsBtn />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
