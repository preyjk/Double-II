const filterSystemFields = (data) => {
    const { Password, UpdatedAt, CreatedAt, ...rest } = data;
    return rest;
}

export const filterResponse = (data) => {
    if (Array.isArray(data)) {
        return data.map(filterSystemFields);
    }
    return filterSystemFields(data);
}

