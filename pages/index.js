import { useRouter } from "next/router";
import { useEffect } from "react";
import useTokenStore from "../store/token";
import useAdminStore from "../store/isAdmin";
import AdminIndex from "./admin";
import UserIndex from "./user";

export default function Home() {
  const router = useRouter();

  const isAdmin = useAdminStore((state) => state.isAdmin);
  const isLogin = useTokenStore((state) => state.token);
  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin]);
  return <>{isAdmin ? <AdminIndex /> : <UserIndex />}</>;
}
