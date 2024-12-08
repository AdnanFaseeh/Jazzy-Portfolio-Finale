'use client';
import React from 'react';

type ProjectProps = {
  index: number;
  title: string;
  manageModal: (isOpen: boolean, index: number, clientX: number, clientY: number) => void;
};

export default function Index({ index, title, manageModal }: ProjectProps) {
  return (
    <div
      onMouseEnter={(e) => { manageModal(true, index, e.clientX, e.clientY); }}
      onMouseLeave={(e) => { manageModal(false, index, e.clientX, e.clientY); }}
      className="flex w-full justify-between items-center px-2 py-12 border-t border-gray-300 cursor-pointer transition-all duration-200 hover:opacity-50"
    >
      <h2 className="text-5xl font-normal transition-all duration-400 text-transparent bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text hover:translate-x-[-10px]">
        {title}
      </h2>
      <p className="font-light transition-all duration-400 hover:translate-x-[10px]">
        Animation & Work
      </p>
    </div>
  );
}
