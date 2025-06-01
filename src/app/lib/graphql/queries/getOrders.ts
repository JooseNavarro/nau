import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query GetOrders($status: String, $provider: String) {
    orders(status: $status, provider: $provider) {
      id
      reference
      provider
      status
      eta
    }
  }
`;
