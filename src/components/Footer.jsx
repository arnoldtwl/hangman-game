import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-6 text-center text-slate-400 text-sm mt-auto backdrop-blur-md bg-slate-900/70 border-t border-white/10 shadow-lg">
            <p className="flex items-center justify-center gap-2">
                &copy; {currentYear}
                <a
                    href="https://www.arnoldtwl.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-slate-300 hover:text-cyan-400 transition-colors duration-300"
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
