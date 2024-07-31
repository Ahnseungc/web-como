interface Props {
  title?: string;
}

export default function ComingSoon({ title }: Props) {
  return (
    <div className="space-y-2 p-8 rounded-2xl bg-gray-0">
      {title && <h2 className="h1 font-bold text-brand-orange">{title}</h2>}
      <p className="h4 font-medium text-gray-900">
        {"곧 해당기능이 오픈됩니다. 조금만 기다려주세요."}
      </p>
    </div>
  );
}
