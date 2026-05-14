import { useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Payment Successful");

    setTimeout(() => {
      navigate("/product");
    }, 2000);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center text-3xl font-bold">
      Payment Successful ✅
    </div>
  );
}
