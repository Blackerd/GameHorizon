import React from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';

const PaymentMethodsPage = () => {
    const paymentMethods = [
        {
            id: '1',
            type: 'credit',
            number: '**** **** **** 4242',
            expiry: '12/25',
            isDefault: true
        },
        {
            id: '2',
            type: 'momo',
            number: '0912****789',
            isDefault: false
        }
    ];

    return (
        <div className="bg-[#202020] rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Phương thức thanh toán</h2>
                <button className="flex items-center space-x-2 bg-[#0078F2] text-white px-4 py-2 rounded-lg hover:bg-[#0060c7] transition-colors">
                    <Plus size={20} />
                    <span>Thêm mới</span>
                </button>
            </div>

            <div className="space-y-4">
                {paymentMethods.map(method => (
                    <div
                        key={method.id}
                        className="flex items-center justify-between p-4 border border-[#303030] rounded-lg hover:border-[#0078F2] transition-colors"
                    >
                        <div className="flex items-center space-x-4">
                            <CreditCard size={24} className="text-[#0078F2]" />
                            <div>
                                <p className="text-white font-medium">{method.number}</p>
                                {method.expiry && (
                                    <p className="text-gray-400 text-sm">Hết hạn: {method.expiry}</p>
                                )}
                                {method.isDefault && (
                                    <span className="text-sm text-[#0078F2]">Mặc định</span>
                                )}
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentMethodsPage;