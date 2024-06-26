import React, { useState, useEffect } from 'react';
import { Typeahead, TypeaheadComponentProps } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { TagClass } from "../../functions/api";

interface Tag {
    id: number;
    name: string;
}

interface TagSearchProps {
    existingTags: Tag[];
    onAddTag: (tags: Tag[]) => void;
}

const TagSearch: React.FC<TagSearchProps> = ({ existingTags, onAddTag }) => {
    const [options, setOptions] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    useEffect(() => {
        TagClass.getTags().then(tag => {
            const filteredTags = tag.filter(tag => !existingTags.includes(tag));
            setOptions(filteredTags);
            setSelectedTags(existingTags)
        })
    }, [existingTags]);

    const handleTagChange: TypeaheadComponentProps['onChange'] = (selected) => {
        setSelectedTags(selected as Tag[]);
    };

    const handleAddTags = (event: unknown) => {
        event.preventDefault();
        onAddTag(selectedTags);
        setSelectedTags([]);
    };

    
    return (
        <div>
            <Typeahead
                id="tagSearch"
                multiple
                labelKey="name"
                options={options}
                placeholder="Buscar etiquetas..."
                selected={selectedTags}
                onChange={handleTagChange}
                allowNew // Permite la creación de nuevas etiquetas
                newSelectionPrefix="Agregar nueva etiqueta: "
                emptyLabel="No se encontraron coincidencias"
            />
            <button onClick={handleAddTags}>Agregar Etiquetas</button>
        </div>
    );
};

export default TagSearch;