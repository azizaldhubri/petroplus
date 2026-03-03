import { AppBar, Toolbar, Button } from "@mui/material";

export default function Topbar_home({
  onHeroClick,
  onAboutClick,
  onScreenshotsClick,
  onLoginClick
}) {
  return (
    <AppBar position="fixed" sx={{ background: "rgba(0,0,0,0.7)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <h5 style={{ cursor: "pointer" }} onClick={onHeroClick}>
          PetroPlus
        </h5>

        <div>
          <Button color="inherit" onClick={onAboutClick}>
            من نحن
          </Button>

          <Button color="inherit" onClick={onScreenshotsClick}>
            نماذج من النظام
          </Button>

          <Button
            variant="contained"
            onClick={onLoginClick}
            sx={{
              marginLeft: 2,
              background: "#f59e0b",
              "&:hover": { background: "#d97706" }
            }}
          >
            دخول
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}