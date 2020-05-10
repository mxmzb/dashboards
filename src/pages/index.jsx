import React from "react";
import get from "lodash/get";
import { useCookies } from "react-cookie";

import Layout from "../components/layout";
import SEO from "../components/seo";

import { slugify } from "../lib/helpers";

const IndexPage = ({ data }) => {
  const [q, setQ] = React.useState("");
  const [cookies, setCookie] = useCookies(["favorites"]);

  React.useEffect(() => {
    console.log("COOKIES", cookies);

    if (cookies.favorites === undefined) {
      setCookie("favorites", []);
    }
  }, [cookies, setCookie]);

  const nodes = get(data, "allDashboardsJson.nodes");

  const toggleFavorite = (id) => {
    const index = cookies.favorites.indexOf(id);

    if (index > -1) {
      setCookie("favorites", [
        ...cookies.favorites.slice(0, index),
        ...cookies.favorites.slice(index + 1),
      ]);
    } else {
      setCookie("favorites", [...cookies.favorites, id]);
    }
  };

  return (
    <Layout>
      <SEO title="Home" />

      <input
        type="text"
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        placeholder="Search..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="h-8"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {cookies.favorites &&
          nodes
            .map((node) => Object.assign({}, node, { slug: slugify(node.name) }))
            .filter((node) => node.name.toLowerCase().indexOf(q.toLowerCase()) > -1)
            .sort((a, b) => {
              if (cookies.favorites.indexOf(a.slug) > -1) {
                return -1;
              }

              return 1;
            })
            .map(({ name, color, logo, docs, url, slug }) => (
              <div
                id={slug}
                className="relative rounded border border-solid bg-white duration-300 hover:shadow-xl"
                style={{ borderColor: color }}
                key={slug}
              >
                <a
                  className="flex flex-col h-full px-3 py-8 justify-center items-center"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {logo && (
                    <div className="logo flex justify-center items-center">
                      <img src={require(`../images/${logo}`)} alt={name} />
                    </div>
                  )}
                  <div className="h-2"></div>
                  <span className="block text-center text-sm text-black">{name}</span>
                </a>
                <div className="fav absolute right-0 top-0">
                  <button
                    className="block p-2 focus:outline-none"
                    onClick={() => toggleFavorite(slug)}
                  >
                    {cookies.favorites.indexOf(slug) === -1 && (
                      <img
                        src={require(`../images/ui/star.svg`)}
                        alt="Add to favorites"
                        title="Add to favorites"
                      />
                    )}
                    {cookies.favorites.indexOf(slug) > -1 && (
                      <img
                        src={require(`../images/ui/star-filled.svg`)}
                        alt="Remove from favorites"
                        title="Remove from favorites"
                      />
                    )}
                  </button>
                </div>
                {docs && (
                  <div className="docs absolute right-0 bottom-0">
                    <a href={docs} className="block p-2" target="_blank" rel="noopener noreferrer">
                      <img src={require(`../images/ui/book.svg`)} alt="Docs" title="Docs" />
                    </a>
                  </div>
                )}
              </div>
            ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allDashboardsJson {
      nodes {
        logo
        name
        url
        docs
        color
      }
    }
  }
`;

export default IndexPage;
