import React, { useState, FormEvent } from 'react';
import styles from './ReportIssuePage.module.scss';

export default function ReportIssuePage() {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        alert(`You reported: ${selectedOption}`);
        // Здесь вы можете добавить логику для отправки отчета на сервер
    };

    return (
        <div className={styles['report-issue-container']}>
            <header>
                <button className={styles['cancel-button']}>Cancel</button>
                <h1>Report</h1>
                <button
                    className={styles['submit-button']}
                    onClick={handleSubmit}
                    disabled={!selectedOption}
                >
                    Submit
                </button>
            </header>
            <form className={styles['report-form']} onSubmit={handleSubmit}>
                <p>Help improve Source by reporting feedback on Télescope Café.</p>
                <div className={styles['options']}>
                    {[
                        'Address is wrong',
                        'Serving a different roaster',
                        "Photos aren't very good",
                        'Temp closed',
                        'Perm closed',
                        'Overall quality',
                        'Other'
                    ].map((option) => (
                        <label key={option}>
                            <input
                                type="radio"
                                value={option}
                                checked={selectedOption === option}
                                onChange={handleOptionChange}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </form>
        </div>
    );
};
