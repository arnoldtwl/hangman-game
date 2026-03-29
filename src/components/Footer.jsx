import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-6 text-center text-slate-300 text-sm mt-auto backdrop-blur-md bg-slate-900/70 border-t border-white/10 shadow-lg">
            <p className="flex items-center justify-center gap-2">
                &copy; {currentYear}
                <a
                    href="https://www.arnoldtwl.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring rounded-md font-semibold text-slate-100 hover:text-cyan-300 transition-colors duration-300"
                    aria-label="Visit Arnoldtwl website"
                >
                    Arnoldtwl
                </a>
                <span className="text-slate-600">|</span>
                <span>All Rights Reserved.</span>
            </p>
        </footer>
    );
};

export default Footer;
