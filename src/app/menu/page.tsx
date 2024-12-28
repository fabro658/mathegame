export default function Page() {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
        <h1 className="text-4xl font-bold mb-12">Menu</h1>
        <div className="grid grid-cols-2 gap-8">
          <a
            href="/menu"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
          >
            Apprendre
          </a>
          <a
            href="/menu"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
          >
            Documentation
          </a>
          <a
            href="/menu"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-lg text-3xl shadow-lg text-center flex items-center justify-center"
          >
            Option
          </a>
        </div>
      </div>
    );
  }