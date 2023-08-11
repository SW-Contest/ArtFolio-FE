import { twMerge } from "tailwind-merge";

interface ArtPieceLabelProps {
  index: number;
  children?: React.ReactNode;
}

const ArtPieceLabel = (props: ArtPieceLabelProps) => {
  const colors = [
    "btn-info",
    "btn-success",
    "btn-warning",
    "btn-error",
    "btn-primary",
    "btn-accent",
  ];
  return (
    <div className={twMerge("btn", colors[props.index % colors.length])}>
      {props.children}
    </div>
  );
};

export default ArtPieceLabel;
