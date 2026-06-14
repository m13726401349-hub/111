import "./globals.css";

export const metadata = {
  title: "PA66 工程塑料与改性材料 | RUIYUAN 瑞元",
  description: "东莞市瑞元工程塑料有限公司 PA66 工程塑料、阻燃与增强材料方案。"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
