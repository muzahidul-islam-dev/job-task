"use client"
import Modal from "@/components/modal";
import TreeData from "@/components/TreeData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TCategory } from "@/type/Category";
import { useState } from "react";



export default function Home() {
  const [categories, setCategories] = useState<TCategory[]>([
    { id: 1, name: 'Category 1', parentId: null },
    { id: 2, name: 'Category 2', parentId: 1 },
    { id: 3, name: 'Category 3', parentId: 2 },
    { id: 4, name: 'Category 4', parentId: 3 },
    { id: 5, name: 'Category 5', parentId: null },
  ]);



  const [isOpenModal, setIsOpenModal] = useState(false)

  console.log(categories)
  // console.log(treeData(), 'category data')



  return (
    <div className="max-w-6xl my-20 mx-auto">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardAction>
              <Modal parentId={null} categories={categories} setCategories={setCategories} >
                <Button className="cursor-pointer">Add Category</Button>
              </Modal>
            </CardAction>
          </CardHeader>
          <CardContent>
            <TreeData categories={categories} parentId={null} setCategories={setCategories} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
