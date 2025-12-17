import React, { Dispatch, SetStateAction } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { TCategory } from "@/type/Category";
import { useForm } from "react-hook-form";


interface ModalType {
    parentId: number | string | null;
    setCategories: Dispatch<SetStateAction<TCategory[]>>,
    children: React.ReactNode
}
const Modal: React.FC<ModalType> = ({parentId,setCategories,children}) => {
  const [open, setOpen] = React.useState(false)

  const { handleSubmit, register, reset, formState: { errors } } =
    useForm<TCategory>()

  const onSubmit = (data: TCategory) => {
    setCategories(prevData => [...prevData, {
        id: prevData.length + 1,
        name: data?.name,
        parentId: parentId
    }]);
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>

          <Input
            {...register("name", { required: true })}
            placeholder="Category Name"
          />
          {errors.name && (
            <p className="text-red-500">Name is required</p>
          )}

          <DialogFooter className="mt-4">
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Modal;