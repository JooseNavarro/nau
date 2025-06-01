import { Order } from "@/app/lib/interfaces";
import { Tag, Select } from "antd";

export interface UpdateStatusProps {
  updateStatus: (options: {
    variables: { id: string; status: string };
  }) => void;
  setSelectedOrder: (order: Order | null) => void;
}

export function useOrderTable({
  updateStatus,
  setSelectedOrder,
}: UpdateStatusProps) {
  const statusOptions = [
    {
      key: "pending",
      label: "Pendiente",
    },
    {
      key: "in_transit",
      label: "En tránsito",
    },
    {
      key: "delivered",
      label: "Entregado",
    },
  ];
  const providerOptions = ["Maersk", "MSC", "Evergreen"];
  const statusColorMap: Record<string, string> = {
    pending: "orange",
    in_transit: "blue",
    delivered: "green",
  };

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      pending: "Pendiente",
      in_transit: "En tránsito",
      delivered: "Entregado",
    };
    return labels[status] || status;
  };
  const columns = [
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
      render: (text: string, record: Order) => (
        <span
          style={{ color: "#1677ff", cursor: "pointer" }}
          onClick={() => setSelectedOrder(record)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={statusColorMap[status] || "default"}>
          {getStatusLabel(status).toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "ETA",
      dataIndex: "eta",
      key: "eta",
    },
    {
      title: "Action",
      key: "action",
      render: (_: undefined, record: Order) => (
        <Select
          defaultValue={record.status}
          style={{ width: 140 }}
          onChange={(value) =>
            updateStatus({ variables: { id: record.id, status: value } })
          }
        >
          {statusOptions.map((status) => (
            <Select.Option key={status.key} value={status.key}>
              {status.label}
            </Select.Option>
          ))}
        </Select>
      ),
    },
  ];

  return {
    columns,
    providerOptions,
    statusOptions,
    getStatusLabel,
    statusColorMap,
  };
}
