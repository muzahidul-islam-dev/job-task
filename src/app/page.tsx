"use client"
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";

interface Category {
  id: number,
  name: string,
  parentId: number | null;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Category 1', parentId: null },
    { id: 2, name: 'Category 2', parentId: 1 },
    { id: 3, name: 'Category 3', parentId: 2 },
    { id: 4, name: 'Category 4', parentId: 3 },
    { id: 4, name: 'Category 5', parentId: null },
  ]);
  const handleSubmit = () => {}



  return (
    <div className="max-w-6xl my-20 mx-auto">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>
              <Modal handleSubmit={handleSubmit}>
                <Button className="cursor-pointer">Add Category</Button>
              </Modal>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
