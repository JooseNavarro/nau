import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import ordersData from "@/app/lib/mock/orders.json";
import type {
  Order,
  OrdersArgs,
  OrderArgs,
  UpdateOrderStatusArgs,
} from "@/app/lib/interfaces";

const typeDefs = gql`
  type Order {
    id: ID
    reference: String!
    provider: String!
    status: String!
    eta: String
  }

  type Query {
    orders(status: String, provider: String): [Order!]!
    order(id: ID): Order
  }

  type Mutation {
    updateOrderStatus(id: ID, status: String!): Order
  }
`;
// eslint-disable-next-line prefer-const
let orders: Order[] = [...ordersData];

const resolvers = {
  Query: {
    orders: (_: undefined, args: OrdersArgs): Order[] => {
      return orders.filter((order) => {
        return (
          (!args.status || order.status === args.status) &&
          (!args.provider || order.provider === args.provider)
        );
      });
    },
    order: (_: unknown, { id }: OrderArgs): Order | undefined => {
      return orders.find((o) => o.id === id);
    },
  },
  Mutation: {
    updateOrderStatus: (
      _: undefined,
      { id, status }: UpdateOrderStatusArgs
    ): Order | undefined => {
      const order = orders.find((o) => o.id === id);
      if (order) order.status = status;
      return order;
    },
  },
};

export function createGraphQLServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
  });
}
