import PropTypes from "prop-types";
import React from "react";

const Header = ({ siteTitle }) => (
  <header>
    <h1 className="text-4xl">Dashboards</h1>
    <div className="h-3"></div>
    <p className="intro">
      This is a simple list of app dashboard links. The listed apps are mainly, but not exclusively
      developer related. Inspired by{" "}
      <a
        href="https://twitter.com/iamakulov/status/1259384895383703552"
        target="_blank"
        rel="noopener noreferrer"
      >
        this tweet
      </a>
      , made by{" "}
      <a href="https://twitter.com/mxmzb" target="_blank" rel="noopener noreferrer">
        @mxmzb
      </a>
      . Missing something? Feel free to{" "}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          "Hey @mxmzb, what do you think about adding the following feature to https://dashboards.now.sh?",
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        make a suggestion
      </a>{" "}
      or{" "}
      <a href="https://github.com/mxmzb/dashboards" target="_blank" rel="noopener noreferrer">
        contribute
      </a>
      !
    </p>
    <div className="h-2"></div>
    <p className="text-gray-600">
      <small>
        <strong>Hint:</strong> Your ad blocker might be filtering out certain links, like Google
        Ads, Facebook Ads, etc.
      </small>
    </p>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
