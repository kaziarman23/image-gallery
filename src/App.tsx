import {
    DndContext,
    DragEndEvent,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import { imageGallery } from "./globalTypes";
import { initialImageData } from "./data"
import ImageCard from "./components/cards/ImageCard";
function App() {


    const [galleryData, setGalleryData] = useState(initialImageData)

    const [activeItem, setActiveItem] = useState<imageGallery | null>(null)


    const handleSelectImage = () => {
      
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
        useSensor(TouchSensor)
    );

    const handleDragStart = (event: DragStartEvent) => {
      const {id} = event.active
      if(!id) return

      // current item
      const currentItem = galleryData.find((item) => item.id === id)
      setActiveItem( currentItem || null)
    }
    const handleDragEnd = (event: DragEndEvent) => {
      setActiveItem(null)
      const {active, over} = event;
      if(!over){
        return;
      }
      if(active.id !== over.id){
        setGalleryData((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id)
          const newIndex = items.findIndex((item) => item.id === over.id)
          return arrayMove(items, oldIndex, newIndex)
        })
      }

    }

    return (
        <>
            <div className="min-h-screen">
                <div className="container flex flex-col items-center">
                    <div className="bg-white my-8 rounded-lg shadow max-w-5xl grid divide-y">
                        <header>Showcase</header>

                        {/* DnD context */}
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        >
                          <div
                          className="grid grid-cols-2 md:grid-cols-5 gap-8 p-8"
                          >
                          <SortableContext
                          items={galleryData}
                          strategy={rectSortingStrategy}>
                              {galleryData.map((imageItem) => (
                                <ImageCard
                                key={imageItem.id}
                                id={imageItem.id}
                                isSelected={imageItem.isSelected}
                                slug={imageItem.slug}
                                onClick={handleSelectImage}
                                />
                              ))}
                          </SortableContext>
                          </div>
                        </DndContext>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;

// packages:

//1. npm i @dnd-kit/core ===  a lightweight React library for building performant and accessible drag and drop experiences.

// 2. npm install react react-dom === You'll also need to be make sure you have peer dependencies installed. Chances are you already have react and react-dom installed in your project, but if not, make sure to install them:

// 3. npm install @dnd-kit/modifiers === Modifiers let you dynamically modify the movement coordinates that are detected by sensors

// 4. npm install @dnd-kit/sortable === If you plan on building a sortable interface, we highly recommend you try out @dnd-kit/sortable, which is a small layer built on top of @dnd-kit/core and optimized for building silky smooth, flexible, and accessible sortable interfaces.

// 5. npm install @dnd-kit/utilities === for have some utilities

// 6. npm install @types/react-transition-group === A set of components for managing component states over time, specifically designed with animation in mind.

// 7. npm i tailwind-merge === Utility function to efficiently merge Tailwind CSS classes in JS without style conflicts.

// 8. npm i nanoid === A tiny, secure, URL-friendly, unique string ID generator for JavaScript.
