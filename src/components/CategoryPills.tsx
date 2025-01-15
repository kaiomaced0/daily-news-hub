import React from "react";

interface CategoryPillsProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  selectedCategory?: string;
}

const CategoryPills = ({ categories, onSelectCategory, selectedCategory }: CategoryPillsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center my-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`category-pill ${
            selectedCategory === category ? "ring-2 ring-ring" : ""
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryPills;