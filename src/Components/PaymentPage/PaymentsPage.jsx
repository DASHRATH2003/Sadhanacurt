import React from 'react';
import './PaymentsPage.scss';

const payments = `
**Payments**

Sadhana Cart offers secure payment options for a safe shopping experience:

- UPI (Google Pay, PhonePe, etc.)
- Credit/Debit Cards (Visa, Mastercard, RuPay)
- Net Banking
- Cash on Delivery (available in select regions)

All online payments are processed using trusted payment gateways with end-to-end encryption.
`;

const PaymentsPage = () => {
  const formatText = (text) => {
    return text.split('\n\n').map((section, index) => {
      if (section.startsWith('**') && section.endsWith('**')) {
        return <h2 key={index}>{section.replace(/\*\*/g, '')}</h2>;
      } else if (section.includes('- ')) {
        const items = section
          .split('\n')
          .filter((line) => line.trim().startsWith('- '))
          .map((item, i) => <li key={i}>{item.replace('- ', '')}</li>);
        return <ul key={index}>{items}</ul>;
      } else {
        return <p key={index}>{section}</p>;
      }
    });
  };

  return (
    <div className="payments-page">
      {formatText(payments)}
    </div>
  );
};

export default PaymentsPage;
