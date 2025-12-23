function Features() {
  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">
          Features
        </h3>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {["Fast", "Responsive", "Modern"].map((title) => (
            <div
              key={title}
              className="p-6 border rounded-xl hover:shadow-lg transition"
            >
              <h4 className="text-xl font-semibold mb-2">{title}</h4>
              <p className="text-gray-600">
                Tailwind helps you build clean and scalable UI components.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;