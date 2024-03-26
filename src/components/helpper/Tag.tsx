import React, { useState, useEffect } from 'react';
import { Typeahead, TypeaheadComponentProps } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { TagClass } from "functions/api";

interface Tag {
    id: number;
    name: string;
}

interface TagSearchProps {
    existingTags: number[];
    onAddTag: (tags: Tag[]) => void;
}

const TagSearch: React.FC<TagSearchProps> = ({ existingTags, onAddTag }) => {
    const [options, setOptions] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    useEffect(() => {
        // Simulación de carga de etiquetas desde una API

        TagClass.getTags().then(tag => {
            const filteredTags = tag.filter(tag => !existingTags.includes(tag.id));
            setOptions(filteredTags);
        })
        // Filtrar las etiquetas que ya están seleccionadas o son parte de las etiquetas existentes

    }, [existingTags]);

    const handleTagChange: TypeaheadComponentProps['onChange'] = (selected) => {
        setSelectedTags(selected as Tag[]);
    };

    const handleAddTags = () => {
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
            />
            <button onClick={handleAddTags}>Agregar Etiquetas</button>
        </div>
    );
};

export default TagSearch;