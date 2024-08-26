import { gql } from "@apollo/client";

export const PROFILE_QUERY = gql`
  query {
    profile {
      name
      username
      company {
        company_name
        website
        desc
        service
      }
    }
  }
`;

export const COMPANY_QUERY = gql`
  query getCompany($username: String!) {
    comp(username: $username) {
      name
      company {
        company_name
        website
        desc
        service
      }
    }
  }
`;

export const TESTIMONIAL_QUERY = gql`
  query {
    testi {
      username
      testimonials {
        _id
        customer_name
        org_name
        ratings
        short_testimonial
        complete_testimonial
        isLiked
      }
    }
  }
`;

export const EMBED_QUERY = gql`
  query getEmbed($username: String!) {
    embed(username: $username) {
      _id
      customer_name
      designation
      org_name
      ratings
      short_testimonial
      complete_testimonial
      isLiked
      city
      createdAt
      updatedAt
    }
  }
`;


export const HOME_QUERY = gql`
  query {
    home {
      name
      username
      testimonials {
        customer_name
        org_name
        ratings
        short_testimonial
        complete_testimonial
      }
    }
  }
`;

export const SEARCH_QUERY = gql`
  query searchQuery($searchTerm: String!) {
    search(searchTerm: $searchTerm) {
      _id
      customer_name
      designation
      org_name
      ratings
      short_testimonial
      complete_testimonial
      isLiked
      city
      createdAt
      updatedAt
    }
  }
`;