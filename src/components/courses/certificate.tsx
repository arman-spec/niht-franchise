import Image from 'next/image';
import React from 'react';
import deskCertificate from '@/assets/certificate/certifications1.webp';
import MobCertificate from '@/assets/certificate/certifications1.webp';


export const CertificationSection: React.FC = () => {
  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Decorative Background Shapes */}
      <div className="absolute -left-32 -top-32 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl pointer-events-none"></div>
      <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-pink-100 rounded-full opacity-30 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl text-blue-600 md:text-4xl font-bold  mb-2 md:mb-6">
            Get Hired with Globally Recognised Certification
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our certifications are recognized worldwide and help you boost your career in digital marketing.
          </p>
        </div>

        {/* Certificate Images */}
        <div className="flex justify-center">
          {/* Desktop Image */}
          <div className="hidden md:block w-full max-w-6xl rounded-xl  overflow-hidden transform transition-transform duration-500 hover:scale-105 ">
            <Image
              src={deskCertificate}
              alt="Globally Recognised Certifications provided by NIHT digital marketing"
              width={1600}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Mobile Image */}
          <div className="block md:hidden w-full max-w-md rounded-xl  overflow-hidden transform transition-transform duration-500 hover:scale-105">
            <Image
              src={MobCertificate}
              alt="Globally Recognised Certifications provided by NIHT digital marketing"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
