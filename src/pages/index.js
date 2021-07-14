import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const IndexPage = ({ data }) => (
  <Layout>
    {data.allDatoCmsWork.edges.map(({ node: work }) => (
      <div key={work.id} className="showcase__item">
        <figure className="card">
          <Link to={`/works/${work.slug}`} className="card__image">
            <GatsbyImage
              image={work.coverImage.gatsbyImageData}
              alt={work.coverImage.alt}
            />
          </Link>
          <figcaption className="card__caption">
            <h6 className="card__title">
              <Link to={`/works/${work.slug}`}>{work.title}</Link>
            </h6>
            <div className="card__description">
              <p>{work.excerpt}</p>
            </div>
          </figcaption>
        </figure>
      </div>
    ))}
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            alt
            gatsbyImageData
            # url
            # fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
            #   ...GatsbyDatoCmsSizes
            # }
          }
        }
      }
    }
  }
`;
