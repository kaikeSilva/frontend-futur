import { Course } from "./course"
import { Deserializable } from "./deserializable"
import { TableItem } from "./table-item.interface"

export class User implements TableItem, Deserializable {
    id!: number
    name!: string
    email!: string
    _courses!: Course[]

    public set courses(courses: any[]) {
        this._courses = courses.map((course: any) => {
            return new Course().deserialize(course)
        })
    }

    public get courses() {
        return this._courses
    }

    deserialize(input: any): this | null {
        Object.assign(this, input);
        return input ? this : null;
    }
}
