import { Modal, Descriptions, Tag, Space, Typography } from "antd";
import {
  NumberOutlined,
  BarcodeOutlined,
  ShopOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Order } from "@/app/lib/interfaces";

const { Text } = Typography;

export interface OrderModalProps {
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
  getStatusLabel: (status: string) => string;
  statusColorMap: Record<string, string>;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  selectedOrder,
  setSelectedOrder,
  getStatusLabel,
  statusColorMap,
}) => {
  return (
    <Modal
      open={!!selectedOrder}
      onCancel={() => setSelectedOrder(null)}
      footer={null}
      title={
        <Space>
          <InfoCircleOutlined />
          <Text strong>Detalle de orden</Text>
        </Space>
      }
      centered
      width={600}
    >
      {selectedOrder && (
        <Descriptions
          bordered
          column={1}
          size="middle"
          styles={{ content: { fontWeight: 500 } }}
        >
          <Descriptions.Item
            label={
              <>
                <NumberOutlined /> ID
              </>
            }
          >
            {selectedOrder.id}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <BarcodeOutlined /> Referencia
              </>
            }
          >
            {selectedOrder.reference}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <ShopOutlined /> Proveedor
              </>
            }
          >
            {selectedOrder.provider}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <InfoCircleOutlined /> Estado
              </>
            }
          >
            <Tag color={statusColorMap[selectedOrder.status]}>
              {getStatusLabel(selectedOrder.status)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <>
                <CalendarOutlined /> ETA
              </>
            }
          >
            {selectedOrder.eta}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};
