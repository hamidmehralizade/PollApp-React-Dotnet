import React, { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Poll App</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create">Create Poll</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main>
                {children}
            </main>

            <footer className="mt-5 py-3 text-center text-muted">
                <p>© {new Date().getFullYear()} Poll App - All rights reserved</p>
            </footer>
        </div>
    );
};

export default Layout;