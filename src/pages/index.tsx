import React, { useEffect, useRef, useState } from "react"
import { graphql, PageProps } from "gatsby"
import { Link } from "gatsby"

import { ArrowRight } from "react-feather"
import { GitHub } from "react-feather"
import { Slack } from "react-feather"
import ScrollIntoView from "react-scroll-into-view"

import Layout from "../components/layout"
import { Button } from "../components/ui"

import ItemIntegration from "../components/item-integration"
import ItemBlog from "../components/item-blog"
import { IndexPageQuery } from "./__generated__/IndexPageQuery"

export default ({ data, location }: PageProps<IndexPageQuery>) => {
    const siteData = data.site.siteMetadata

    const integrationList = data.integration.edges.map((item, _) => (
        <ItemIntegration
            data={item.node}
            key={`p-item-index-${item.node.id}`}
            even={(_ + 1) % 2 === 0}
        />
    ))

    const blogList = data.blog.edges.map(item => (
        <ItemBlog data={item.node} key={`b-item-index-${item.node.id}`} />
    ))

    return (
        <Layout
            front={true}
            seo={{
                title: "Home",
                description: siteData.description,
            }}
            navPlaceholder={false}
            location={location}
        >
            <Wall data={siteData} />
            {siteData.about !== "" && <About data={siteData.about} />}
            <Blog>{blogList}</Blog>
        </Layout>
    )
}

const Wall = ({ data }) => {
    const wall = useRef(null)

    const twoColumnWall = data.twoColumnWall

    const [state, changeState] = useState({
        loaded: false,
        supportsBlend: false,
    })

    useEffect(() => {
        if (window.CSS && !state.loaded) {
            if (CSS.supports("mix-blend-mode", "screen")) {
                wall.current.classList.add("supports-blend")
                changeState({
                    loaded: true,
                    supportsBlend: true,
                })
            }
        }
    }, [state.loaded])

    let spanAttrs: Partial<{ style: unknown }> = {}

    if (!twoColumnWall && data.titleImage) {
        spanAttrs.style = {
            backgroundImage: `url('${data.titleImage}')`,
            height: '35em',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }

    }

    const innerComponents = (
        <React.Fragment>
            <div className="title">
                <h1
                    className={`text-6xl relative mt-20 lg:text-7xl ${
                        data.capitalizeTitleOnHome ? "uppercase" : ""
                    }`}
                >
                    <span></span>
                    {data.title}
                </h1>
            </div>
            <p className="text-lg lg:text-xl text-color-3 uppercase pt-4 lg:pt-0">
                {data.introTag}
            </p>
            <p className="text-base text-color-4 boxed lg:text-lg mt-4">{data.description}</p>
            <span className="py-5">
                <Button
                    title="Get Started"
                    to='/getting-started'
                    type="link"
                    iconRight={<ArrowRight />}
                    className="mx-5"
                />
                <Button
                    title="GitHub"
                    to='https://github.com/OpenLineage'
                    type="extbutton"
                    iconRight={<GitHub />}
                    className="mx-5"
                />
                <Button
                    title="Slack"
                    to='http://bit.ly/OpenLineageSlack'
                    type="extbutton"
                    iconRight={<Slack />}
                    className="mx-5"
                />
            </span>
        </React.Fragment>
    )

    if (twoColumnWall) {
        return (
            <div
                className="wall h-screen flex relative justify-center items-center overflow-hidden"
                ref={wall}
            >
                <div className="flex-1 lg:block absolute lg:relative w-full h-full top-0 left-0">
                    <div
                        className="absolute left-0 top-0 w-full h-full lg:hidden"
                        style={{
                            background: "rgba(0,0,0,.75)",
                        }}
                    ></div>
                    <img
                        src={data.titleImage}
                        alt=""
                        className="h-full w-auto max-w-none lg:h-auto lg:w-full"
                    />
                </div>
                <div className="flex-1 text-center p-3 relative z-10 lg:text-left lg:pl-8 text-white lg:text-color-default">
                    {innerComponents}
                </div>
            </div>
        )
    }

    return (
        <div
            className="wall flex flex-col justify-center items-center text-center mb-12"
            {...spanAttrs}
            ref={wall}
        >
            {innerComponents}
        </div>
    )
}

const About = ({ data }) => {
    let spanAttrs: Partial<{ style: unknown }> = {}

    spanAttrs.style = {
        margin: '0 auto',
    }

    return (
        <div className="boxed">
            <div className="px-4 py-12 text-center lg:py-14 lg:px-0">
                <h2 className="text-color-1 text-3xl lg:text-4xl">
                    About the Project
                </h2>
                <p className="mt-5 text-lg">{data}</p>
                <img
                        src="/images/ol-stack.svg"
                        alt=""
                        {...spanAttrs}
                        className="h-full w-4/5 max-w-none lg:h-auto lg:w-4/5 py-3 pt-6 mb-6"
                />
                <p className="mt-5 text-lg py-3">
                    At the core of OpenLineage is a standard API for capturing lineage events. Pipeline components - like schedulers, warehouses, analysis tools, and SQL engines - can use this API to send data about runs, jobs, and datasets to a compatible OpenLineage backend for further study.
                </p>

                <Button
                    title="Read the API Docs"
                    to='/docs/javadoc'
                    type="link"
                    iconRight={<ArrowRight />}
                />
            </div>
        </div>
    )
}

const Blog = ({ children }) => {
    return (
        <div className="container mx-auto px-0 pb-40">
            <div className="px-4 py-12 text-center lg:py-14 lg:px-0">
                <h2 className="text-color-1 text-5xl lg:text-6xl">
                    Blog
                </h2>
            </div>
            <div className="flex flex-wrap">{children}</div>
        </div>
    )
}

export const query = graphql`
    query IndexPageQuery {
        site: site {
            siteMetadata {
                title
                description
                capitalizeTitleOnHome
                titleImage
                ogImage
                twoColumnWall
                introTag
                description
                about
                contact {
                    api_url
                    description
                    mail
                    phone
                    address
                }
                social {
                    name
                    url
                    icon
                }
            }
        }
        integration: allMdx(
            filter: { fields: { sourceName: { eq: "integration" } } }
            limit: 6
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        image {
                            childImageSharp {
                                fluid(maxWidth: 1000) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
        blog: allMdx(
            filter: { fields: { sourceName: { eq: "blog" } } }
            limit: 6
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        date(formatString: "DD MMMM YYYY")
                        image {
                            childImageSharp {
                                fluid(maxWidth: 1000) {
                                    ...GatsbyImageSharpFluid
                                }
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
