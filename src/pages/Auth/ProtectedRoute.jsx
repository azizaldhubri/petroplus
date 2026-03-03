import React, { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookie from "cookie-universal";
import LoadingSubmit from "../../Component/Loading/Loading";
import Error403 from "./403";
import { UserContext } from "../../Component/Context/UserProvider";

const ProtectedRoute = ({ permission }) => {
  const cookie = Cookie();
  const token = cookie.get("vehicle");

  const { permissions } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (!permissions || permissions.length === 0) {
      return;
    }

    const allowed = permissions.some(
      (item) =>
        item.page?.name === permission &&
        item.can_view === 1
    );

    setHasPermission(allowed);
    setLoading(false);
  }, [permissions, permission]);

  // ❌ لا يوجد توكن
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ⏳ تحميل الصلاحيات
  if (loading) {
    return <LoadingSubmit />;
  }

  // 🚫 لا يملك صلاحية
  if (!hasPermission) {
    return <Error403 />;
  }

  // ✅ مسموح
  return <Outlet />;
};

export default ProtectedRoute;
