import React, { useState, useEffect, useRef } from "react"
import { Button } from "./ui"
import Img from "gatsby-image"
import { ArrowRight } from "react-feather"

import { IndexPageQuery_integration_edges_node } from "../pages/__generated__/IndexPageQuery"

type ItemIntegrationProps = { data: IndexPageQuery_integration_edges_node, even: boolean };
export const ItemIntegration: React.FC<ItemIntegrationProps> = ({ data, even }) => {
    return (
        <div className="large-container mx-auto">
            <div
                className={`my-4 py-8 lg:py-24 integration-item md:flex
                    ${even ? "even flex-row-reverse" : ""}`}
            >
                <div className="relative flex-1">
                    <div className="relative">
                        <Img
                            fluid={
                                data.frontmatter.image.childImageSharp.fluid
                            }
                            alt={data.frontmatter.title}
                        />
                    </div>
                </div>
                <div className="flex-1 flex md:px-4 lg:px-6 items-center">
                    <div
                        className={`flex flex-1 flex-wrap  ${
                            even ? "md:justify-end md:text-right" : ""
                        }`}
                    >
                        <h3 className="text-color-1 text-5xl">
                            {data.frontmatter.title}
                        </h3>
                        <p className="lg:mt-4">
                            {data.frontmatter.description}
                        </p>
                        <Button
                            to={data.fields.slug}
                            label={`Read more about ${data.frontmatter.title}`}
                            title={"Read More"}
                            iconRight={<ArrowRight />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemIntegration;