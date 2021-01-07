export class CourseGoal {
    id!: number
    course_id!: number
    goal_id!: number
    done_minutes!: number
    status!: number
    created_at!: string
    updated_at!: string
    deleted_at!: string

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
