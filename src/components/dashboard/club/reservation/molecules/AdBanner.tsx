const AdBanner = () => {
  return <div className="flex-1 h-[200px] rounded-xl bg-gray-100 shadow"></div>;
};

export default function AdBanners() {
  return (
    <div className="flex gap-3">
      <AdBanner />
      <AdBanner />
    </div>
  );
}
