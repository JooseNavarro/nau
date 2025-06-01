"use client";

import { useAppWrapper } from "@/app/components/AppWrapper/useAppWraper";
import { OrderTable } from "@/app/components/Table";
import { WelcomeModal } from "@/app/components/Welcome";

import { Row, Col } from "antd";
import { Typography, Space } from "antd";
const { Title, Paragraph } = Typography;

export const AppWrapper: React.FC = () => {
  const {
    updateStatus,
    data,
    loading,
    selectedOrder,
    setSelectedOrder,
    setProviderFilter,
    setStatusFilter,
  } = useAppWrapper();
  return (
    <Row justify="center">
      <Col xs={24} sm={22} md={20} lg={20} xl={22} xxl={20}>
        <div style={{ padding: 24 }}>
          <Space direction="vertical" style={{ marginBottom: 24 }}>
            <Title level={3} style={{ margin: 0 }}>
              Órdenes de Importación
            </Title>
          </Space>

          <Paragraph type="secondary">
            Bienvenido al panel de gestión de órdenes de <strong>NAU</strong>.
            Aquí puedes visualizar, filtrar y actualizar el estado de las
            órdenes de importación de forma sencilla y rápida. Haz clic en una
            referencia para ver más detalles o cambiar el estado desde el
            listado.
          </Paragraph>

          <OrderTable
            updateStatus={updateStatus}
            data={data}
            loading={loading}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            setStatusFilter={setStatusFilter}
            setProviderFilter={setProviderFilter}
          />
        </div>
      </Col>
      <WelcomeModal />
    </Row>
  );
};
