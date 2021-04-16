/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IntegrationQuery
// ====================================================

export interface IntegrationQuery_mdx_frontmatter_banner_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface IntegrationQuery_mdx_frontmatter_banner_childImageSharp {
  fluid: IntegrationQuery_mdx_frontmatter_banner_childImageSharp_fluid | null;
  id: string;
}

export interface IntegrationQuery_mdx_frontmatter_banner {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: IntegrationQuery_mdx_frontmatter_banner_childImageSharp | null;
}

export interface IntegrationQuery_mdx_frontmatter {
  title: string;
  date: any | null;
  description: string | null;
  banner: IntegrationQuery_mdx_frontmatter_banner | null;
}

export interface IntegrationQuery_mdx {
  body: string;
  frontmatter: IntegrationQuery_mdx_frontmatter | null;
}

export interface IntegrationQuery {
  mdx: IntegrationQuery_mdx | null;
}

export interface IntegrationQueryVariables {
  slug: string;
}
