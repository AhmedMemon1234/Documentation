export default function WorkInProgress() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800">🚧 Work in Progress 🚧</h1>
          <p className="text-lg text-gray-600 mt-4">
            We're working hard to bring something amazing. Stay tuned!
          </p>
          <div className="mt-6">
            <div className="w-20 h-20 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }
  