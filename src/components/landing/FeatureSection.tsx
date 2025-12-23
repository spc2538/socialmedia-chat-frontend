type FeatureSectionProps = {
  subtitle: string;
  title: string;
  text: string;
  image: string;
};

function FeatureSection({
  subtitle,
  title,
  text,
  image,
}: FeatureSectionProps) {
  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-600 uppercase mb-2">
              {subtitle}
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {text}
            </p>
          </div>

          <div className="flex-1">
            <img
              src={image}
              alt={title}
              className="w-full rounded-xl shadow-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
