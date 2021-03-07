import {Field} from "./Field";

export class FuckToGive {
    constructor(
        public name: string,
        public url: string,
        public fields: Field[],
    ) {
    }
}
