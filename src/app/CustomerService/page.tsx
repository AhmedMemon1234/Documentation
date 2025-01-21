import React from 'react';
import Header from '../components/Header';

const CustomerService: React.FC = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-4xl font-bold mb-6">Customer Service</h1>
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="message"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows={4}
                                required
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                {/* Feedback Section */}
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
                                Share your feedback
                            </label>
                            <textarea
                                id="feedback"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows={4}
                                placeholder="What do you think about our services?"
                                required
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit Feedback
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CustomerService;
