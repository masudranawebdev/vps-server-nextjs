"use client";

import CategoryViewSpinner from "@/components/common/loader/CategoryViewSpinner";
import { AuthContext } from "@/context/context";
import { isLoggedin } from "@/services/auth.services";
import { redirect, usePathname } from "next/navigation";
import { useContext } from "react";

const withAuth = (HOC) => {
  return function WithAuthInner() {
    const { loading } = useContext(AuthContext);
    const isLogged = isLoggedin();
    const pathname = usePathname();
    if (loading) {
      return <CategoryViewSpinner />;
    }

    if (!isLogged) {
      redirect("/signin?success_redirect=" + pathname);
      return null;
    }
    return <HOC />;
  };
};

export default withAuth;
