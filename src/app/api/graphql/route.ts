import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [],
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
