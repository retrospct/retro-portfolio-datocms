import React from "react";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const Work = ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsWork.title}</h1>
        <p className="sheet__lead">{data.datoCmsWork.excerpt}</p>
        <div className="sheet__slider">
          {data.datoCmsWork.gallery.map((item) => (
            <img
              alt={data.datoCmsWork.title}
              key={item.originalId}
              src={item.url}
            />
          ))}
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsWork.descriptionNode.childMarkdownRemark.html,
          }}
        />
        <div className="sheet__gallery">
          <GatsbyImage
            image={data.datoCmsWork.coverImage.gatsbyImageData}
            alt={data.datoCmsWork.coverImage.alt}
          />
        </div>
      </div>
    </article>
  </Layout>
);

export default Work;

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      gallery {
        url
        originalId
        # fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
        #   src
        # }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        alt
        gatsbyImageData
        # url
        # fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
        #   ...GatsbyDatoCmsSizes
        # }
      }
    }
  }
`;
