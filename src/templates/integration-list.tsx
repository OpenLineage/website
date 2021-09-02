import React, { useEffect } from "react"
import { graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import IntegrationItem from "../components/item-integration"
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
                <div className="boxed py-8">
                    <p>OpenLineage connectors have been created for major job schedulers and data platforms. By using these connectors, the appropriate API calls will be made automatically each time your pipeline executes. They capture information about datasets, jobs, and runs, allowsing you to study lineage across multiple data sources.</p>
                    <table className="integration-list">
                        <tr>
                            <th>
                                Platform
                            </th>
                            <th>
                                Version
                            </th>
                            <th>
                                Data Sources
                            </th>
                            <th>
                                Resources
                            </th>
                        </tr>
                        {integrationItems}
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query IntegrationListQuery($skip: Int!, $limit: Int!) {
        allMdx(
            filter: { fields: { sourceName: { eq: "integration" } } }
            sort: { fields: [frontmatter___title], order: ASC }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        version
                        datasources
                        github
                        blog
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
