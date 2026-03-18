import { useState } from 'react';

function Navbar() {
  return (
    <nav className="bg-blue-900 fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
          <img src="/src/assets/icon.png" className="mr-3 h-7" alt="Icon Logo" />
          <h3 className="text-2xl font-semibold text-white">Automated Drug Identification System</h3>
      </div>
    </nav>
  );
}

export default Navbar;  // ← Pindahkan ke bawah function