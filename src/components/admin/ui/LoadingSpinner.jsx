
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;