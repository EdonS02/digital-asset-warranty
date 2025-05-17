import React, { useState } from 'react';
import { CreateAssetDto, Asset } from '../types/asset';

interface AssetFormProps {
    onSubmit: (data: CreateAssetDto) => Promise<void>;
    initialData?: Asset;
    buttonText?: string;
}

export const AssetForm: React.FC<AssetFormProps> = ({
    onSubmit,
    initialData,
    buttonText = 'Submit'
}) => {
    const [formData, setFormData] = useState<CreateAssetDto>({
        name: initialData?.name || '',
        category: initialData?.category || '',
        purchaseDate: initialData?.purchaseDate?.split('T')[0] || '',
        value: initialData?.value || 0,
        description: initialData?.description || ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'value' ? parseFloat(value) : value
        }));
    };

    const inputClasses = "mt-1 block w-full px-4 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm transition duration-150 ease-in-out";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-start py-6 sm:py-12">
            <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className={labelClasses}>
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter asset name"
                                            className={inputClasses}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="category" className={labelClasses}>
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            className={inputClasses}
                                        >
                                            <option value="">Select a category</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Watches">Watches</option>
                                            <option value="Furniture">Furniture</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="purchaseDate" className={labelClasses}>
                                            Purchase Date
                                        </label>
                                        <input
                                            type="date"
                                            id="purchaseDate"
                                            name="purchaseDate"
                                            value={formData.purchaseDate}
                                            onChange={handleChange}
                                            required
                                            className={inputClasses}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="value" className={labelClasses}>
                                            Value
                                        </label>
                                        <input
                                            type="number"
                                            id="value"
                                            name="value"
                                            value={formData.value}
                                            onChange={handleChange}
                                            required
                                            min="0"
                                            step="0.01"
                                            placeholder="Enter asset value"
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="description" className={labelClasses}>
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Enter asset description"
                                        className={inputClasses + " resize-none"}
                                    />
                                </div>

                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        className="w-[200px] mx-auto block px-4 py-2.5 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                                    >
                                        {buttonText}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 