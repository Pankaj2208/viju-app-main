'use client';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Footer from '../../components/footer';
import Sidebar from '../../components/sidebar';
import * as utility from '../../libraries/utility';

const faqData = [
  {
    question: 'How can I upload course materials?',
    answer:
      "To upload course materials, go to the 'Upload Content' section on the dashboard and follow the instructions provided.",
  },
  {
    question: 'Can I schedule live classes for my students?',
    answer:
      "Yes, you can schedule live classes by navigating to the 'Live Classes' section and selecting the appropriate options.",
  },
  {
    question: 'What file types are supported for uploads?',
    answer:
      'You can upload files with extensions .pdf, .doc, .docx, .jpg for course materials and quizzes/tests.',
  },
  {
    question: 'How to view statistics for my students?',
    answer:
      "Visit the 'Statistics' page and choose the specific board and grade to view detailed statistics for your students.",
  },
];

const FaqPage = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleQuestionClick = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };
  useEffect(() => {
    utility.hideloading();
  });
  return (
    <div
      className="container mt-5 text-center"
      style={{ background: '#f4f4f4', padding: '30px', borderRadius: '10px' }}
    >
      <Sidebar />
      <img
        src="https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/08406e7cb97a514fad59e70f/Untitled-1.png"
        alt="Teacher FAQ"
        className="img-fluid"
        style={{
          width: '80%',
          maxWidth: '400px',
          height: 'auto',
          marginBottom: '20px',
          display: 'block',
          margin: '0 auto',
        }}
      />
      {faqData.map((faq, index) => (
        <div
          key={index}
          className={`card mb-3 ${activeQuestion === index ? 'bg-light' : ''}`}
          onClick={() => handleQuestionClick(index)}
          style={{
            cursor: 'pointer',
            border: '1px solid #ddd',
            borderRadius: '8px',
            width: '80%',
            margin: '0 auto',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            className="card-body d-flex align-items-center justify-content-between"
            style={{ padding: '20px' }}
          >
            <h3
              className="card-title mb-0 ml-3"
              style={{ margin: '0', fontSize: '18px', flex: '1' }}
            >
              {faq.question}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {activeQuestion === index ? (
                <FaMinus style={{ fontSize: '20px', cursor: 'pointer' }} />
              ) : (
                <FaPlus style={{ fontSize: '20px', cursor: 'pointer' }} />
              )}
            </div>
          </div>
          {activeQuestion === index && (
            <div
              className="card-body"
              style={{ padding: '20px', backgroundColor: '#fff8e1' }}
            >
              <p className="card-text">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default FaqPage;

export async function getStaticProps() {
  return {
    props: { module: 'STUDENTHOME', onlyAdminAccess: false },
  };
}
