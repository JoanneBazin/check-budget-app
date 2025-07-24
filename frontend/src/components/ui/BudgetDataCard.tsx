import "@/styles/components/ui/BudgetDataCard.scss";
export const BudgetDataCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <article className="data-card">
      <div className="data-card-title">
        <p>{title}</p>
      </div>
      <div className="data-card-content">{children}</div>
    </article>
  );
};
