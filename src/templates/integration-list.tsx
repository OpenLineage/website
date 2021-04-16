import React, { useEffect } from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import IntegrationItem from "../components/item-integration"
import Pagination from "../components/pagination"
import { IntegrationListQuery } from "./__generated__/IntegrationListQuery"

export default function integrationList({ data, pageContext, location }: PageProps<IntegrationListQuery, {}>) {


    useEffect(() => {
        window.dispatchEvent(new CustomEvent('scroll'))
    }, [])

    const integrationItems = data.allMdx.edges.map((item, i) => (
        <IntegrationItem data={item.node} key={item.node.id} even={(i + 1) % 2 === 0}/>
    ))

    return (
        <Layout
            seo={{
                title: "Integrations",
            }}
            location={location}
        >
            <div className="py-12 px-4 lg:px-0">
                <div className="title py-8 text-center">
                    <h2 className="text-5xl text-color-1">
                        Integrations
                    </h2>
                </div>
                <div className="flex flex-wrap">{integrationItems}</div>
                <div className="mt-8 lg:mt-24">
                    <Pagination pageContext={pageContext} type="integration" />
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query IntegrationListQuery($skip: Int!, $limit: Int!) {
        allMdx(
            filter: { fields: { sourceName: { eq: "integration" } } }
            sort: { fields: [frontmatter___date], order: DESC }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        image {
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
                    fields {
                        slug
                    }
                }
            }
        }
    }
`
