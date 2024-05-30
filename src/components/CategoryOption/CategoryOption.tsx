import React from 'react';
import styles from './CategoryOption.module.scss';

interface CategoryOptionProps {
    label: string;
    value: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CategoryOption: React.FC<CategoryOptionProps> = ({ label, value, checked, onChange }) => {
    return (
        <label className={[styles['option'], checked && styles['option--checked']].join(' ')} >
            <input
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
    );
};

export default CategoryOption;
