import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { Row, Col } from "../components/shortcodes/index"
import { IntegrationQuery } from "./__generated__/IntegrationQuery"

export default function porfolio ({ location, data }: PageProps<IntegrationQuery, {}>) {
    return (
        <Layout
            seo={{
                title: data.mdx.frontmatter.title,
                description: data.mdx.frontmatter.description,
                image: data.mdx.frontmatter.banner.publicURL,
            }}
            location={location}
        >
            <div className="md:px-4 mt-12 py-6 md:w-11/12 mx-auto">
                <div className="mx-auto relative">
                    <div className="flex items-center justify-center relative lg:absolute w-full h-full top-0 left-0">
                        <div className="px-4 py-8 lg:p-0 relative z-10 text-center text-color-default lg:text-white bg-bgalt lg:bg-transparent">
                            <h1 className="text-5xl font-bold text-color-2 lg:text-white">
                                {data.mdx.frontmatter.title}
                            </h1>
                            <p className="mt-3 md:w-3/4 mx-auto">
                                {data.mdx.frontmatter.description}
                            </p>
                        </div>
                    </div>
                    {data.mdx.frontmatter.banner.publicURL.endsWith('.svg') ?
                    <img src={data.mdx.frontmatter.banner.publicURL} alt="''"/> :
                    <Img fluid={data.mdx.frontmatter.banner.childImageSharp.fluid}/>}
                </div>
                <div className="lg:w-3/4 md:w-11/12 sm:w-full p-3 mt-4 md:mt-6 mx-auto lg:mt-12 post-content">
                    <MDXProvider components={{ Row, Col }}>
                        <MDXRenderer>{data.mdx.body}</MDXRenderer>
                    </MDXProvider>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query IntegrationQuery($slug: String!) {
        mdx(fields: { slug: { eq: $slug } }) {
            body
            frontmatter {
                title
                date(formatString: "DD MMMM YYYY")
                description
                banner {
                    publicURL
                    childImageSharp {
                        fluid(maxWidth: 1920) {
                            srcSet
                            ...GatsbyImageSharpFluid
                        }
                        id
                    }
                }
            }
        }
    }
`