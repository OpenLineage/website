import React, { useEffect, useRef, useState } from "react"
import { graphql, PageProps } from "gatsby"
import { Link } from "gatsby"

import { ArrowRight } from "react-feather"
import ScrollIntoView from "react-scroll-into-view"

import Layout from "../components/layout"
import { Button } from "../components/ui"

import ItemIntegration from "../components/item-integration"
import ItemBlog from "../components/item-blog"
import { Form, Description as ContactDescription } from "../components/contact"
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
            height: '40em',
            backgroundRepeat: 'no-repeat',
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
            <p className="text-lg lg:text-xl text-color-2 pt-4 lg:pt-0">
                {data.introTag}
            </p>
            <p className="text-base boxed lg:text-lg mt-4">{data.description}</p>
            <Link to='/getting-started'><Button
                title="Get Started"
                type="button"
                iconRight={<ArrowRight />}
            /></Link>
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
            className="wall flex flex-col justify-center items-center text-center"
            {...spanAttrs}
            ref={wall}
        >
            {innerComponents}
        </div>
    )
}

const About = ({ data }) => {
    return (
        <div className="boxed">
            <div className="px-4 py-12 text-center lg:py-14 lg:px-0">
                <h2 className="text-color-1 text-5xl lg:text-6xl">
                    About the Platform
                </h2>
                <p className="mt-5 text-lg">{data}</p>
                <img
                        src="/images/stack.png"
                        alt=""
                        className="h-full w-auto max-w-none lg:h-auto lg:w-full pt-6"
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

const Contact = ({ data }) => {
    const hasContactForm = data.api_url
    return (
        <div className="container mx-auto">
            <div className="pt-20 pb-10 lg:pt-40 lg:pb-20 text-center">
                <h2 className="text-color-1 text-5xl lg:text-6xl">
                    Contact
                </h2>
            </div>
            <div className="flex flex-wrap pb-40">
                {hasContactForm && (
                    <div className="w-full lg:w-1/2 px-4 lg:pl-2 lg:pr-6">
                        <Form api={data.api_url} />
                    </div>
                )}
                <div
                    className={`w-full ${
                        hasContactForm ? "lg:w-1/2" : "lg:w-2/3 mx-auto"
                    } px-6 pt-8`}
                >
                    <ContactDescription data={data} />
                </div>
            </div>
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
