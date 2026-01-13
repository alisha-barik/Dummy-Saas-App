# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project

import { useEffect, useState } from "react";

export default function CarouselChatUI() {
  /* ---------- CAROUSEL ---------- */
  const images = [
    "https://picsum.photos/id/1018/1600/900",
    "https://picsum.photos/id/1025/1600/900",
    "https://picsum.photos/id/1035/1600/900",
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % images.length);

  const prevSlide = () =>
    setIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  // Auto slide
  useEffect(() => {
    const id = setInterval(nextSlide, 4000);
    return () => clearInterval(id);
  }, []);

  /* ---------- MENU ---------- */
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  return (
    <div style={styles.page}>
      {/* BACKGROUND CAROUSEL */}
      <div
        style={{
          ...styles.carousel,
          backgroundImage: `url(${images[index]})`,
        }}
      />

      {/* DARK OVERLAY */}
      <div style={styles.overlay} />

      {/* CAROUSEL CONTROLS */}
      <button style={{ ...styles.arrow, left: "20px" }} onClick={prevSlide}>
        ‹
      </button>
      <button style={{ ...styles.arrow, right: "20px" }} onClick={nextSlide}>
        ›
      </button>

      {/* FLOATING INPUT */}
      <div style={styles.container}>
        <div style={styles.inputWrapper}>
          <input
            placeholder="Message ChatGPT..."
            style={styles.input}
          />

          <button
            style={styles.plus}
            onClick={() => setMenuOpen((p) => !p)}
          >
            +
          </button>
        </div>

        {/* MENU */}
        {menuOpen && (
          <div style={styles.menu}>
            {["Attach", "Actions", "Settings"].map((item) => (
              <div
                key={item}
                style={styles.menuItem}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
              >
                {item}

                {/* SUB MENU */}
                {hovered === item && (
                  <div style={styles.subMenu}>
                    <div style={styles.subItem}>{item} Option 1</div>
                    <div style={styles.subItem}>{item} Option 2</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    position: "relative",
    overflow: "hidden",
  },

  carousel: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "background-image 0.8s ease-in-out",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
  },

  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 5,
    background: "rgba(255,255,255,0.7)",
    border: "none",
    borderRadius: "50%",
    width: "44px",
    height: "44px",
    fontSize: "26px",
    cursor: "pointer",
  },

  container: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "620px",
    padding: "0 16px",
    zIndex: 10,
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: "14px",
    padding: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "16px",
  },

  plus: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "none",
    background: "#e5e7eb",
    fontSize: "20px",
    cursor: "pointer",
  },

  menu: {
    marginTop: "8px",
    background: "#fff",
    borderRadius: "10px",
    overflow: "visible",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
  },

  menuItem: {
    position: "relative",
    padding: "10px 14px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  subMenu: {
    position: "absolute",
    top: 0,
    left: "100%",
    marginLeft: "6px",
    background: "#fff",
    borderRadius: "8px",
    minWidth: "160px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
  },

  subItem: {
    padding: "8px 12px",
    cursor: "pointer",

    
  },
};
.
