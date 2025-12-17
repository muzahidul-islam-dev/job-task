import { TCategory } from '@/type/Category';
import React, { Dispatch, SetStateAction } from 'react';
import Modal from '../modal';
import { ChevronRight, Plus } from 'lucide-react';
interface TreeDataType {
    categories: TCategory[];
    parentId: string | null | number;
    setCategories: Dispatch<SetStateAction<TCategory[]>>;
}
const TreeData: React.FC<TreeDataType> = ({ categories, parentId, setCategories }) => {
    return (
        <div>
            <ul>
                {
                    categories.filter((category: TCategory) => category.parentId === parentId).map((categoryItem: TCategory) => {
                        const hasChildren = categories.some((singleCategory: TCategory) => singleCategory?.parentId === categoryItem.id);
                        return (
                            <li key={categoryItem.id} className="font-semibold cursor-pointer">
                                <div className="flex rounded hover:bg-gray-50 py-2 items-center justify-between">
                                    <div className="flex items-center">{hasChildren && <ChevronRight height={15} />} {categoryItem?.name}</div>
                                    <Modal categories={categories} setCategories={setCategories} parentId={categoryItem?.id}>
                                        <Plus height={15} />
                                    </Modal>
                                </div>
                                {
                                    hasChildren && (<ul className="ml-6">
                                        <TreeData categories={categories} parentId={categoryItem.id} setCategories={setCategories} />
                                    </ul>)
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};

export default TreeData;