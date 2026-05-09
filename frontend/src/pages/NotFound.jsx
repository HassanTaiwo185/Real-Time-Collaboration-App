const NotFound = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-10 flex flex-col items-center gap-4 text-center">
        <h1 className="text-6xl font-bold text-blue-500">404</h1>
        <h2 className="text-2xl font-bold text-gray-700">Page Not Found</h2>
        <p className="text-gray-500 text-sm">
          The page you are looking for does not exist.
        </p>
        
          href="/"
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
