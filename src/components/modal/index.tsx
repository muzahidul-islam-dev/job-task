"use client"
import React, {ReactNode} from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { Category } from '@/type/Category';

interface ModalType {
    children: ReactNode,
    onSubmit: (data:Category) => void
}

const Modal: React.FC<ModalType> = ({onSubmit,children}) => {
    const {handleSubmit} = useForm<Category>()
    return (
        <Dialog>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTrigger asChild>
                    {children}
                    
                </DialogTrigger>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Add Category</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
};

export default Modal;