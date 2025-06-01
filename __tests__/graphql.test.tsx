import request from "supertest";
import { startStandaloneServer } from "@apollo/server/standalone";
import { createGraphQLServer } from "@/app/lib/graphql/test/server-test";

let serverUrl: string;

beforeAll(async () => {
  const { url } = await startStandaloneServer(createGraphQLServer(), {
    listen: { port: 0 },
  });
  serverUrl = url;
});

describe("API GraphQL de Órdenes", () => {
  it("debe obtener órdenes filtradas por estado", async () => {
    const query = `
      query {
        orders(status: "pending") {
          id
          reference
        }
      }
    `;

    const res = await request(serverUrl).post("/").send({ query });

    expect(res.body.data.orders).toBeInstanceOf(Array);
    expect(res.body.data.orders.length).toBeGreaterThan(0);
  });

  it("debe actualizar el estado de una orden", async () => {
    const mutation = `
      mutation {
        updateOrderStatus(id: "1", status: "completed") {
          id
          status
        }
      }
    `;

    const res = await request(serverUrl).post("/").send({ query: mutation });

    expect(res.body.data.updateOrderStatus.status).toBe("completed");
  });

  it("debe obtener una orden específica por ID", async () => {
    const query = `
      query {
        order(id: "1") {
          id
          reference
          status
        }
      }
    `;

    const res = await request(serverUrl).post("/").send({ query });

    expect(res.body.data.order).toBeDefined();
    expect(res.body.data.order.id).toBe("1");
  });

  it("debe retornar un array vacío para un estado inválido", async () => {
    const query = `
      query {
        orders(status: "invalid-status") {
          id
        }
      }
    `;

    const res = await request(serverUrl).post("/").send({ query });

    expect(res.body.data.orders).toEqual([]);
  });

  it("debe reflejar el cambio de estado en una consulta posterior", async () => {
    const mutation = `
      mutation {
        updateOrderStatus(id: "1", status: "shipped") {
          id
          status
        }
      }
    `;
    await request(serverUrl).post("/").send({ query: mutation });

    const query = `
      query {
        order(id: "1") {
          status
        }
      }
    `;
    const res = await request(serverUrl).post("/").send({ query });

    expect(res.body.data.order.status).toBe("shipped");
  });
});
