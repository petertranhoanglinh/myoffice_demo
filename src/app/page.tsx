

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to My Website</h2>
        <p className="text-lg mb-6">We offer amazing services to help your business grow.</p>
        <a href="#services" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">Explore Services</a>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-lg text-gray-700">We are a team of dedicated professionals committed to delivering high-quality solutions.</p>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-200 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <div className="container mx-auto grid md:grid-cols-3 gap-6 px-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Web Development</h3>
            <p className="text-gray-600">We create beautiful and functional websites.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">SEO Optimization</h3>
            <p className="text-gray-600">Boost your website ranking with our SEO services.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Digital Marketing</h3>
            <p className="text-gray-600">Grow your brand with our marketing strategies.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-lg text-gray-700">Feel free to reach out to us for more information.</p>
        <a href="mailto:info@example.com" className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">Contact Us</a>
      </section>
    </div>
  );
}
