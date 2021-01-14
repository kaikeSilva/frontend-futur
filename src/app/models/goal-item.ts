export class GoalItem {
    day!: string
    time!: number
    status!: number
    created_at!: string
    updated_at!: string

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
