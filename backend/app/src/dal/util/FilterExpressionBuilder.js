class FilterExpressionBuilder {
    constructor() {
        this.filterExpressions = []
        this.ExpressionAttributeNames = {};
        this.ExpressionAttributeValues = {};
        this.counter = 0
    }

    addCriteria(key, op, value) {
        const attributeKey = `#attr_${this.counter}_${key}`;
        const valueKey = `:val_${this.counter}_${key}`;
        this.counter++;
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