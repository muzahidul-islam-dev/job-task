import { Dispatch, SetStateAction } from "react"
import { TCategory } from "@/type/Category"
import TreeNode from "../TreeNode"

interface TreeDataType {
  categories: TCategory[]
  setCategories: Dispatch<SetStateAction<TCategory[]>>
}

const TreeData: React.FC<TreeDataType> = ({
  categories,
  setCategories,
}) => {
  return (
    <ul>
      {categories
        .filter(singleCategory => singleCategory.parentId === null)
        .map(categoryItem => <TreeNode key={categoryItem.id} category={categoryItem} categories={categories} setCategories={setCategories} />)}
    </ul>
  )
}
export default TreeData