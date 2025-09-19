import React from 'react';

export const Footer: React.FC = () => {
  const footerLinks = [
    { name: 'RSS', href: '#', target: '_self' },
    { name: 'Impressum', href: '#', target: '_self' },
    { name: 'Kapcsolat', href: '#', target: '_self' },
    { name: 'Médiasajánlat', href: '#', target: '_self' },
    { name: 'Adatvédelem', href: 'https://tozsdeforum.hu/adatvedelem/', target: '_blank' }
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8">
        {/* Footer links */}
        <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6 mb-4 text-sm">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.target}
              rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Copyright - separate line without border */}
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            © 2025, Tozsdeforum. Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  );
};