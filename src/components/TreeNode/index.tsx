"use client"
import { TCategory } from "@/type/Category"
import { useState } from "react"
import Modal from "../modal"
import { ChevronDown, ChevronRight, Ellipsis } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"

interface Props {
    category: TCategory
    categories: TCategory[]
    setCategories: React.Dispatch<React.SetStateAction<TCategory[]>>
}

export default function TreeNode({ category, categories, setCategories }: Props) {
    const [open, setOpen] = useState(true)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <div className="flex items-center justify-between">
                <div>
                    {hasChildren.length > 0 && (
                        <button onClick={() => setOpen(!open)} className="cursor-pointer">
                            {open ? <ChevronDown height={15} /> : <ChevronRight height={15} />}
                        </button>
                    )}

                    <span>{category.name}</span>
                </div>
                <div className="space-x-2 space-y-1">
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}><Ellipsis height={15} /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40" align="end">
                            <DropdownMenuGroup className="bg-gray-50 border border-gray-100 rounded-lg my-1">
                                <DropdownMenuItem asChild>
                                    <Modal parentId={category.id} setCategories={setCategories}>
                                        <button type="button" className="cursor-pointer px-3 py-2 hover:bg-gray-200 text-left w-full">Add Category</button>
                                    </Modal>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer px-3 py-2 hover:bg-red-500 hover:text-white text-left w-full" onClick={() => {
                                    if (confirm("Are you sure deleted this category?")) {
                                        deleteNode(category.id)
                                    }
                                }}>Delete Category</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>


                </div>
            </div>

            {
                open && hasChildren.length > 0 && (
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
                )
            }
        </li >
    )
}