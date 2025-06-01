"use client";
import { useState, useEffect } from "react";
import { Modal, Typography, Space } from "antd";

const { Title, Text } = Typography;

import { InfoCircleOutlined } from "@ant-design/icons";

export const WelcomeModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
      width={720}
    >
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        <Title level={3} style={{ marginBottom: 0 }}>
          <InfoCircleOutlined style={{ marginRight: 8, color: "#1677ff" }} />
          Instrucciones de Uso
        </Title>
        <ul
          style={{ paddingLeft: 20, margin: 0, fontSize: 15, lineHeight: 1.8 }}
        >
          <li>
            Utiliza los <strong>selectores de estado</strong> y{" "}
            <strong>proveedor</strong> en la parte superior para filtrar las
            órdenes en la tabla.
          </li>
          <li>
            Puedes <strong>actualizar el estado</strong> de cada orden desde la
            columna <Text italic>Action</Text> usando el{" "}
            <strong>dropdown</strong>.
          </li>
          <li>
            Haz clic sobre el <strong>número de referencia</strong> para ver más
            detalles de la orden en un panel lateral.
          </li>
        </ul>
      </Space>
    </Modal>
  );
};
