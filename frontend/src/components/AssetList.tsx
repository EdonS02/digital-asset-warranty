import React, { useState } from 'react';
import { Asset, WarrantyQuote } from '../types/asset';
import { ConfirmationModal } from './ConfirmationModal';

interface AssetListProps {
    assets: Asset[];
    onDelete: (id: string) => Promise<void>;
    onRequestQuote: (id: string) => Promise<void>;
}

export const AssetList: React.FC<AssetListProps> = ({
    assets,
    onDelete,
    onRequestQuote
}) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    };

    const getLatestQuote = (quotes: WarrantyQuote[] | undefined) => {
        if (!quotes || quotes.length === 0) return null;
        return quotes.reduce((latest, current) => {
            return new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest;
        });
    };

    const handleDeleteClick = (id: string) => {
        setSelectedAssetId(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedAssetId) {
            await onDelete(selectedAssetId);
            setDeleteModalOpen(false);
            setSelectedAssetId(null);
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Purchase Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Latest Quote
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {assets.map((asset) => {
                            const latestQuote = getLatestQuote(asset.warrantyQuotes);
                            return (
                                <tr key={asset.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                                        {asset.description && (
                                            <div className="text-sm text-gray-500">{asset.description}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {asset.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(asset.purchaseDate)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatCurrency(asset.value)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {latestQuote ? (
                                            <div>
                                                <div>{formatCurrency(latestQuote.quoteAmount)}</div>
                                                <div className="text-xs text-gray-400">
                                                    Valid until: {formatDate(latestQuote.validUntil)}
                                                </div>
                                            </div>
                                        ) : (
                                            'No quote'
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => onRequestQuote(asset.id)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            Request Quote
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(asset.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Asset"
                message="Are you sure you want to delete this asset? This action cannot be undone."
            />
        </>
    );
}; 