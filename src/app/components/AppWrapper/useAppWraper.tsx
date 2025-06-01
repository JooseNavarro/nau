import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_ORDERS } from "@/app/lib/graphql/queries/getOrders";
import { UPDATE_ORDER_STATUS } from "@/app/lib/graphql/mutations/updateOrderStatus";
import { Order } from "@/app/lib/interfaces";

export function useAppWrapper() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [providerFilter, setProviderFilter] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data, loading, refetch } = useQuery(GET_ORDERS, {
    variables: { status: statusFilter, provider: providerFilter },
  });

  const [updateStatus] = useMutation(UPDATE_ORDER_STATUS, {
    onCompleted: () => refetch(),
  });

  return {
    updateStatus,
    data,
    loading,
    selectedOrder,
    setSelectedOrder,
    setProviderFilter,
    setStatusFilter,
  };
}
