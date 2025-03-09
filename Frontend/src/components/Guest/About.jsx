import React from 'react';
import Navbar from './Shared/Navbar';
import Footer from './Shared/Footer';

export default function About() {
  return (
    <div className="bg-[#f1f1f1]">
      <Navbar />

      <div className="w-full bg-[#f1f1f1]">
        <div className="my-10 max-w-7xl mx-auto rounded-md shadow-2xl bg-white sm:p-10 p-5">
          <p className="text-sm text-gray-600 mb-6">
            Jha Tutorials is your one-stop destination for all the latest updates on government and private sector jobs in India. Whether you're a fresher or an experienced professional, a 10th pass, 12th pass, graduate, or postgraduate, we've got you covered.
          </p>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer:</h2>
            <ul className="list-inside list-disc space-y-3 text-sm text-gray-600">
              <li><strong>Comprehensive Job Listings:</strong> Detailed information about the latest job openings, including exam dates, application deadlines, official notifications, salary details, age limits, exam patterns, and educational qualifications.</li>
              <li><strong>Focus on Teaching Jobs:</strong> Specialize in providing resources for popular teaching exams like KVS, NVS, DSSSB, EMRS, and more.</li>
              <li><strong>Previous Year Question Papers:</strong> Access a vast library of previous year question papers for various competitive exams, including teaching, railway, SSC, and banking exams.</li>
              <li><strong>Exam Preparation Resources:</strong> Stay ahead of the curve with our valuable exam preparation materials and guidance.</li>
              <li><strong>Education News and Updates:</strong> Stay informed about the latest happenings in the education world.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team:</h2>
            <ul className="list-inside list-disc space-y-3 text-sm text-gray-600">
              <li><strong>Founder:</strong> Mukesh Kumar Jha (Experienced Teacher)</li>
              <li><strong>Manager:</strong> Nishant Kumar</li>
              <li><strong>Developer:</strong> Om Kumar Jha</li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Stay Connected:</h2>
            <p className="text-sm text-gray-600 mb-4">To stay updated with the latest job opportunities and education news, follow and share Jha Tutorials!</p>
            <p className="my-2"><span className="text-sm">Official YT Channel</span> : <a href="https://youtube.com/@jhatutorials?feature=shared" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Jha Tutorials</a></p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us:</h2>
            <p className="text-sm text-gray-600">For any inquiries or assistance, please email us at <a href="mailto:inishantmishra07@gmail.com" className="text-blue-500 hover:underline">inishantmishra07@gmail.com</a></p>
          </div>

          <div className="mt-8 text-center text-sm font-medium text-gray-600">
            Jha Tutorials - Your Gateway to Success!
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}
