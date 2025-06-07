import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer 
      className="bg-gray-900 text-white py-8 px-4 mt-12"
      style={{
        backgroundColor: '#111827',
        color: 'white',
        padding: '2rem 1rem',
        marginTop: '3rem'
      }}
    >
      <div 
        className="max-w-7xl mx-auto"
        style={{ maxWidth: '80rem', margin: '0 auto' }}
      >
        {/* Footer Top Section */}
        <div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '2rem',
            marginBottom: '2rem'
          }}
        >
          {/* About Section */}
          <div>
            <h3 
              className="text-xl font-bold mb-4 text-yellow-400"
              style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#fbbf24' }}
            >
              SHOPCART
            </h3>
            <p 
              className="text-gray-300"
              style={{ color: '#D1D5DB' }}
            >
              Your one-stop destination for all your shopping needs. Quality products, amazing deals, and exceptional service.
            </p>
            <div 
              className="flex mt-4 space-x-4"
              style={{ display: 'flex', marginTop: '1rem', gap: '1rem' }}
            >
              <a href="#" style={{ color: '#D1D5DB', transition: 'color 0.3s' }}><FaFacebook size={20} /></a>
              <a href="#" style={{ color: '#D1D5DB', transition: 'color 0.3s' }}><FaTwitter size={20} /></a>
              <a href="#" style={{ color: '#D1D5DB', transition: 'color 0.3s' }}><FaInstagram size={20} /></a>
              <a href="#" style={{ color: '#D1D5DB', transition: 'color 0.3s' }}><FaLinkedin size={20} /></a>
              <a href="#" style={{ color: '#D1D5DB', transition: 'color 0.3s' }}><FaYoutube size={20} /></a>
            </div>
          </div>

          {/* Other sections with similar style additions... */}
        </div>

        {/* Footer Bottom Section */}
        <div 
          className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center"
          style={{
            borderTop: '1px solid #374151',
            paddingTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ color: '#9CA3AF', fontSize: '0.875rem', marginBottom: '1rem' }}>
            &copy; {new Date().getFullYear()} ShopCart. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Payment methods image */}
          </div>
          <div style={{ color: '#9CA3AF', fontSize: '0.875rem', marginTop: '1rem' }}>
            Created by <span style={{ color: '#fbbf24' }}>Dharunika Sasikumar</span> | Contact: <span style={{ color: '#fbbf24' }}>765432109</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;