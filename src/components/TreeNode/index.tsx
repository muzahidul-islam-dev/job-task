"use client"
import { TCategory } from "@/type/Category"
import { useState } from "react"
import Modal from "../modal"
import { Button } from "../ui/button"
import { ChevronRight, Plus, Trash } from "lucide-react"

interface Props {
    category: TCategory
    categories: TCategory[]
    setCategories: React.Dispatch<React.SetStateAction<TCategory[]>>
}

export default function TreeNode({ category, categories, setCategories }: Props) {
    const [open, setOpen] = useState(true)

    const hasChildren = categories.filter(categoryData => categoryData.parentId === category.id)

    const deleteNode = (id: number) => {
        const getAllChildren = (parentId: number): number[] =>
            categories
                .filter(singleCategory => singleCategory.parentId === parentId)
                .flatMap(singleCategory => [singleCategory.id, ...getAllChildren(singleCategory.id)])

        const ids = [id, ...getAllChildren(id)]
        setCategories(prev => prev.filter(n => !ids.includes(n.id)))
    }

    return (
        <li className="ml-4">
            {/* <div className="flex items-center gap-2"> */}
                <div className="flex items-center justify-between">
                    <div>
                        {hasChildren.length > 0 && (
                            <button onClick={() => setOpen(!open)} className="cursor-pointer">
                                <ChevronRight height={15} />
                            </button>
                        )}

                        <span>{category.name}</span>
                    </div>
                    <div className="space-x-2 space-y-1">
                        <Modal parentId={category.id} setCategories={setCategories}>
                            <button className="p-2 bg-blue-500 cursor-pointer rounded text-white"><Plus height={15} /></button>
                        </Modal>
                        <button
                            onClick={() => {
                                if (confirm("Are you sure deleted this category?")) {
                                    deleteNode(category.id)
                                }
                            }}
                            className="p-2 bg-red-500 cursor-pointer rounded"
                        >
                            <Trash height={15} className="text-white" />
                        </button>
                    </div>
                </div>
            {/* </div> */}

            {open && hasChildren.length > 0 && (
                <ul className="ml-4">
                    {hasChildren.map(child => (
                        <TreeNode
                            key={child.id}
                            category={child}
                            categories={categories}
                            setCategories={setCategories}
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}