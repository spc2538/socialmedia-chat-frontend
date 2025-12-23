function Hero() {
  return (
    <section
      className="
        relative text-center
        pt-32 pb-34 px-6
        bg-[url('/background.png')]
        bg-cover bg-center
      "
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Social media chat frontend project
        </h2>
        <p className="text-gray-200 mb-8">
          Socket IO Chat Platform.
        </p>
        <button className="bg-blue-600 px-6 py-3 rounded-lg">
          Get Started
        </button>
      </div>
    </section>
  );
}


export default Hero;
