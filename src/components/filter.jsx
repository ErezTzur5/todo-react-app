import React, { useState } from 'react';

const Filter = ({ todos, setFilteredTodos }) => {
    const [filterTitle, setFilterTitle] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const handleFilter = () => {
        let filtered = todos;

        if (filterTitle) {
            filtered = filtered.filter(todo =>
                todo.title.toLowerCase().includes(filterTitle.toLowerCase())
            );
        }

        if (filterStatus !== 'all') {
            const isComplete = filterStatus === 'completed';
            filtered = filtered.filter(todo => todo.isComplete === isComplete);
        }

        setFilteredTodos(filtered);
    };

    // Update filtered todos when filters change
    React.useEffect(() => {
        handleFilter();
    }, [filterTitle, filterStatus, todos]);

    return (
        <div className='filter-container' >
            <input
                className='filter-input'
                type="text"
                placeholder="Filter by title"
                value={filterTitle}
                onChange={e => setFilterTitle(e.target.value)}
            />
            <select
                className='select-filter'
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
            >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
        </div>
    );
};

export default Filter;
