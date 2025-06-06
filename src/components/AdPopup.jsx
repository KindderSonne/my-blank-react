import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './AdPopup.css';

const AdPopup = ({ onClose }) => {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  const handleClose = () => {
    if (doNotShowAgain) {
      // Set cookie to expire in 30 days
      Cookies.set('hideAdPopup', 'true', { expires: 30 });
    }
    onClose();
  };

  return (
    <div className="ad-popup-overlay">
      <div className="ad-popup">
        <button className="ad-popup-close" onClick={handleClose}>×</button>
        
        <div className="ad-popup-content">
          <div className="ad-popup-header">
            <h2>Ưu đãi đặc biệt!</h2>
          </div>
          
          <div className="ad-popup-body">
            <div className="ad-image">
              <img src="https://via.placeholder.com/400x200?text=Special+Offer" alt="Ưu đãi đặc biệt" />
            </div>
            
            <div className="ad-description">
              <h3>Nâng cấp lên phiên bản Pro ngay hôm nay!</h3>
              <p>Với phiên bản Pro, bạn sẽ nhận được:</p>
              <ul>
                <li>Không giới hạn số lượng task</li>
                <li>Báo cáo phân tích nâng cao</li>
                <li>Tích hợp với nhiều công cụ khác</li>
                <li>Hỗ trợ kỹ thuật ưu tiên 24/7</li>
              </ul>
              
              <div className="ad-pricing">
                <div className="price">
                  <span className="old-price">1.200.000đ</span>
                  <span className="new-price">799.000đ</span>
                  <span className="per-month">/tháng</span>
                </div>
                <span className="discount-tag">Giảm 30%</span>
              </div>
            </div>
          </div>
          
          <div className="ad-popup-actions">
            <button className="ad-cta-button">Nâng cấp ngay</button>
            <div className="ad-popup-checkbox">
              <input 
                type="checkbox" 
                id="doNotShowAgain" 
                checked={doNotShowAgain} 
                onChange={(e) => setDoNotShowAgain(e.target.checked)} 
              />
              <label htmlFor="doNotShowAgain">Không hiển thị lại</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPopup; 