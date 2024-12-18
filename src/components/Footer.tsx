import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">DOS Simulator</h3>
            <p className="text-gray-400">Learn about network security interactively</p>
          </div>
          <div className="flex space-x-6">
            <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/learn" className="text-gray-400 hover:text-white">Learn</a></li>
                <li><a href="/game-modes" className="text-gray-400 hover:text-white">Game Modes</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} DOS Simulator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
