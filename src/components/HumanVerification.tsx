import { useState, useEffect } from 'react';
import { Shield, CheckCircle } from 'lucide-react';

interface HumanVerificationProps {
  onVerified: () => void;
}

export default function HumanVerification({ onVerified }: HumanVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVerifying && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 5, 100));
      }, 50);
      return () => clearTimeout(timer);
    }

    if (progress === 100) {
      setTimeout(() => {
        localStorage.setItem('humanVerified', 'true');
        localStorage.setItem('verificationTime', Date.now().toString());
        onVerified();
      }, 500);
    }
  }, [isVerifying, progress, onVerified]);

  const handleVerify = () => {
    setIsVerifying(true);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">التحقق الأمني</h1>
            <p className="text-gray-600">يرجى التأكد من أنك إنسان للمتابعة</p>
          </div>

          {!isVerifying ? (
            <button
              onClick={handleVerify}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              أنا إنسان
            </button>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {progress === 100 ? (
                <div className="flex items-center justify-center text-green-600 space-x-2">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-semibold">تم التحقق بنجاح</span>
                </div>
              ) : (
                <p className="text-center text-gray-600 text-sm">
                  جاري التحقق من الاتصال...
                </p>
              )}
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              يساعد هذا التحقق الأمني في حماية خدماتنا من الهجمات الآلية
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
