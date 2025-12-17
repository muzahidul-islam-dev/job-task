"use client"
import { TCategory } from "@/type/Category"
import { useState } from "react"
import Modal from "../modal"
import { Button } from "../ui/button"
import { ArrowBigLeftIcon, ChevronRight, Plus } from "lucide-react"

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
                .filter(n => n.parentId === parentId)
                .flatMap(n => [n.id, ...getAllChildren(n.id)])

        const ids = [id, ...getAllChildren(id)]
        setCategories(prev => prev.filter(n => !ids.includes(n.id)))
    }

    return (
        <li className="ml-4">
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-between">
                    <div>
                        {hasChildren.length > 0 && (
                            <button onClick={() => setOpen(!open)} className="cursor-pointer">
                                <ChevronRight height={15} />
                            </button>
                        )}

                        <span>{category.name}</span>
                    </div>
                    <div>
                        <Modal parentId={category.id} setCategories={setCategories}>
                            <Button><Plus /></Button>
                        </Modal>
                    </div>
                </div>



                <button
                    onClick={() => {
                        if (confirm("Delete this node and all children?")) {
                            deleteNode(category.id)
                        }
                    }}
                >
                    ⋮ Delete
                </button>
            </div>

            {open && hasChildren.length > 0 && (
                <ul>
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