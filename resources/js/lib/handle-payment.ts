import { router } from "@inertiajs/react";

function handlPayment(snapToken: string) {
  window.snap.pay(snapToken, {
    onSuccess: function (result: any) {
      console.log("🚀  success ==>", result);
      router.post(
        "/update-via",
        {
          invoice: result.order_id,
          via: result.payment_type,
          transaction_time: result.transaction_time,
          transaction_status: result.transaction_status,
        },
        {
          onSuccess: () => {
            router.visit(route("transaksi.index"));
          },
          onError: () => {
            console.error("Error updating via");
          },
        }
      );
    },

    onPending: function (result: any) {
      console.log("🚀  pending ==>", result);
      router.post(
        "/update-via",
        {
          invoice: result.order_id,
          via: result.payment_type,
          transaction_status: result.transaction_status,
        },
        {
          onSuccess: () => {
            router.visit(route("transaksi.index"));
          },
        }
      );
    },

    onClose: function () {
      router.visit(route("transaksi.index"));
    },

    onError: function (result: any) {
      console.log("🚀  error ==>", result);
      console.log("error", result);
    },
  });
}

export default handlPayment;
