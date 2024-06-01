import React from 'react';
import styles from './Option.module.scss';

interface OptionProps {
    label: string;
    value: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Option: React.FC<OptionProps> = ({ label, value, checked, onChange }) => {
    return (
        <label className={[styles['option'], checked && styles['option--checked']].join(' ')} >
            <input
                type="radio"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
    );
};

export default Option;
