type LineArtProps = {
  src: string;
  className?: string;
};

function LineArt({ src, className }: LineArtProps) {
  return (
    <img
      src={src}
      alt=""
      className={["inv6-qb-art", className].filter(Boolean).join(" ")}
      draggable={false}
    />
  );
}

export default LineArt;
