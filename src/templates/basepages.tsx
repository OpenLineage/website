import React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/layout";
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { BasePagesQuery } from "./__generated__/BasePagesQuery";

export default function basePages({ data, location }: PageProps<BasePagesQuery, {}>) {
    return (
        <Layout seo={{
            title: data.mdx.frontmatter.title,
            description: data.mdx.frontmatter.description,
            image: data.mdx.frontmatter.image?.publicURL
        }}
        location={location}>
            <div className="boxed">
                <div className="title px-4 py-12 text-center lg:py-14 lg:px-0">
                    <h2 className="text-5xl text-color-1">{data.mdx.frontmatter.title}</h2>
                </div>
                <div className="post-content px-4 py-12 lg:py-14 lg:px-0">
                    <MDXProvider>
                        <MDXRenderer>{data.mdx.body}</MDXRenderer>
                    </MDXProvider>
                </div>
            </div>
        </Layout>
    );
}

export const query = graphql`
    query BasePagesQuery($slug: String!) {
        mdx(fields: { slug: { eq: $slug } }) {
            body
            frontmatter {
                title
                image {
                    publicURL
                }
                description
            }
        }
    }
`;
