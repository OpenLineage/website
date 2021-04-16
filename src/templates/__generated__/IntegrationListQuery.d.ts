/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IntegrationListQuery
// ====================================================

export interface IntegrationListQuery_allMdx_edges_node_frontmatter_image_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface IntegrationListQuery_allMdx_edges_node_frontmatter_image_childImageSharp {
  fluid: IntegrationListQuery_allMdx_edges_node_frontmatter_image_childImageSharp_fluid | null;
  id: string;
}

export interface IntegrationListQuery_allMdx_edges_node_frontmatter_image {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: IntegrationListQuery_allMdx_edges_node_frontmatter_image_childImageSharp | null;
}

export interface IntegrationListQuery_allMdx_edges_node_frontmatter {
  title: string;
  description: string | null;
  image: IntegrationListQuery_allMdx_edges_node_frontmatter_image | null;
}

export interface IntegrationListQuery_allMdx_edges_node_fields {
  slug: string | null;
}

export interface IntegrationListQuery_allMdx_edges_node {
  id: string;
  frontmatter: IntegrationListQuery_allMdx_edges_node_frontmatter | null;
  fields: IntegrationListQuery_allMdx_edges_node_fields | null;
}

export interface IntegrationListQuery_allMdx_edges {
  node: IntegrationListQuery_allMdx_edges_node;
}

export interface IntegrationListQuery_allMdx {
  edges: IntegrationListQuery_allMdx_edges[];
}

export interface IntegrationListQuery {
  allMdx: IntegrationListQuery_allMdx;
}

export interface IntegrationListQueryVariables {
  skip: number;
  limit: number;
}
