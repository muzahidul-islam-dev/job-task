"use client"
import React, { ReactNode } from 'react';
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
import { TCategory } from '@/type/Category';

interface ModalType {
    children: ReactNode;
    parentId: number | null;
    setIsOpenModal: (openModalData: boolean) => void
    isOpenModal?: boolean;
    categories: TCategory[];
    setCategories: (data: TCategory[]) => void;
}

const Modal: React.FC<ModalType> = ({ parentId, setIsOpenModal, isOpenModal, categories, setCategories, children }) => {
    const { handleSubmit, register, formState: { errors } } = useForm<TCategory>()

    const onSubmit = (data: TCategory) => {
        const categoryData: TCategory = {
            id: categories?.length,
            name: data?.name,
            parentId: data?.parentId || null
        }
        setCategories([...categories, categoryData])
        setIsOpenModal(false)
    }
    return (
        <Dialog onOpenChange={setIsOpenModal} open={isOpenModal}>
            <DialogTrigger asChild>
                {children}

            </DialogTrigger>
            <DialogContent className="sm:max-w-106.25">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Add Category</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Input type='text' className='mt-5' id="name-1" {...register('name', {
                                required: true
                            })} placeholder='Category Name' />
                            {errors?.name && <Label className='text-red-500'>Name field is required</Label>}
                            {parentId && <Input type='hidden' {...register('parentId')} defaultValue={parentId} />}
                        </div>
                    </div>
                    <DialogFooter className='mt-5'>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
};

export default Modal;