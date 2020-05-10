import React from "react";
import PropTypes from "prop-types";
import { CookiesProvider } from "react-cookie";

import Header from "./header";
import "./master.css";

const Layout = ({ children }) => {
  return (
    <CookiesProvider>
      <div className="wrapper mx-auto">
        <div className="h-5"></div>
        <Header />
        <div className="h-5"></div>
        <main>{children}</main>
        <div className="h-5"></div>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
        <div className="h-5"></div>
      </div>
    </CookiesProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
