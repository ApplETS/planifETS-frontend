'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type DndContextProps = {
  children: React.ReactNode;
};

export default function DndContext({ children }: DndContextProps) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}
