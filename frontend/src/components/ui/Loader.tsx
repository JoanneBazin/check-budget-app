export const Loader = ({ type }: { type: "layout" | "datalist" }) => {
  return <span className={`loader__${type}`}></span>;
};
