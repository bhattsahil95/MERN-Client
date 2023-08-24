import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        <nav className="navigation">
            <ul className="navigation-menu">
                <li>
                    <NavLink exact to="/" activeClassName="active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" activeClassName="active">
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" activeClassName="active">
                        Contact
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/notes" activeClassName="active">
                        Notes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/mern-notes" activeClassName="active">
                        MERN Notes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/api" activeClassName="active">
                        API
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/apiserver" activeClassName="active">
                        API Server
                    </NavLink>
                </li>
            </ul>
            <div className="socials">
                <a
                    href="https://github.com/bhattsahil95"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="github"
                >
                    <img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original-wordmark.svg"
                        alt="GitHub"
                    />
                </a>

                <a
                    href="https://ca.linkedin.com/in/sahil-bhatt-ab5238a0"
                    target="blank"
                >
                    <img
                        src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg"
                        alt="LinkedIn"
                    />
                </a>
            </div>
        </nav>
    );
}

export default Navigation;
