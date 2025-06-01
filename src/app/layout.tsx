"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/app/lib/apollo-client";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="es">
    <body>
      <ApolloProvider client={client}>
        <AntdRegistry>{children}</AntdRegistry>
      </ApolloProvider>
    </body>
  </html>
);

export default RootLayout;
