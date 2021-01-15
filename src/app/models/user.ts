import { Course } from "./course"
import { Deserializable } from "./deserializable"
import { Goal } from "./goal"
import { TableItem } from "./table-item.interface"

export class User implements TableItem, Deserializable {
    id!: number
    name!: string
    email!: string
    _courses!: Course[]
    _goals!: Goal[]

    public set courses(courses: any[]) {
        this._courses = courses.map((course: any) => {
            return new Course().deserialize(course)
        })
    }

    public get courses() {
        return this._courses
    }

    public set goals(goals: any[]) {
        this._goals = goals.map((course: any) => {
            return new Goal().deserialize(course)
        })
    }

    public get goals() {
        return this._goals
    }

    deserialize(input: any): this | null {
        Object.assign(this, input);
        return input ? this : null;
    }
}
