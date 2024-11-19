import DashboardHeader from "./(block)/header";

export default function DashboardLayout({ children }) {
  return (
    <main>
      <DashboardHeader />
      <div className="mt-32">{children}</div>
    </main>
  );
}
