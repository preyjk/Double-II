class FilterExpressionBuilder {
    constructor() {
        this.filterExpressions = []
        this.ExpressionAttributeNames = {};
        this.ExpressionAttributeValues = {};
    }

    addCriteria(key, op, value) {
        const attributeKey = `#attr_${key}`;
        const valueKey = `:val_${key}`;
        this.ExpressionAttributeNames[attributeKey] = key;
        this.ExpressionAttributeValues[valueKey] = value;
        this.filterExpressions.push(`${attributeKey} ${op} ${valueKey}`);
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