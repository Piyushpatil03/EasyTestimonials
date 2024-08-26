import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!) {
    Signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
      token
    }
  }
`;

export const UPDATE_MUTATION = gql`
  mutation UpdateMutation(
    $company_name: String!
    $website: String!
    $desc: String!
    $service: String!
  ) {
    Update(
      company_name: $company_name
      website: $website
      desc: $desc
      service: $service
    ) {
      email
      company {
        company_name
        website
        desc
        service
      }
    }
  }
`;

export const TESTIMONIAL_MUTATION = gql`
  mutation TestimonialMutation(
    $username: String!
    $customer_name: String!
    $designation: String!
    $city: String!
    $org_name: String!
    $ratings: Float!
    $short_testimonial: String!
    $complete_testimonial: String!
  ) {
    addTestimonial(
      username: $username
      customer_name: $customer_name
      designation: $designation
      city: $city
      org_name: $org_name
      ratings: $ratings
      short_testimonial: $short_testimonial
      complete_testimonial: $complete_testimonial
    ) {
      email
    }
  }
`;

export const LIKED_MUTATION = gql`
  mutation LikedTestimonial($username : String!, $actions: [LikedInputs!]!) {
    addLikes(username : $username, actions: $actions) {
      success,
      message
    }
  }
`;
