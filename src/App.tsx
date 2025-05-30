import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import BeachList from './components/BeachList';
import { BeachDataProvider } from './contexts/BeachDataContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BeachDataProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow px-4 py-8 md:px-8">
            <BeachList />
          </main>
          <footer className="bg-gray-800 text-white py-6 px-4 md:px-8">
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm mb-4 md:mb-0">
                  © {new Date().getFullYear()} India Beach Safety Monitor
                </p>
                <p className="text-sm text-gray-400">
                  Weather data powered by OpenWeatherMap
                </p>
              </div>
            </div>
          </footer>
        </div>
      </BeachDataProvider>
    </QueryClientProvider>
  );
}

export default App;