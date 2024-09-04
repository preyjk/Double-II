class FilterExpressionBuilder {
    constructor() {
        this.filterExpressions = []
        this.ExpressionAttributeNames = {};
        this.ExpressionAttributeValues = {};
        this.counter = 0
    }

    addCriteria(key, op, value) {
        const attributeKey = `#attr_${this.counter}_${key}`;
        this.ExpressionAttributeNames[attributeKey] = key;

        if (op.toLowerCase() === 'between' && Array.isArray(value) && value.length === 2) {
            const valueKey1 = `:val_${this.counter}_${key}_1`;
            const valueKey2 = `:val_${this.counter}_${key}_2`;
            this.ExpressionAttributeValues[valueKey1] = value[0];
            this.ExpressionAttributeValues[valueKey2] = value[1];
            this.filterExpressions.push(`${attributeKey} BETWEEN ${valueKey1} AND ${valueKey2}`);
        } else {
            const valueKey = `:val_${this.counter}_${key}`;
            this.ExpressionAttributeValues[valueKey] = value;
            this.filterExpressions.push(`${attributeKey} ${op} ${valueKey}`);
        }

        this.counter++;
    }

    build() {
        if (this.filterExpressions.length > 0) {
            return {
                FilterExpression: this.filterExpressions.join(' AND '),
                ExpressionAttributeNames: this.ExpressionAttributeNames,
                ExpressionAttributeValues: this.ExpressionAttributeValues
            }
        }
        return {}
    }
}

export default FilterExpressionBuilder;