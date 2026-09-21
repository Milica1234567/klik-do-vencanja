type MonogramSealProps = {
  letters: string;
  className?: string;
};

function MonogramSeal({ letters, className }: MonogramSealProps) {
  return (
    <span className={className} aria-hidden="true">
      <span className="dbs-monogram__letters">{letters}</span>
    </span>
  );
}

export default MonogramSeal;
