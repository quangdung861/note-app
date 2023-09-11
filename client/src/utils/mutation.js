import { gql } from '@apollo/client';

export const DELETE_DOCUMENT = gql`
  mutation DeleteDocument($id: ID!) {
    deleteDocument(id: $id) {
      _id
    }
  }
`;