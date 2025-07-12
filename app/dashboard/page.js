export default function UserDashboard() {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold">User Dashboard</h1>
          </header>
  
          {/* Section 1: My Listings */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">My Listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-gray-300 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 shadow"
                >
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <p className="font-medium text-lg">Listing {item}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Details about the listing...</p>
                </div>
              ))}
            </div>
          </section>
  
          {/* Divider */}
          <hr className="my-6 border-gray-300 dark:border-gray-700" />
  
          {/* Section 2: My Purchases */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">My Purchases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-gray-300 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 shadow"
                >
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <p className="font-medium text-lg">Purchase {item}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Details about the purchase...</p>
                </div>
              ))}
            </div>
          </section>
  
          {/* Footer Section or More Panels */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">More Panels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((panel) => (
                <div
                  key={panel}
                  className="rounded-xl border border-gray-300 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 shadow"
                >
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <p className="font-medium text-lg">Panel {panel}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Some additional content...</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
  