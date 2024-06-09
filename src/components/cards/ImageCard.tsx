import { useSortable } from "@dnd-kit/sortable";
import { imageGallery } from "../../globalTypes";

interface ImageCard extends imageGallery {
    className?: string;
    onClick?: (id: string | number) => void;
}

function ImageCard( {id, slug, isSelected, onClick, className=""}: ImageCard) {

    const {attributes, listeners, setNodeRef, transform, isDragging, index} = useSortable({id: id})

    return (
        <div>
            <div>
                <img src={slug} alt="" />
            </div>
        </div>
    );
}

export default ImageCard;
