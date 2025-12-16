"use client"
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TCategory } from "@/type/Category";
import { ArrowRight, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";



export default function Home() {
  const [categories, setCategories] = useState<TCategory[]>([
    { id: 1, name: 'Category 1', parentId: null },
    { id: 2, name: 'Category 2', parentId: 1 },
    { id: 3, name: 'Category 3', parentId: 2 },
    { id: 4, name: 'Category 4', parentId: 3 },
    { id: 4, name: 'Category 5', parentId: null },
  ]);



  const [isOpenModal, setIsOpenModal] = useState(false)

  const treeData = (parentId: number | null = null) => {
    return categories.filter(category => category.parentId === parentId).map((categoryItem, index) => (
        <li key={index} className="font-semibold cursor-pointer"><div className="flex rounded hover:bg-gray-50 py-2 items-center justify-between"><div className="flex items-center"><ChevronRight height={15} /> {categoryItem?.name}</div> <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} categories={categories} setCategories={setCategories} parentId={1}><Plus height={15} /></Modal></div>
          <ul className="ml-6">
            {treeData(categoryItem?.id)}
          </ul>
        </li>
    ));
  }

  // console.log(treeData(), 'category data')



  return (
    <div className="max-w-6xl my-20 mx-auto">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardAction>
              <Modal parentId={null} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} categories={categories} setCategories={setCategories} >
                <Button className="cursor-pointer">Add Category</Button>
              </Modal>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ul>
              {treeData()}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
