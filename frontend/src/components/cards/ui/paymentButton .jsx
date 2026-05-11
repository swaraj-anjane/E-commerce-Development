import { loadStripe } from "@stripe/stripe-js";
import { FaLock } from "react-icons/fa";
import axiosInstance from "../../../service/axiosInstance";

const stripePromise = loadStripe(
  "pk_test_51TU4F2FM0F5cHTY27a5DQaXA2tZfrnxmTae07K51XkuQZcCkG1uown7jNmKxz1mjHTB0Pq30o9aZfusktXyo6Z1t00npPIDPoZ",
);

function PaymenttButton({ cartItems, shippingAddress }) {
  const handleCheckout = async () => {
    try {
      const { data } = await axiosInstance.post(
        "/payment/create-checkout-session",
        {
          cartItems,
          shippingAddress,
        },
      );

      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-full bg-black text-white py-3.5 rounded-full font-semibold text-sm shadow-xl hover:opacity-90 transition flex items-center justify-center gap-2">
      <FaLock /> Pay now
    </button>
  );
}

export default PaymenttButton;
