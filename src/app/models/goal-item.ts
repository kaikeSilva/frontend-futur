import { Course } from "./course"

export class GoalItem {
    id!: number
    goal_id!: number
    day!: string
    time!: number
    late!: boolean
    comments!: string
    week_day_formatted!: string
    day_formatted!: string
    time_formatted!: string
    status!: number
    created_at!: string
    updated_at!: string
    _course!: Course

    public set course(course: Course) {
        this._course = new Course().deserialize(course)
    }

    public get course() {
        return this._course
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
