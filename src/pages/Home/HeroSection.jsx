 import { Button } from "@mui/material";

export default function HeroSection({ onLoginClick }) {
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
        نظام إدارة محطة الوقود
      </h1>

      <p style={{ maxWidth: "600px", marginTop: "20px", opacity: 0.8 }}>
        سجل العملاء، امنحهم نقاط مكافآت، وطور محطتك بذكاء
      </p>

      <Button
        variant="contained"
        size="large"
        onClick={onLoginClick}
        sx={{
          marginTop: 4,
          background: "#f59e0b",
          fontWeight: "bold",
          "&:hover": { background: "#d97706" }
        }}
      >
        تسجيل الدخول
      </Button>
    </div>
  );
}
