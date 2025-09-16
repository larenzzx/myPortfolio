export const BlogPost = ({ blog }) => {
  return (
    <div className="mx-auto max-w-4xl pb-12 -motion-translate-x-in-100 motion-translate-y-in-75">
      <div className="grid place-items-center mb-8">
        <img src={blog.img} className="md:max-w-lg object-cover border border-gray-200 rounded-lg duration-300 hover:scale-105" alt="" />
      </div>

      {/* Blog Header - Date */}
      <div className="mb-4 flex items-center text-gray-400">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm">{blog.date}</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="mb-6 text-left text-3xl font-bold text-primary sm:text-4xl">
        {blog.title}
      </h1>

      {/* Location Tag */}
      <div className="mb-6 flex items-center">
        <div className="flex items-center space-x-1 rounded-full bg-primary/10 px-3 py-1 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{blog.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 text-left text-base leading-relaxed sm:text-lg">
        {blog.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Tags */}
      <div className="mt-8 flex flex-wrap gap-2">
        {blog.tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
