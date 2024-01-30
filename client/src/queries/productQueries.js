import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      _id
      name
      description
      price
      quantity
      category
      imageUrl
      createdAt
    }
  }
`;

const GET_PRODUCT = gql`
query GetProduct($id: ID!) {
    product(_id: $id) {
        _id
        name
        description
        price
        quantity
        category
        imageUrl
        createdAt
    }
}
    `;

export { GET_PRODUCTS, GET_PRODUCT };