import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { ArrowRight } from "react-feather"

import { IndexPageQuery_integration_edges_node } from "../pages/__generated__/IndexPageQuery"

type ItemIntegrationProps = { data: IndexPageQuery_integration_edges_node, even: boolean };
export const ItemIntegration: React.FC<ItemIntegrationProps> = ({ data, even }) => {

    let datasources = data.frontmatter.datasources.split(',')

    let rowList = datasources.map((datasource,index) =>{
        return (
            <tr className={`integration-item`}>
                {index === 0 && (
                    <td className="int-desc" rowspan={datasources.length}>
                        <h3 className="mt-0"><Link to={data.fields.slug} title={"Read More"}>{data.frontmatter.title}</Link></h3>
                        <p>{data.frontmatter.description}</p>
                    </td>
                )}
  
                {index === 0 && (
                    <td rowspan={datasources.length}>
                        <p>{data.frontmatter.version}</p>
                    </td>
                )}
                <td>
                    <p>{datasource}</p>
                </td>
                {index === 0 && (
                    <td rowspan={datasources.length}>
                        <ul>
                            <li className="mb-2 text-color-2"><Link to={data.fields.slug} title={"Read More"}>Docs <ArrowRight className="inline-block" /></Link></li>
                            {data.frontmatter.github && (
                                <li className="mb-2 text-color-2"><Link to={data.frontmatter.github} title={"Read More"}>GitHub <ArrowRight className="inline-block" /></Link></li>
                            )}

                            {data.frontmatter.blog && (
                                <li className="mb-2 text-color-2"><Link to={data.frontmatter.blog} title={"Read More"}>Blog <ArrowRight className="inline-block" /></Link></li>
                            )}
                        </ul>
                    </td>
                )}
            </tr> 
        )
    })

    return rowList
}

export default ItemIntegration;