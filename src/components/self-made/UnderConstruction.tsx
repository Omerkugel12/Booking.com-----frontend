const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-start h-full bg-gray-100 gap-4 mt-2">
      {/* Full-width image */}
      <img
        src="public/under-construction-pages.jpg"
        alt="Under Construction"
        className="w-full h-96 object-cover"
      />
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Page Under Construction
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          We are working hard to get this page ready. Check back soon!
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default UnderConstruction;
