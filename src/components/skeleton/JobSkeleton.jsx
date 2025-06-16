export const JobSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg animate-pulse space-y-4">
      <div className="h-8 bg-gray-300 rounded w-3/4" />
      <div className="h-5 bg-gray-200 rounded w-1/2" />
      <div className="h-5 bg-gray-200 rounded w-1/3" />
      <div className="h-5 bg-gray-200 rounded w-1/4" />
      <div className="h-6 bg-gray-300 rounded w-full" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  );
};
