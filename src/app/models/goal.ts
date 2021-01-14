import { Course } from "./course"
import { GoalItem } from "./goal-item"

export class Goal {
    id!: number
    user_id!: number
    title!: string
    description!: string
    total_minutes!: number
    percentage_complete!: number
    days_limit!: number
    _courses!:  Course[]
    _goal_items!: GoalItem[]
    goal_items_per_day!: any[]

    public static parseArray(jsonGoals: any[]) { 
        return jsonGoals.map((goal: any) => {
            return new Goal().deserialize(goal)
        })
    }

    public set courses(courses: any[]) {
        this._courses = courses.map((course: any) => {
            return new Course().deserialize(course)
        })
    }

    public set goal_items(items: any[]) {
        this._goal_items = items.map((items: any) => {
            return new GoalItem().deserialize(items)
        })
    }

    public get courses() {
        return this._courses
    }

    public get goal_items() {
        return this._goal_items
    }


    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
