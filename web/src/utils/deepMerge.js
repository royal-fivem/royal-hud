const deepMerge = (target, source) => {
    if (!source) return target;

    const output = { ...target };
    for (const key of Object.keys(source)) {
        const value = source[key];
        output[key] =
            value && typeof value === 'object' && !Array.isArray(value)
                ? deepMerge(target[key] || {}, value)
                : value;
    }
    return output;
}

export default deepMerge;