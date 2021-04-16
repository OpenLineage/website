import { createFilePath } from 'gatsby-source-filesystem';
import { GatsbyNode } from 'gatsby';
import path from 'path';


export const onCreateNode: GatsbyNode['onCreateNode'] = async ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `Mdx`) {
        const slug = createFilePath({ node, getNode })
        const sourceName = getNode(node.parent).sourceInstanceName
        const prefix = sourceName === "basepages" ? '' : '/'+sourceName;

        createNodeField({
            node,
            name: `slug`,
            value: `${prefix}${slug}`,
        })
        createNodeField({
            node,
            name: `sourceName`,
            value: sourceName,
        })
    }
}


export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
    const { createPage } = actions

    return graphql<any>(`
        query GatsbyNodeQuery {
            all: allMdx {
                edges {
                    node {
                        fields {
                            slug
                            sourceName
                        }
                    }
                }
            }
            blog: allMdx(filter: { fields: { sourceName: { eq: "blog" } } }) {
                edges {
                    node {
                        id
                    }
                }
            }
            integration: allMdx(filter: { fields: { sourceName: { eq: "integration" } } }) {
                edges {
                    node {
                        id
                    }
                }
            }
            limitPost: site {
                siteMetadata {
                    blogItemsPerPage
                    integrationItemsPerPage
                }
            }
        }
    `).then(result => {
        result.data.all.edges.forEach(({ node }) => {
            let template = node.fields.sourceName
            createPage({
                path: node.fields.slug,
                component: path.resolve("./src/templates/" + template + ".tsx"),
                context: {
                    slug: node.fields.slug,
                },
            })
        })

        const blogPosts = result.data.blog.edges
        const blogPostsPerPage =
            result.data.limitPost.siteMetadata.blogItemsPerPage
        const numBlogPages = Math.ceil(blogPosts.length / blogPostsPerPage)

        Array.from({ length: numBlogPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/blog` : `/blog/${i + 1}`,
                component: path.resolve("./src/templates/blog-list.tsx"),
                context: {
                    limit: blogPostsPerPage,
                    skip: i * blogPostsPerPage,
                    numPages: numBlogPages,
                    currentPage: i + 1,
                },
            })
        })


        const integrationItems = result.data.integration.edges
        const integrationItemsPerPage =
            result.data.limitPost.siteMetadata.integrationItemsPerPage
        const numIntegrationItems = Math.ceil(integrationItems.length / integrationItemsPerPage)

        Array.from({ length: numIntegrationItems }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/integration` : `/integration/${i + 1}`,
                component: path.resolve("./src/templates/integration-list.tsx"),
                context: {
                    limit: integrationItemsPerPage,
                    skip: i * integrationItemsPerPage,
                    numPages: numIntegrationItems,
                    currentPage: i + 1,
                },
            })
        })
    })
}
