import { useRouter } from "next/router";
import React from "react";

const Unauthorized = () => {
  const router = useRouter();
  const { message } = router.query;
  return (
    <div>
      <h1 className="text-xl text-center">Access Denied</h1>
      {message && <div className="mb-4 text-center text-red-500">{message}</div>}
    </div>
  );
};

export default Unauthorized;
