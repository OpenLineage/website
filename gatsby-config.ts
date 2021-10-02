import { siteMetadata } from "./config";
import tailwindConfig from "./tailwind.config";
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

const plugins = [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-codegen`,
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `blog`,
            path: `${__dirname}/contents/blog/`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `integration`,
            path: `${__dirname}/contents/integration/`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `basepages`,
            path: `${__dirname}/contents/basepages`,
        },
    },
    {
        resolve: `gatsby-plugin-mdx`,
        options: {
            gatsbyRemarkPlugins: [
                {
                    resolve: `gatsby-remark-images`,
                    options: {
                        maxWidth: 1200,
                    },
                },
                `gatsby-remark-copy-linked-files`,
                {
                  resolve: `gatsby-remark-table-of-contents`,
                  options: {
                    exclude: "Table of Contents",
                    tight: true,
                    ordered: true,
                    fromHeading: 1,
                    toHeading: 6,
                    className: "table-of-contents"
                  },
                },
                {
                  resolve: `gatsby-remark-autolink-headers`,
                  options: {
                    icon: false,
                  },
                },
                {
                  resolve: `gatsby-remark-highlight-code`,
                  options: {
                    terminal: "carbon",
                    theme: "night-owl"
                  },
                },            
            ],
        },
    },
    {
        resolve: `gatsby-plugin-postcss`,
        options: {
          postCssPlugins: [
            tailwindcss(tailwindConfig),
            autoprefixer,
            ...(process.env.NODE_ENV === `production`
              ? [require(`cssnano`)]
              : []),
          ],
        },
      },
    {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: "UA-199717351-1",
          head: true,
        },
    },
]

if (siteMetadata.disqus) {
    plugins.push({
        resolve: `gatsby-plugin-disqus`,
        options: {
            shortname: siteMetadata.disqus,
        },
    } as any)
}

export default {
  siteMetadata: siteMetadata,
  plugins: plugins,
};
