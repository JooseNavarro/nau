import { Table, Select } from "antd";
import { useOrderTable } from "@/app/components/Table/useTable";
import { OrderModal } from "@/app/components/Modal";
import { Order } from "@/app/lib/interfaces";

export interface OrderTableProps {
  data?: {
    orders: Order[];
  };
  loading: boolean;
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
  updateStatus: (options: {
    variables: { id: string; status: string };
  }) => void;
  setStatusFilter: (status: string | null) => void;
  setProviderFilter: (provider: string | null) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({
  data,
  loading,
  setSelectedOrder,
  updateStatus,
  setStatusFilter,
  setProviderFilter,
  selectedOrder,
}) => {
  const {
    columns,
    providerOptions,
    statusOptions,
    getStatusLabel,
    statusColorMap,
  } = useOrderTable({
    updateStatus,
    setSelectedOrder,
  });
  return (
    <>
      <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
        <Select
          allowClear
          placeholder="Filtrar por status"
          onChange={(val) => setStatusFilter(val)}
          style={{ width: 200 }}
        >
          {statusOptions.map((status) => (
            <Select.Option key={status.key} value={status.key}>
              {status.label}
            </Select.Option>
          ))}
        </Select>
        <Select
          allowClear
          placeholder="Filtrar por provider"
          onChange={(val) => setProviderFilter(val)}
          style={{ width: 200 }}
        >
          {providerOptions.map((provider) => (
            <Select.Option key={provider} value={provider}>
              {provider}
            </Select.Option>
          ))}
        </Select>
      </div>

      <Table
        dataSource={data?.orders || []}
        loading={loading}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <OrderModal
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        getStatusLabel={getStatusLabel}
        statusColorMap={statusColorMap}
      />
    </>
  );
};
