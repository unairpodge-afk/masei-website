import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Majelis Sarjana Ekonomi Islam - MASEI.id",
  description: "Majelis Sarjana Ekonomi Islam (MASEI) adalah wadah para sarjana ekonomi Islam di Indonesia untuk melakukan pengkajian, riset, pengembangan, pendidikan dan sosialisasi Ekonomi Islam.",
  keywords: "MASEI, Majelis Sarjana Ekonomi Islam, Ekonomi Islam, Keuangan Syariah, Indonesia",
  authors: [{ name: "DPP MASEI" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <div className="layout-wrapper">
          <Header />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
