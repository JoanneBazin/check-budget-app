import "@/styles/components/ui/BudgetDataCard.scss";
export const BudgetDataCard = ({
  title,
  children,
  color = "white",
}: {
  title: string;
  children: React.ReactNode;
  color?: string;
}) => {
  return (
    <article className="data-card">
      <div className={`data-card-title ${color}`}>
        <p>{title}</p>
      </div>
      <div className="data-card-content">{children}</div>
    </article>
  );
};
