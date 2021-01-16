import { Course } from "./course"
import { GoalItem } from "./goal-item"

export class Goal {
    id!: number
    user_id!: number
    title!: string
    description!: string
    total_minutes!: number
    today_status!: number
    percentage_complete!: number
    today_percentage_complete!: number
    days_limit!: number
    _courses!:  Course[]
    _goal_items!: GoalItem[]
    goal_items_per_day!: any[]
    _goal_items_for_today!: any[]
    _late_goal_items_for_today!: any[]

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

    public get courses() {
        return this._courses
    }

    public set goal_items(items: any[]) {
        this._goal_items = items.map((items: any) => {
            return new GoalItem().deserialize(items)
        })
    }

    public get goal_items() {
        return this._goal_items
    }

    public set goal_items_for_today (items: any[]) {
        this._goal_items_for_today = items.map((items: any) => {
            return new GoalItem().deserialize(items)
        })
    }

    public get goal_items_for_today() {
        return this._goal_items_for_today
    }

    public set late_goal_items_for_today (items: any[]) {
        this._late_goal_items_for_today = items.map((items: any) => {
            return new GoalItem().deserialize(items)
        })
    }

    public get late_goal_items_for_today() {
        return this._late_goal_items_for_today
    }


    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
