type ProgramLabelProps = {
  text: string;
};

export default function ProgramLabel({ text }: ProgramLabelProps) {
  return (
    <span lang="fr" className="min-w-0 whitespace-normal hyphens-auto [overflow-wrap:anywhere]" title={text}>
      {text}
    </span>
  );
}
